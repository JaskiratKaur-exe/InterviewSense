
import cv2
import mediapipe as mp
import time
import math


# ==================================================
# SETTINGS
# ==================================================

MODEL_PATH = (
    "vision_analysis/mediapipe/models/"
    "holistic_landmarker.task"
)

PERSISTENCE_TIME = 4.0

# Initial hand-to-face distance threshold.
HAND_FACE_DISTANCE_THRESHOLD = 0.10

# A hand must be above the shoulder by this margin.
WRIST_SHOULDER_MARGIN = 0.015
HAND_TOP_SHOULDER_MARGIN = 0.025


# ==================================================
# HELPER FUNCTIONS
# ==================================================

def distance_3d(point_a, point_b):
    return math.sqrt(
        (point_a.x - point_b.x) ** 2
        + (point_a.y - point_b.y) ** 2
        + (point_a.z - point_b.z) ** 2
    )

def is_hand_near_face(hand_points, face_points):
    """
    Detect whether the wrist or fingertips approach
    the forehead, cheeks, nose, or chin.
    """
    # Approximate face regions using MediaPipe Face Mesh landmarks.
    face_indices = [
        10,   # Forehead
        152,  # Chin
        234,  # One side of face
        454,  # Other side of face
        1,    # Nose
        33,   # Eye corner
        263,  # Other eye corner
    ]

    face_points_to_check = [
        face_points[i]
        for i in face_indices
        if i < len(face_points)
    ]

    # Wrist and fingertips: landmark 0 is wrist;
    # 4, 8, 12, 16, 20 are fingertips.
    hand_indices = [0, 4, 8, 12, 16, 20]

    hand_points_to_check = [
        hand_points[i]
        for i in hand_indices
        if i < len(hand_points)
    ]

    for hand_point in hand_points_to_check:
        for face_point in face_points_to_check:
            if distance_3d(hand_point, face_point) < HAND_FACE_DISTANCE_THRESHOLD:
                return True

    return False



def get_landmark_list(landmarks):
    """Return a flat list of landmarks for one detected person."""
    if not landmarks:
        return None

    if hasattr(landmarks[0], "x"):
        return landmarks

    if landmarks[0] and hasattr(landmarks[0][0], "x"):
        return landmarks[0]

    return None


# ==================================================
# MEDIAPIPE SETUP
# ==================================================

options = mp.tasks.vision.HolisticLandmarkerOptions(
    base_options=mp.tasks.BaseOptions(
        model_asset_path=MODEL_PATH
    ),
    running_mode=mp.tasks.vision.RunningMode.IMAGE
)


# ==================================================
# CAMERA SETUP
# ==================================================

cap = cv2.VideoCapture(0, cv2.CAP_MSMF)

if not cap.isOpened():
    print("ERROR: Could not open webcam.")
    raise SystemExit

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

hand_start_time = None
face_start_time = None

hand_alert = False
face_alert = False

print("Hand analysis started. Press Q to quit.")


# ==================================================
# MAIN LOOP
# ==================================================

try:
    with mp.tasks.vision.HolisticLandmarker.create_from_options(
        options
    ) as landmarker:

        while True:
            ret, frame = cap.read()

            if not ret:
                print("Could not read webcam frame.")
                break

            frame = cv2.flip(frame, 1)
            frame = cv2.resize(frame, (640, 480))

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            image = mp.Image(
                image_format=mp.ImageFormat.SRGB,
                data=rgb
            )

            result = landmarker.detect(image)

            # Reset detections on every frame.
            hand_above_shoulder = False
            hand_near_face = False

            pose_points = get_landmark_list(
                result.pose_landmarks
            )
            face_points = get_landmark_list(
                result.face_landmarks
            )

            if pose_points and face_points:
                # Pose landmark indices:
                # 11 = left shoulder, 12 = right shoulder
                left_shoulder = pose_points[11]
                right_shoulder = pose_points[12]

                # Face landmark 1 is near the nose.
                nose = face_points[1]

                # Average shoulder height.
                # Smaller normalized Y means higher in the image.
                shoulder_y = (
                    left_shoulder.y + right_shoulder.y
                ) / 2.0

                hand_sets = [
                    result.left_hand_landmarks,
                    result.right_hand_landmarks,
                ]

                for hand_set in hand_sets:
                    hand_points = get_landmark_list(hand_set)

                    if not hand_points:
                        continue

                    # Landmark 0 is the wrist.
                    wrist = hand_points[0]

                    # Find the highest visible point of the hand.
                    hand_top_y = min(
                        point.y for point in hand_points
                    )

                    wrist_raised = (
                        wrist.y
                        < shoulder_y - WRIST_SHOULDER_MARGIN
                    )

                    hand_raised = (
                        hand_top_y
                        < shoulder_y - HAND_TOP_SHOULDER_MARGIN
                    )

                    if wrist_raised or hand_raised:
                        hand_above_shoulder = True

                    # Approximate wrist-to-nose distance.
                    if is_hand_near_face(hand_points, face_points):
                        hand_near_face = True

            # ------------------------------------------
            # PERSISTENCE TIMERS
            # ------------------------------------------

            now = time.monotonic()

            if hand_above_shoulder:
                if hand_start_time is None:
                    hand_start_time = now

                hand_alert = (
                    now - hand_start_time >= PERSISTENCE_TIME
                )
            else:
                hand_start_time = None
                hand_alert = False

            if hand_near_face:
                if face_start_time is None:
                    face_start_time = now

                face_alert = (
                    now - face_start_time >= PERSISTENCE_TIME
                )
            else:
                face_start_time = None
                face_alert = False

            # ------------------------------------------
            # DISPLAY DETECTION STATUS
            # ------------------------------------------

            status_color = (255, 255, 255)

            cv2.putText(
                frame,
                "Hand above shoulder: "
                + ("YES" if hand_above_shoulder else "NO"),
                (20, 35),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                status_color,
                2
            )

            cv2.putText(
                frame,
                "Hand near face: "
                + ("YES" if hand_near_face else "NO"),
                (20, 65),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                status_color,
                2
            )

            if hand_start_time is not None and not hand_alert:
                remaining = max(
                    0.0,
                    PERSISTENCE_TIME
                    - (now - hand_start_time)
                )

                cv2.putText(
                    frame,
                    f"Raised-hand warning in: {remaining:.1f}s",
                    (20, 95),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.55,
                    (0, 255, 255),
                    2
                )

            if hand_alert or face_alert:
                cv2.putText(
                    frame,
                    "HAND BEHAVIOR ALERT",
                    (20, 130),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.75,
                    (0, 0, 255),
                    2
                )

                cv2.putText(
                    frame,
                    "Please take your hands down.",
                    (20, 165),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.55,
                    (0, 0, 255),
                    2
                )

            cv2.imshow(
                "InterviewSense - Hand Analysis",
                frame
            )

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

finally:
    cap.release()
    cv2.destroyAllWindows()

print("Hand analysis test stopped.")


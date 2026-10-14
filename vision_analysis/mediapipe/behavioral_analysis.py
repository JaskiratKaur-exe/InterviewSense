
import cv2
import mediapipe as mp
import time
import math


# ============================================================
# INTERVIEWSENSE - COMBINED BEHAVIORAL ANALYSIS
# Eyes + Head + Hands
# Local MediaPipe model; no external APIs
# ============================================================


# -------------------- SETTINGS --------------------

MODEL_PATH = (
    "vision_analysis/mediapipe/models/"
    "holistic_landmarker.task"
)

PERSISTENCE_TIME = 4.0

# Eye calibration baselines
BASELINE_LEFT_EYE_X = 0.465
BASELINE_LEFT_EYE_Y = 0.475
BASELINE_RIGHT_EYE_X = 0.545
BASELINE_RIGHT_EYE_Y = 0.466

# Head calibration baselines
BASELINE_HEAD_X = 0.496
BASELINE_HEAD_Y = 0.560

# Eye thresholds
EYE_X_THRESHOLD = 0.035
EYE_Y_THRESHOLD = 0.035

# Head thresholds
HEAD_X_THRESHOLD = 0.060
HEAD_Y_THRESHOLD = 0.080

# Hand thresholds
HAND_FACE_DISTANCE_THRESHOLD = 0.10
WRIST_SHOULDER_MARGIN = 0.015
HAND_TOP_SHOULDER_MARGIN = 0.025


# -------------------- EYE LANDMARKS --------------------

LEFT_EYE_OUTER = 33
LEFT_EYE_INNER = 133
LEFT_EYE_TOP = 159
LEFT_EYE_BOTTOM = 145

RIGHT_EYE_OUTER = 362
RIGHT_EYE_INNER = 263
RIGHT_EYE_TOP = 386
RIGHT_EYE_BOTTOM = 374

LEFT_IRIS_START = 468
LEFT_IRIS_END = 473

RIGHT_IRIS_START = 473
RIGHT_IRIS_END = 478


# -------------------- HELPER FUNCTIONS --------------------

def get_landmark_list(landmarks):
    """Handle the landmark structure returned by MediaPipe Tasks."""
    if not landmarks:
        return None

    if hasattr(landmarks[0], "x"):
        return landmarks

    if len(landmarks) > 0 and landmarks[0]:
        if hasattr(landmarks[0][0], "x"):
            return landmarks[0]

    return None


def get_iris_center(face, start, end):
    points = face[start:end]

    if not points:
        return None, None

    x = sum(point.x for point in points) / len(points)
    y = sum(point.y for point in points) / len(points)

    return x, y


def get_relative_eye_position(
    face, outer_index, inner_index,
    top_index, bottom_index, iris_start, iris_end
):
    iris_x, iris_y = get_iris_center(
        face, iris_start, iris_end
    )

    if iris_x is None:
        return None, None

    outer = face[outer_index]
    inner = face[inner_index]
    top = face[top_index]
    bottom = face[bottom_index]

    eye_width = abs(inner.x - outer.x)
    eye_height = abs(bottom.y - top.y)

    if eye_width < 0.0001 or eye_height < 0.0001:
        return None, None

    relative_x = (iris_x - outer.x) / eye_width
    relative_y = (iris_y - top.y) / eye_height

    return relative_x, relative_y


def distance_3d(point_a, point_b):
    return math.sqrt(
        (point_a.x - point_b.x) ** 2
        + (point_a.y - point_b.y) ** 2
        + (point_a.z - point_b.z) ** 2
    )


def is_hand_near_face(hand_points, face_points):
    """Check the wrist and fingertips against several face regions."""
    face_indices = [10, 152, 234, 454, 1, 33, 263]
    hand_indices = [0, 4, 8, 12, 16, 20]

    face_check_points = [
        face_points[i]
        for i in face_indices
        if i < len(face_points)
    ]

    hand_check_points = [
        hand_points[i]
        for i in hand_indices
        if i < len(hand_points)
    ]

    for hand_point in hand_check_points:
        for face_point in face_check_points:
            if (
                distance_3d(hand_point, face_point)
                < HAND_FACE_DISTANCE_THRESHOLD
            ):
                return True

    return False


def update_timer(condition, start_time, now):
    """Return the updated timer and whether its duration has elapsed."""
    if not condition:
        return None, False

    if start_time is None:
        start_time = now

    alert = now - start_time >= PERSISTENCE_TIME
    return start_time, alert


def draw_text(frame, message, y, color=(255, 255, 255), scale=0.55):
    cv2.putText(
        frame,
        message,
        (20, y),
        cv2.FONT_HERSHEY_SIMPLEX,
        scale,
        color,
        2
    )


# -------------------- MEDIAPIPE SETUP --------------------

options = mp.tasks.vision.HolisticLandmarkerOptions(
    base_options=mp.tasks.BaseOptions(
        model_asset_path=MODEL_PATH
    ),
    running_mode=mp.tasks.vision.RunningMode.IMAGE
)


# -------------------- CAMERA SETUP --------------------

cap = cv2.VideoCapture(0, cv2.CAP_MSMF)

if not cap.isOpened():
    print("ERROR: Could not open webcam.")
    raise SystemExit

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


# -------------------- PERSISTENCE TIMERS --------------------

eye_start = None
head_start = None
raised_hand_start = None
hand_face_start = None

eye_alert = False
head_alert = False
raised_hand_alert = False
hand_face_alert = False

print("=" * 55)
print("INTERVIEWSENSE - COMBINED BEHAVIORAL ANALYSIS")
print("=" * 55)
print("Eyes, head, raised hands and hand-near-face detection")
print("Persistence:", PERSISTENCE_TIME, "seconds")
print("Press Q to quit.")
print("=" * 55)


# -------------------- MAIN LOOP --------------------

try:
    with mp.tasks.vision.HolisticLandmarker.create_from_options(
        options
    ) as landmarker:

        while True:
            ret, frame = cap.read()

            if not ret:
                print("ERROR: Could not read webcam frame.")
                break

            frame = cv2.flip(frame, 1)
            frame = cv2.resize(frame, (640, 480))

            rgb_frame = cv2.cvtColor(
                frame, cv2.COLOR_BGR2RGB
            )

            mp_image = mp.Image(
                image_format=mp.ImageFormat.SRGB,
                data=rgb_frame
            )

            result = landmarker.detect(mp_image)
            now = time.monotonic()

            # Reset current-frame detection flags.
            eye_outside = False
            head_outside = False
            hand_above_shoulder = False
            hand_near_face = False

            face = get_landmark_list(result.face_landmarks)
            pose = get_landmark_list(result.pose_landmarks)

            # -------------------- FACE MISSING --------------------

            if face is None:
                eye_start = None
                head_start = None
                eye_alert = False
                head_alert = False

                draw_text(
                    frame,
                    "FACE NOT DETECTED",
                    35,
                    (0, 0, 255),
                    0.7
                )

            else:
                # -------------------- HEAD --------------------

                nose = face[1]

                head_x = nose.x
                head_y = nose.y

                head_x_deviation = abs(
                    head_x - BASELINE_HEAD_X
                )
                head_y_deviation = abs(
                    head_y - BASELINE_HEAD_Y
                )

                head_outside = (
                    head_x_deviation > HEAD_X_THRESHOLD
                    or head_y_deviation > HEAD_Y_THRESHOLD
                )

                head_start, head_alert = update_timer(
                    head_outside, head_start, now
                )

                # -------------------- EYES --------------------

                left_eye_x, left_eye_y = get_relative_eye_position(
                    face,
                    LEFT_EYE_OUTER,
                    LEFT_EYE_INNER,
                    LEFT_EYE_TOP,
                    LEFT_EYE_BOTTOM,
                    LEFT_IRIS_START,
                    LEFT_IRIS_END
                )

                right_eye_x, right_eye_y = get_relative_eye_position(
                    face,
                    RIGHT_EYE_OUTER,
                    RIGHT_EYE_INNER,
                    RIGHT_EYE_TOP,
                    RIGHT_EYE_BOTTOM,
                    RIGHT_IRIS_START,
                    RIGHT_IRIS_END
                )

                eye_data_valid = all(
                    value is not None
                    for value in (
                        left_eye_x, left_eye_y,
                        right_eye_x, right_eye_y
                    )
                )

                if eye_data_valid:
                    eye_x_deviation = (
                        abs(left_eye_x - BASELINE_LEFT_EYE_X)
                        + abs(right_eye_x - BASELINE_RIGHT_EYE_X)
                    ) / 2.0

                    eye_y_deviation = (
                        abs(left_eye_y - BASELINE_LEFT_EYE_Y)
                        + abs(right_eye_y - BASELINE_RIGHT_EYE_Y)
                    ) / 2.0

                    eye_outside = (
                        eye_x_deviation > EYE_X_THRESHOLD
                        or eye_y_deviation > EYE_Y_THRESHOLD
                    )

                    eye_start, eye_alert = update_timer(
                        eye_outside, eye_start, now
                    )

                    draw_text(
                        frame,
                        f"Left Eye X/Y: {left_eye_x:.2f}/{left_eye_y:.2f}",
                        35
                    )
                    draw_text(
                        frame,
                        f"Right Eye X/Y: {right_eye_x:.2f}/{right_eye_y:.2f}",
                        60
                    )
                    draw_text(
                        frame,
                        f"Eye deviation X/Y: {eye_x_deviation:.3f}/{eye_y_deviation:.3f}",
                        85
                    )

                else:
                    eye_start = None
                    eye_alert = False
                    draw_text(
                        frame, "Eye landmarks unavailable", 60
                    )

                draw_text(
                    frame,
                    f"Head X/Y: {head_x:.3f}/{head_y:.3f}",
                    110
                )

            # -------------------- HAND DETECTION --------------------

            if face is not None and pose is not None:
                left_shoulder = pose[11]
                right_shoulder = pose[12]

                shoulder_y = (
                    left_shoulder.y + right_shoulder.y
                ) / 2.0

                hand_sets = [
                    result.left_hand_landmarks,
                    result.right_hand_landmarks
                ]

                for hand_set in hand_sets:
                    hand_points = get_landmark_list(hand_set)

                    if not hand_points:
                        continue

                    wrist = hand_points[0]
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

                    if is_hand_near_face(hand_points, face):
                        hand_near_face = True

            # -------------------- HAND TIMERS --------------------

            raised_hand_start, raised_hand_alert = update_timer(
                hand_above_shoulder, raised_hand_start, now
            )

            hand_face_start, hand_face_alert = update_timer(
                hand_near_face, hand_face_start, now
            )

            # -------------------- STATUS DISPLAY --------------------

            draw_text(
                frame,
                "Raised hand: " + (
                    "YES" if hand_above_shoulder else "NO"
                ),
                145
            )

            draw_text(
                frame,
                "Hand near face: " + (
                    "YES" if hand_near_face else "NO"
                ),
                170
            )

            eye_status = (
                "ALERT" if eye_alert
                else "UNUSUAL" if eye_outside
                else "NORMAL"
            )

            head_status = (
                "ALERT" if head_alert
                else "UNUSUAL" if head_outside
                else "NORMAL"
            )

            draw_text(
                frame, f"Eye status: {eye_status}", 200
            )
            draw_text(
                frame, f"Head status: {head_status}", 225
            )

            # -------------------- ALERT MESSAGES --------------------

            alerts = []

            if eye_alert:
                alerts.append("Eye movement")

            if head_alert:
                alerts.append("Head position")

            if raised_hand_alert:
                alerts.append("Hand above shoulder")

            if hand_face_alert:
                alerts.append("Hand near face")

            if alerts:
                draw_text(
                    frame, "BEHAVIOR ALERT", 270,
                    (0, 0, 255), 0.8
                )

                draw_text(
                    frame, ", ".join(alerts), 300,
                    (0, 0, 255), 0.55
                )

                if raised_hand_alert or hand_face_alert:
                    draw_text(
                        frame,
                        "Please take your hands down.",
                        330,
                        (0, 0, 255),
                        0.55
                    )

            else:
                draw_text(
                    frame,
                    "No sustained behavior alerts",
                    270,
                    (0, 200, 0),
                    0.55
                )

            cv2.imshow(
                "InterviewSense - Behavioral Analysis",
                frame
            )

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

finally:
    cap.release()
    cv2.destroyAllWindows()

print("Combined behavioral analysis stopped.")

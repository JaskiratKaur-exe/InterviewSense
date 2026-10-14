import cv2
import mediapipe as mp
import time
import math

# ============================================================
# MEDIAPIPE SETUP
# ============================================================

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"

BaseOptions = mp.tasks.BaseOptions
VisionRunningMode = mp.tasks.vision.RunningMode
HolisticLandmarker = mp.tasks.vision.HolisticLandmarker
HolisticLandmarkerOptions = mp.tasks.vision.HolisticLandmarkerOptions

options = HolisticLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=VisionRunningMode.IMAGE
)

landmarker = HolisticLandmarker.create_from_options(options)

# ============================================================
# CALIBRATION VALUES
# From your 15-second combined calibration
# ============================================================

# ---------- HEAD ----------
HEAD_X_MIN = 0.47965556383132935
HEAD_X_MAX = 0.5237496495246887

HEAD_Y_MIN = 0.5544414520263672
HEAD_Y_MAX = 0.6258232593536377

HEAD_Z_MIN = -0.05992491915822029
HEAD_Z_MAX = -0.05421062558889389

# ---------- LEFT EYE ----------
LEFT_EYE_X_MIN = 0.4294310510158539
LEFT_EYE_X_MAX = 0.4697954595088959

LEFT_EYE_Y_MIN = 0.4921408534049988
LEFT_EYE_Y_MAX = 0.5337465167045593

# ---------- RIGHT EYE ----------
RIGHT_EYE_X_MIN = 0.533396327495575
RIGHT_EYE_X_MAX = 0.5763465523719787

RIGHT_EYE_Y_MIN = 0.49221389889717104
RIGHT_EYE_Y_MAX = 0.5532814741134644


# ============================================================
# FUNCTION: CALCULATE DEVIATION FROM NATURAL RANGE
# ============================================================

def range_deviation(value, minimum, maximum):

    if minimum <= value <= maximum:
        return 0.0

    if value < minimum:
        return (minimum - value) / (maximum - minimum)

    return (value - maximum) / (maximum - minimum)


# ============================================================
# FUNCTION: AVERAGE LANDMARK
# ============================================================

def average_landmark(landmarks):

    x = sum(p.x for p in landmarks) / len(landmarks)
    y = sum(p.y for p in landmarks) / len(landmarks)
    z = sum(p.z for p in landmarks) / len(landmarks)

    return x, y, z


# ============================================================
# IRIS LANDMARKS
# ============================================================

LEFT_IRIS = [468, 469, 470, 471, 472]
RIGHT_IRIS = [473, 474, 475, 476, 477]


# ============================================================
# TEST INFORMATION
# ============================================================

tests = {
    "1": {
        "name": "NORMAL",
        "instruction": "Sit naturally like a normal interview."
    },

    "2": {
        "name": "READ QUESTION",
        "instruction": "Read the question on the screen naturally."
    },

    "3": {
        "name": "EYES LEFT",
        "instruction": "Keep head straight and look LEFT with your eyes."
    },

    "4": {
        "name": "EYES RIGHT",
        "instruction": "Keep head straight and look RIGHT with your eyes."
    },

    "5": {
        "name": "HEAD LEFT",
        "instruction": "Move your head LEFT while looking at the screen."
    },

    "6": {
        "name": "HEAD RIGHT",
        "instruction": "Move your head RIGHT while looking at the screen."
    }
}


# ============================================================
# WEBCAM
# ============================================================

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

print()
print("==============================================")
print(" InterviewSense - Automatic Behavior Test")
print("==============================================")
print()
print("1 = Normal")
print("2 = Read Question")
print("3 = Eyes Left")
print("4 = Eyes Right")
print("5 = Head Left")
print("6 = Head Right")
print("Q = Quit")
print()
print("IMPORTANT:")
print("Click on the webcam window before pressing keys.")
print()


# ============================================================
# VARIABLES
# ============================================================

recording = False
current_test = None

test_start_time = 0
TEST_DURATION = 5

head_values = []
eye_values = []

window_name = "InterviewSense - Automatic Behavior Test"


# ============================================================
# MAIN LOOP
# ============================================================

while True:

    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    frame = cv2.flip(frame, 1)
    frame = cv2.resize(frame, (640, 480))

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )

    result = landmarker.detect(mp_image)

    # ========================================================
    # RECORDING
    # ========================================================

    if recording:

        elapsed = time.time() - test_start_time
        remaining = TEST_DURATION - elapsed

        # -----------------------------------------------
        # CHECK FACE
        # -----------------------------------------------

        if result.face_landmarks:

            face = result.face_landmarks

            # -------------------------------------------
            # HEAD
            # Nose landmark
            # -------------------------------------------

            nose = face[1]

            head_x = nose.x
            head_y = nose.y
            head_z = nose.z

            # Calculate normalized head deviations

            head_x_dev = range_deviation(
                head_x,
                HEAD_X_MIN,
                HEAD_X_MAX
            )

            head_y_dev = range_deviation(
                head_y,
                HEAD_Y_MIN,
                HEAD_Y_MAX
            )

            head_z_dev = range_deviation(
                head_z,
                HEAD_Z_MIN,
                HEAD_Z_MAX
            )

            head_deviation = (
                head_x_dev +
                head_y_dev +
                head_z_dev
            ) / 3

            # -------------------------------------------
            # EYES
            # -------------------------------------------

            left_iris_points = [
                face[i] for i in LEFT_IRIS
            ]

            right_iris_points = [
                face[i] for i in RIGHT_IRIS
            ]

            left_eye_x, left_eye_y, left_eye_z = \
                average_landmark(left_iris_points)

            right_eye_x, right_eye_y, right_eye_z = \
                average_landmark(right_iris_points)

            # Left eye deviation

            left_eye_x_dev = range_deviation(
                left_eye_x,
                LEFT_EYE_X_MIN,
                LEFT_EYE_X_MAX
            )

            left_eye_y_dev = range_deviation(
                left_eye_y,
                LEFT_EYE_Y_MIN,
                LEFT_EYE_Y_MAX
            )

            left_eye_deviation = (
                left_eye_x_dev +
                left_eye_y_dev
            ) / 2

            # Right eye deviation

            right_eye_x_dev = range_deviation(
                right_eye_x,
                RIGHT_EYE_X_MIN,
                RIGHT_EYE_X_MAX
            )

            right_eye_y_dev = range_deviation(
                right_eye_y,
                RIGHT_EYE_Y_MIN,
                RIGHT_EYE_Y_MAX
            )

            right_eye_deviation = (
                right_eye_x_dev +
                right_eye_y_dev
            ) / 2

            # Overall eye deviation

            eye_deviation = (
                left_eye_deviation +
                right_eye_deviation
            ) / 2

            # -------------------------------------------
            # STORE RESULTS
            # -------------------------------------------

            head_values.append(head_deviation)
            eye_values.append(eye_deviation)

            # -------------------------------------------
            # DISPLAY CURRENT VALUES
            # -------------------------------------------

            cv2.putText(
                frame,
                f"Head Dev: {head_deviation:.3f}",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"Eye Dev: {eye_deviation:.3f}",
                (20, 70),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

        else:

            cv2.putText(
                frame,
                "Face not detected",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 255),
                2
            )

        # -----------------------------------------------
        # TIMER
        # -----------------------------------------------

        cv2.putText(
            frame,
            f"Recording: {remaining:.1f}s",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        # -----------------------------------------------
        # TEST FINISHED
        # -----------------------------------------------

        if elapsed >= TEST_DURATION:

            recording = False

            print()
            print("==============================================")
            print(f"              {tests[current_test]['name']}")
            print("==============================================")

            if len(head_values) > 0:

                print(
                    f"Average Head Dev : "
                    f"{sum(head_values) / len(head_values):.3f}"
                )

                print(
                    f"Minimum Head Dev : "
                    f"{min(head_values):.3f}"
                )

                print(
                    f"Maximum Head Dev : "
                    f"{max(head_values):.3f}"
                )

                print()

                print(
                    f"Average Eye Dev  : "
                    f"{sum(eye_values) / len(eye_values):.3f}"
                )

                print(
                    f"Minimum Eye Dev  : "
                    f"{min(eye_values):.3f}"
                )

                print(
                    f"Maximum Eye Dev  : "
                    f"{max(eye_values):.3f}"
                )

                print()

                print(
                    f"Samples          : "
                    f"{len(head_values)}"
                )

            else:

                print("No valid face frames were recorded.")

            print("==============================================")
            print()

            head_values = []
            eye_values = []

            current_test = None

    else:

        # ====================================================
        # MENU DISPLAY
        # ====================================================

        cv2.putText(
            frame,
            "1 Normal | 2 Read | 3 Eyes Left",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (255, 255, 255),
            2
        )

        cv2.putText(
            frame,
            "4 Eyes Right | 5 Head Left | 6 Head Right",
            (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.50,
            (255, 255, 255),
            2
        )

        cv2.putText(
            frame,
            "Press Q to quit",
            (10, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 255),
            2
        )

    # ========================================================
    # SHOW WEBCAM
    # ========================================================

    cv2.imshow(window_name, frame)

    key = cv2.waitKey(1) & 0xFF

    # ========================================================
    # QUIT
    # ========================================================

    if key == ord("q"):

        break

    # ========================================================
    # START TEST
    # ========================================================

    if not recording and chr(key) in tests:

        current_test = chr(key)

        recording = True

        test_start_time = time.time()

        head_values = []
        eye_values = []

        print()
        print("==============================================")
        print(f"STARTING TEST: {tests[current_test]['name']}")
        print("==============================================")
        print(tests[current_test]["instruction"])
        print("Recording for 5 seconds...")
        print()

# ============================================================
# CLEANUP
# ============================================================

cap.release()
cv2.destroyAllWindows()
landmarker.close()

print()
print("Behavior testing finished.")
import cv2
import mediapipe as mp
import time


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
# TEST SETTINGS
# ============================================================

TEST_DURATION = 5

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
# IRIS LANDMARKS
# ============================================================

LEFT_IRIS = [468, 469, 470, 471, 472]
RIGHT_IRIS = [473, 474, 475, 476, 477]


# ============================================================
# EYE CORNER / EYE BOUNDARY LANDMARKS
# ============================================================

# Left eye
LEFT_EYE_OUTER = 33
LEFT_EYE_INNER = 133
LEFT_EYE_TOP = 159
LEFT_EYE_BOTTOM = 145

# Right eye
RIGHT_EYE_OUTER = 362
RIGHT_EYE_INNER = 263
RIGHT_EYE_TOP = 386
RIGHT_EYE_BOTTOM = 374


# ============================================================
# FUNCTIONS
# ============================================================

def average_landmark(face, indexes):

    x = sum(face[i].x for i in indexes) / len(indexes)
    y = sum(face[i].y for i in indexes) / len(indexes)

    return x, y


def relative_eye_position(
    iris_x,
    iris_y,
    outer_x,
    outer_y,
    inner_x,
    inner_y,
    top_x,
    top_y,
    bottom_x,
    bottom_y
):

    # Horizontal eye width
    eye_width = abs(inner_x - outer_x)

    # Vertical eye height
    eye_height = abs(bottom_y - top_y)

    # Prevent division by zero
    if eye_width < 0.0001:
        eye_width = 0.0001

    if eye_height < 0.0001:
        eye_height = 0.0001

    # Normalize iris position
    relative_x = (iris_x - outer_x) / eye_width

    relative_y = (iris_y - top_y) / eye_height

    return relative_x, relative_y


# ============================================================
# WEBCAM
# ============================================================

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()


window_name = "InterviewSense - Relative Eye Test"


print()
print("==============================================")
print(" InterviewSense - Relative Eye Test")
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
print("Click the webcam window before pressing a key.")
print()


# ============================================================
# VARIABLES
# ============================================================

recording = False
current_test = None
test_start_time = 0

head_x_values = []
head_y_values = []

left_eye_x_values = []
left_eye_y_values = []

right_eye_x_values = []
right_eye_y_values = []


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

        if result.face_landmarks:

            face = result.face_landmarks


            # =================================================
            # HEAD
            # =================================================

            nose = face[1]

            head_x = nose.x
            head_y = nose.y

            head_x_values.append(head_x)
            head_y_values.append(head_y)


            # =================================================
            # LEFT IRIS
            # =================================================

            left_iris_x, left_iris_y = average_landmark(
                face,
                LEFT_IRIS
            )


            # =================================================
            # RIGHT IRIS
            # =================================================

            right_iris_x, right_iris_y = average_landmark(
                face,
                RIGHT_IRIS
            )


            # =================================================
            # LEFT EYE BOUNDARIES
            # =================================================

            left_outer_x = face[LEFT_EYE_OUTER].x
            left_outer_y = face[LEFT_EYE_OUTER].y

            left_inner_x = face[LEFT_EYE_INNER].x
            left_inner_y = face[LEFT_EYE_INNER].y

            left_top_x = face[LEFT_EYE_TOP].x
            left_top_y = face[LEFT_EYE_TOP].y

            left_bottom_x = face[LEFT_EYE_BOTTOM].x
            left_bottom_y = face[LEFT_EYE_BOTTOM].y


            # =================================================
            # RIGHT EYE BOUNDARIES
            # =================================================

            right_outer_x = face[RIGHT_EYE_OUTER].x
            right_outer_y = face[RIGHT_EYE_OUTER].y

            right_inner_x = face[RIGHT_EYE_INNER].x
            right_inner_y = face[RIGHT_EYE_INNER].y

            right_top_x = face[RIGHT_EYE_TOP].x
            right_top_y = face[RIGHT_EYE_TOP].y

            right_bottom_x = face[RIGHT_EYE_BOTTOM].x
            right_bottom_y = face[RIGHT_EYE_BOTTOM].y


            # =================================================
            # RELATIVE LEFT EYE
            # =================================================

            relative_left_x, relative_left_y = relative_eye_position(

                left_iris_x,
                left_iris_y,

                left_outer_x,
                left_outer_y,

                left_inner_x,
                left_inner_y,

                left_top_x,
                left_top_y,

                left_bottom_x,
                left_bottom_y
            )


            # =================================================
            # RELATIVE RIGHT EYE
            # =================================================

            relative_right_x, relative_right_y = relative_eye_position(

                right_iris_x,
                right_iris_y,

                right_outer_x,
                right_outer_y,

                right_inner_x,
                right_inner_y,

                right_top_x,
                right_top_y,

                right_bottom_x,
                right_bottom_y
            )


            left_eye_x_values.append(relative_left_x)
            left_eye_y_values.append(relative_left_y)

            right_eye_x_values.append(relative_right_x)
            right_eye_y_values.append(relative_right_y)


            # =================================================
            # DISPLAY
            # =================================================

            cv2.putText(
                frame,
                f"Head X: {head_x:.3f}",
                (15, 30),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"Head Y: {head_y:.3f}",
                (15, 55),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"Left Eye X: {relative_left_x:.3f}",
                (15, 85),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 255),
                2
            )

            cv2.putText(
                frame,
                f"Left Eye Y: {relative_left_y:.3f}",
                (15, 110),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 255),
                2
            )

            cv2.putText(
                frame,
                f"Right Eye X: {relative_right_x:.3f}",
                (15, 140),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 255),
                2
            )

            cv2.putText(
                frame,
                f"Right Eye Y: {relative_right_y:.3f}",
                (15, 165),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (0, 255, 255),
                2
            )

        else:

            cv2.putText(
                frame,
                "Face not detected",
                (15, 35),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 255),
                2
            )


        # =====================================================
        # TIMER
        # =====================================================

        cv2.putText(
            frame,
            f"Recording: {max(0, remaining):.1f}s",
            (15, 205),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 255),
            2
        )


        # =====================================================
        # FINISH TEST
        # =====================================================

        if elapsed >= TEST_DURATION:

            recording = False

            print()
            print("==============================================")
            print(f"              {tests[current_test]['name']}")
            print("==============================================")


            if len(head_x_values) > 0:

                # ---------------------------------------------
                # HEAD
                # ---------------------------------------------

                avg_head_x = sum(head_x_values) / len(head_x_values)
                avg_head_y = sum(head_y_values) / len(head_y_values)

                print()
                print("HEAD")
                print(f"Average X : {avg_head_x:.3f}")
                print(f"Minimum X : {min(head_x_values):.3f}")
                print(f"Maximum X : {max(head_x_values):.3f}")

                print(f"Average Y : {avg_head_y:.3f}")
                print(f"Minimum Y : {min(head_y_values):.3f}")
                print(f"Maximum Y : {max(head_y_values):.3f}")


                # ---------------------------------------------
                # LEFT EYE
                # ---------------------------------------------

                avg_left_x = sum(left_eye_x_values) / len(left_eye_x_values)
                avg_left_y = sum(left_eye_y_values) / len(left_eye_y_values)

                print()
                print("LEFT EYE - RELATIVE POSITION")

                print(f"Average X : {avg_left_x:.3f}")
                print(f"Minimum X : {min(left_eye_x_values):.3f}")
                print(f"Maximum X : {max(left_eye_x_values):.3f}")

                print(f"Average Y : {avg_left_y:.3f}")
                print(f"Minimum Y : {min(left_eye_y_values):.3f}")
                print(f"Maximum Y : {max(left_eye_y_values):.3f}")


                # ---------------------------------------------
                # RIGHT EYE
                # ---------------------------------------------

                avg_right_x = sum(right_eye_x_values) / len(right_eye_x_values)
                avg_right_y = sum(right_eye_y_values) / len(right_eye_y_values)

                print()
                print("RIGHT EYE - RELATIVE POSITION")

                print(f"Average X : {avg_right_x:.3f}")
                print(f"Minimum X : {min(right_eye_x_values):.3f}")
                print(f"Maximum X : {max(right_eye_x_values):.3f}")

                print(f"Average Y : {avg_right_y:.3f}")
                print(f"Minimum Y : {min(right_eye_y_values):.3f}")
                print(f"Maximum Y : {max(right_eye_y_values):.3f}")


                print()
                print(f"Samples : {len(head_x_values)}")

            else:

                print("No valid face frames recorded.")

            print("==============================================")
            print()


            # Reset
            head_x_values = []
            head_y_values = []

            left_eye_x_values = []
            left_eye_y_values = []

            right_eye_x_values = []
            right_eye_y_values = []

            current_test = None


    # ========================================================
    # MENU
    # ========================================================

    else:

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
    # SHOW WINDOW
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

        head_x_values = []
        head_y_values = []

        left_eye_x_values = []
        left_eye_y_values = []

        right_eye_x_values = []
        right_eye_y_values = []

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
print("Relative eye testing finished.")
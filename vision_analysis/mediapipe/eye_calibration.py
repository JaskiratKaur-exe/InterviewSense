import cv2
import mediapipe as mp
import time


# -----------------------------------
# 1. Model path
# -----------------------------------

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"


# -----------------------------------
# 2. MediaPipe setup
# -----------------------------------

BaseOptions = mp.tasks.BaseOptions
HolisticLandmarker = mp.tasks.vision.HolisticLandmarker
HolisticLandmarkerOptions = mp.tasks.vision.HolisticLandmarkerOptions


options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)


landmarker = HolisticLandmarker.create_from_options(options)


# -----------------------------------
# 3. Open webcam
# -----------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Error: Could not open webcam.")

    landmarker.close()

    exit()


print("======================================")
print("InterviewSense Eye Calibration")
print("======================================")
print()
print("Sit normally.")
print("Look directly at the camera.")
print("Keep your head in a natural position.")
print("Calibration will take 5 seconds.")
print()


# -----------------------------------
# 4. Storage
# -----------------------------------

left_x_values = []
left_y_values = []

right_x_values = []
right_y_values = []


# -----------------------------------
# 5. Calibration time
# -----------------------------------

CALIBRATION_TIME = 5

start_time = time.time()


# -----------------------------------
# 6. Function: iris center
# -----------------------------------

def get_iris_center(landmarks, start_index, end_index):

    iris = landmarks[start_index:end_index]

    x = sum(
        landmark.x for landmark in iris
    ) / len(iris)

    y = sum(
        landmark.y for landmark in iris
    ) / len(iris)

    return x, y


# -----------------------------------
# 7. Webcam loop
# -----------------------------------

while True:

    ret, frame = cap.read()

    if not ret:

        print("Error: Could not read frame.")

        break


    frame = cv2.flip(frame, 1)

    frame = cv2.resize(frame, (640, 480))


    height, width, _ = frame.shape


    # -----------------------------------
    # Convert BGR → RGB
    # -----------------------------------

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # -----------------------------------
    # MediaPipe image
    # -----------------------------------

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    # -----------------------------------
    # Detect landmarks
    # -----------------------------------

    result = landmarker.detect(mp_image)


    # -----------------------------------
    # Process face
    # -----------------------------------

    if result.face_landmarks:

        landmarks = result.face_landmarks


        # ===================================
        # LEFT EYE
        # ===================================

        left_iris_x, left_iris_y = get_iris_center(
            landmarks,
            468,
            473
        )


        left_inner_x = landmarks[133].x
        left_outer_x = landmarks[33].x

        left_eye_width = abs(
            left_outer_x - left_inner_x
        )


        left_top_y = landmarks[159].y
        left_bottom_y = landmarks[145].y

        left_eye_height = abs(
            left_bottom_y - left_top_y
        )


        left_eye_position_x = (
            left_iris_x -
            min(left_inner_x, left_outer_x)
        ) / left_eye_width


        left_eye_position_y = (
            left_iris_y -
            left_top_y
        ) / left_eye_height


        # ===================================
        # RIGHT EYE
        # ===================================

        right_iris_x, right_iris_y = get_iris_center(
            landmarks,
            473,
            478
        )


        right_inner_x = landmarks[362].x
        right_outer_x = landmarks[263].x

        right_eye_width = abs(
            right_outer_x - right_inner_x
        )


        right_top_y = landmarks[386].y
        right_bottom_y = landmarks[374].y

        right_eye_height = abs(
            right_bottom_y - right_top_y
        )


        right_eye_position_x = (
            right_iris_x -
            min(right_inner_x, right_outer_x)
        ) / right_eye_width


        right_eye_position_y = (
            right_iris_y -
            right_top_y
        ) / right_eye_height


        # -----------------------------------
        # Store values
        # -----------------------------------

        left_x_values.append(left_eye_position_x)
        left_y_values.append(left_eye_position_y)

        right_x_values.append(right_eye_position_x)
        right_y_values.append(right_eye_position_y)


        # -----------------------------------
        # Display values
        # -----------------------------------

        cv2.putText(
            frame,
            f"Left X: {left_eye_position_x:.2f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Left Y: {left_eye_position_y:.2f}",
            (20, 70),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Right X: {right_eye_position_x:.2f}",
            (20, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Right Y: {right_eye_position_y:.2f}",
            (20, 130),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


    # -----------------------------------
    # Remaining time
    # -----------------------------------

    elapsed_time = time.time() - start_time

    remaining_time = max(
        0,
        CALIBRATION_TIME - int(elapsed_time)
    )


    cv2.putText(
        frame,
        f"Calibration: {remaining_time}",
        (220, 450),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )


    cv2.imshow(
        "InterviewSense - Eye Calibration",
        frame
    )


    # -----------------------------------
    # Finish
    # -----------------------------------

    if elapsed_time >= CALIBRATION_TIME:

        break


    # -----------------------------------
    # Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# -----------------------------------
# 8. Calculate baseline
# -----------------------------------

if len(left_x_values) > 0:

    left_baseline_x = (
        sum(left_x_values) /
        len(left_x_values)
    )

    left_baseline_y = (
        sum(left_y_values) /
        len(left_y_values)
    )

    right_baseline_x = (
        sum(right_x_values) /
        len(right_x_values)
    )

    right_baseline_y = (
        sum(right_y_values) /
        len(right_y_values)
    )


    # -----------------------------------
    # Calculate natural variation
    # -----------------------------------

    left_x_min = min(left_x_values)
    left_x_max = max(left_x_values)

    left_y_min = min(left_y_values)
    left_y_max = max(left_y_values)

    right_x_min = min(right_x_values)
    right_x_max = max(right_x_values)

    right_y_min = min(right_y_values)
    right_y_max = max(right_y_values)


    print()
    print("======================================")
    print("CALIBRATION COMPLETE")
    print("======================================")


    print()
    print("Left Eye Baseline:")
    print("X:", left_baseline_x)
    print("Y:", left_baseline_y)


    print()
    print("Right Eye Baseline:")
    print("X:", right_baseline_x)
    print("Y:", right_baseline_y)


    print()
    print("Natural Range During Calibration:")

    print()
    print("Left X:")
    print("Min:", left_x_min)
    print("Max:", left_x_max)


    print()
    print("Left Y:")
    print("Min:", left_y_min)
    print("Max:", left_y_max)


    print()
    print("Right X:")
    print("Min:", right_x_min)
    print("Max:", right_x_max)


    print()
    print("Right Y:")
    print("Min:", right_y_min)
    print("Max:", right_y_max)


    print()
    print("Frames collected:", len(left_x_values))


else:

    print()
    print("No face detected during calibration.")


# -----------------------------------
# 9. Release resources
# -----------------------------------

cap.release()

landmarker.close()

cv2.destroyAllWindows()
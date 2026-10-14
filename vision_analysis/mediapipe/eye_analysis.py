import cv2
import mediapipe as mp


# -----------------------------------
# 1. Model path
# -----------------------------------

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"


# -----------------------------------
# 2. Calibration values
# -----------------------------------

LEFT_X_MIN = 0.45119825883773523
LEFT_X_MAX = 0.508145969619757

LEFT_Y_MIN = 0.4411361513663343
LEFT_Y_MAX = 0.4723718546024064

RIGHT_X_MIN = 0.5120007654985314
RIGHT_X_MAX = 0.5536212824928539

RIGHT_Y_MIN = 0.43079292734230623
RIGHT_Y_MAX = 0.4574707009065318


# -----------------------------------
# 3. Extra tolerance
# -----------------------------------

TOLERANCE = 0.02


# -----------------------------------
# 4. MediaPipe setup
# -----------------------------------

BaseOptions = mp.tasks.BaseOptions
HolisticLandmarker = mp.tasks.vision.HolisticLandmarker
HolisticLandmarkerOptions = mp.tasks.vision.HolisticLandmarkerOptions


options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)


landmarker = HolisticLandmarker.create_from_options(
    options
)


# -----------------------------------
# 5. Open webcam
# -----------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Error: Could not open webcam.")

    landmarker.close()

    exit()


print("Eye movement threshold test started.")
print("Press Q to quit.")


# -----------------------------------
# 6. Iris center function
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
# 7. Range checking function
# -----------------------------------

def inside_range(value, minimum, maximum):

    return (
        minimum - TOLERANCE
        <= value
        <= maximum + TOLERANCE
    )


# -----------------------------------
# 8. Webcam loop
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


        # ===================================
        # Check normal range
        # ===================================

        left_normal = (

            inside_range(
                left_eye_position_x,
                LEFT_X_MIN,
                LEFT_X_MAX
            )

            and

            inside_range(
                left_eye_position_y,
                LEFT_Y_MIN,
                LEFT_Y_MAX
            )
        )


        right_normal = (

            inside_range(
                right_eye_position_x,
                RIGHT_X_MIN,
                RIGHT_X_MAX
            )

            and

            inside_range(
                right_eye_position_y,
                RIGHT_Y_MIN,
                RIGHT_Y_MAX
            )
        )


        # ===================================
        # Overall status
        # ===================================

        if left_normal and right_normal:

            status = "NORMAL"

        else:

            status = "OUTSIDE NORMAL RANGE"


        # ===================================
        # Draw iris points
        # ===================================

        for landmark in landmarks[468:478]:

            x = int(landmark.x * width)
            y = int(landmark.y * height)

            if 0 <= x < width and 0 <= y < height:

                cv2.circle(
                    frame,
                    (x, y),
                    2,
                    (0, 0, 255),
                    -1
                )


        # ===================================
        # Display values
        # ===================================

        cv2.putText(
            frame,
            f"LX: {left_eye_position_x:.2f}",
            (20, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"LY: {left_eye_position_y:.2f}",
            (20, 65),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"RX: {right_eye_position_x:.2f}",
            (20, 95),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"RY: {right_eye_position_y:.2f}",
            (20, 125),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        # ===================================
        # Display status
        # ===================================

        cv2.putText(
            frame,
            status,
            (150, 430),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )


    # -----------------------------------
    # Show webcam
    # -----------------------------------

    cv2.imshow(
        "InterviewSense - Eye Threshold Test",
        frame
    )


    # -----------------------------------
    # Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# -----------------------------------
# 9. Release
# -----------------------------------

cap.release()

landmarker.close()

cv2.destroyAllWindows()
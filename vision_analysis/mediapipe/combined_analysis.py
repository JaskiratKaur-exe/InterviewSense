import cv2
import mediapipe as mp


# ======================================
# 1. Model path
# ======================================

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"


# ======================================
# 2. MediaPipe setup
# ======================================

BaseOptions = mp.tasks.BaseOptions

HolisticLandmarker = (
    mp.tasks.vision.HolisticLandmarker
)

HolisticLandmarkerOptions = (
    mp.tasks.vision.HolisticLandmarkerOptions
)


options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)


landmarker = HolisticLandmarker.create_from_options(
    options
)


# ======================================
# 3. Open webcam
# ======================================

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Error: Could not open webcam.")

    landmarker.close()

    exit()


print("======================================")
print("InterviewSense - Combined Head + Eye")
print("======================================")
print()
print("Look at the screen normally.")
print("Move your head naturally.")
print("Press Q to quit.")
print()


# ======================================
# 4. Webcam loop
# ======================================

while True:

    ret, frame = cap.read()

    if not ret:

        print("Error: Could not read frame.")

        break


    # ----------------------------------
    # Flip webcam
    # ----------------------------------

    frame = cv2.flip(frame, 1)

    frame = cv2.resize(frame, (640, 480))


    height, width, _ = frame.shape


    # ----------------------------------
    # Convert BGR → RGB
    # ----------------------------------

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # ----------------------------------
    # Create MediaPipe image
    # ----------------------------------

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    # ----------------------------------
    # Detect landmarks
    # ----------------------------------

    result = landmarker.detect(mp_image)


    # ==================================
    # FACE PROCESSING
    # ==================================

    if result.face_landmarks:

        landmarks = result.face_landmarks


        # ==================================
        # HEAD
        # ==================================

        nose = landmarks[1]

        head_x = nose.x
        head_y = nose.y
        head_z = nose.z


        # ----------------------------------
        # Draw nose
        # ----------------------------------

        nose_x = int(head_x * width)
        nose_y = int(head_y * height)


        if (
            0 <= nose_x < width
            and
            0 <= nose_y < height
        ):

            cv2.circle(
                frame,
                (nose_x, nose_y),
                5,
                (255, 0, 0),
                -1
            )


        # ==================================
        # EYES
        # ==================================

        # Left eye iris landmarks
        left_iris = landmarks[468:473]

        # Right eye iris landmarks
        right_iris = landmarks[473:478]


        # ----------------------------------
        # Calculate iris centers
        # ----------------------------------

        left_iris_x = sum(
            point.x for point in left_iris
        ) / len(left_iris)


        left_iris_y = sum(
            point.y for point in left_iris
        ) / len(left_iris)


        right_iris_x = sum(
            point.x for point in right_iris
        ) / len(right_iris)


        right_iris_y = sum(
            point.y for point in right_iris
        ) / len(right_iris)


        # ==================================
        # DRAW IRIS CENTERS
        # ==================================

        left_pixel_x = int(
            left_iris_x * width
        )

        left_pixel_y = int(
            left_iris_y * height
        )


        right_pixel_x = int(
            right_iris_x * width
        )

        right_pixel_y = int(
            right_iris_y * height
        )


        cv2.circle(
            frame,
            (left_pixel_x, left_pixel_y),
            3,
            (0, 0, 255),
            -1
        )


        cv2.circle(
            frame,
            (right_pixel_x, right_pixel_y),
            3,
            (0, 0, 255),
            -1
        )


        # ==================================
        # DISPLAY HEAD VALUES
        # ==================================

        cv2.putText(
            frame,
            f"Head X: {head_x:.3f}",
            (20, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Y: {head_y:.3f}",
            (20, 65),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Z: {head_z:.3f}",
            (20, 95),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        # ==================================
        # DISPLAY EYE VALUES
        # ==================================

        cv2.putText(
            frame,
            f"Left Eye X: {left_iris_x:.3f}",
            (20, 135),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Left Eye Y: {left_iris_y:.3f}",
            (20, 165),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Right Eye X: {right_iris_x:.3f}",
            (20, 205),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Right Eye Y: {right_iris_y:.3f}",
            (20, 235),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (0, 255, 0),
            2
        )


    # ==================================
    # DISPLAY
    # ==================================

    cv2.imshow(
        "InterviewSense - Combined Head + Eye",
        frame
    )


    # ==================================
    # QUIT
    # ==================================

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# ======================================
# 5. Release resources
# ======================================

cap.release()

landmarker.close()

cv2.destroyAllWindows()
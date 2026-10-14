import cv2
import mediapipe as mp
import time


# ======================================
# 1. Model path
# ======================================

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"


# ======================================
# 2. MediaPipe setup
# ======================================

BaseOptions = mp.tasks.BaseOptions

HolisticLandmarker = mp.tasks.vision.HolisticLandmarker

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
print("InterviewSense")
print("Combined Head + Eye Calibration")
print("======================================")
print()
print("Calibration duration: 15 seconds")
print()
print("During calibration:")
print("1. Sit normally like an interview.")
print("2. Look at the screen.")
print("3. Read naturally.")
print("4. Move your eyes naturally.")
print("5. Move your head naturally.")
print("6. Do NOT make extreme movements.")
print()
print("Starting calibration...")
print()


# ======================================
# 4. Storage
# ======================================

head_x_values = []
head_y_values = []
head_z_values = []

left_eye_x_values = []
left_eye_y_values = []

right_eye_x_values = []
right_eye_y_values = []


# ======================================
# 5. Calibration duration
# ======================================

CALIBRATION_TIME = 15

start_time = time.time()


# ======================================
# 6. Webcam loop
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
    # BGR → RGB
    # ----------------------------------

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # ----------------------------------
    # MediaPipe image
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


        head_x_values.append(head_x)
        head_y_values.append(head_y)
        head_z_values.append(head_z)


        # ==================================
        # EYES
        # ==================================

        left_iris = landmarks[468:473]

        right_iris = landmarks[473:478]


        # ----------------------------------
        # Left iris center
        # ----------------------------------

        left_iris_x = sum(
            point.x for point in left_iris
        ) / len(left_iris)


        left_iris_y = sum(
            point.y for point in left_iris
        ) / len(left_iris)


        # ----------------------------------
        # Right iris center
        # ----------------------------------

        right_iris_x = sum(
            point.x for point in right_iris
        ) / len(right_iris)


        right_iris_y = sum(
            point.y for point in right_iris
        ) / len(right_iris)


        # ----------------------------------
        # Store eye values
        # ----------------------------------

        left_eye_x_values.append(left_iris_x)
        left_eye_y_values.append(left_iris_y)

        right_eye_x_values.append(right_iris_x)
        right_eye_y_values.append(right_iris_y)


        # ==================================
        # DRAW NOSE
        # ==================================

        nose_pixel_x = int(
            head_x * width
        )

        nose_pixel_y = int(
            head_y * height
        )


        cv2.circle(
            frame,
            (nose_pixel_x, nose_pixel_y),
            5,
            (255, 0, 0),
            -1
        )


        # ==================================
        # DRAW LEFT IRIS
        # ==================================

        left_pixel_x = int(
            left_iris_x * width
        )

        left_pixel_y = int(
            left_iris_y * height
        )


        cv2.circle(
            frame,
            (left_pixel_x, left_pixel_y),
            3,
            (0, 0, 255),
            -1
        )


        # ==================================
        # DRAW RIGHT IRIS
        # ==================================

        right_pixel_x = int(
            right_iris_x * width
        )

        right_pixel_y = int(
            right_iris_y * height
        )


        cv2.circle(
            frame,
            (right_pixel_x, right_pixel_y),
            3,
            (0, 0, 255),
            -1
        )


    # ==================================
    # REMAINING TIME
    # ==================================

    elapsed_time = time.time() - start_time

    remaining_time = max(
        0,
        int(CALIBRATION_TIME - elapsed_time)
    )


    cv2.putText(
        frame,
        f"Calibration: {remaining_time}s",
        (220, 450),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )


    # ==================================
    # DISPLAY
    # ==================================

    cv2.imshow(
        "InterviewSense - Combined Calibration",
        frame
    )


    # ==================================
    # FINISH
    # ==================================

    if elapsed_time >= CALIBRATION_TIME:

        break


    # ==================================
    # QUIT
    # ==================================

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# ======================================
# 7. Calculate results
# ======================================

if len(head_x_values) > 0:

    # ----------------------------------
    # Head baseline
    # ----------------------------------

    head_baseline_x = (
        sum(head_x_values) /
        len(head_x_values)
    )

    head_baseline_y = (
        sum(head_y_values) /
        len(head_y_values)
    )

    head_baseline_z = (
        sum(head_z_values) /
        len(head_z_values)
    )


    # ----------------------------------
    # Eye baseline
    # ----------------------------------

    left_eye_baseline_x = (
        sum(left_eye_x_values) /
        len(left_eye_x_values)
    )

    left_eye_baseline_y = (
        sum(left_eye_y_values) /
        len(left_eye_y_values)
    )


    right_eye_baseline_x = (
        sum(right_eye_x_values) /
        len(right_eye_x_values)
    )

    right_eye_baseline_y = (
        sum(right_eye_y_values) /
        len(right_eye_y_values)
    )


    # ==================================
    # PRINT RESULTS
    # ==================================

    print()
    print("======================================")
    print("COMBINED CALIBRATION COMPLETE")
    print("======================================")


    print()
    print("HEAD BASELINE")

    print("X:", head_baseline_x)
    print("Y:", head_baseline_y)
    print("Z:", head_baseline_z)


    print()
    print("HEAD NATURAL RANGE")

    print("X:")
    print("Min:", min(head_x_values))
    print("Max:", max(head_x_values))

    print("Y:")
    print("Min:", min(head_y_values))
    print("Max:", max(head_y_values))

    print("Z:")
    print("Min:", min(head_z_values))
    print("Max:", max(head_z_values))


    print()
    print("LEFT EYE BASELINE")

    print("X:", left_eye_baseline_x)
    print("Y:", left_eye_baseline_y)


    print()
    print("LEFT EYE NATURAL RANGE")

    print("X:")
    print("Min:", min(left_eye_x_values))
    print("Max:", max(left_eye_x_values))

    print("Y:")
    print("Min:", min(left_eye_y_values))
    print("Max:", max(left_eye_y_values))


    print()
    print("RIGHT EYE BASELINE")

    print("X:", right_eye_baseline_x)
    print("Y:", right_eye_baseline_y)


    print()
    print("RIGHT EYE NATURAL RANGE")

    print("X:")
    print("Min:", min(right_eye_x_values))
    print("Max:", max(right_eye_x_values)

    )


    print("Y:")
    print("Min:", min(right_eye_y_values))
    print("Max:", max(right_eye_y_values))


    print()
    print("Frames collected:", len(head_x_values))


else:

    print("No face detected during calibration.")


# ======================================
# 8. Release resources
# ======================================

cap.release()

landmarker.close()

cv2.destroyAllWindows()
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


print("InterviewSense Calibration Started.")
print("Please sit normally and look directly at the camera.")


# -----------------------------------
# 4. Storage for calibration data
# -----------------------------------

left_iris_x = []
left_iris_y = []
left_iris_z = []

right_iris_x = []
right_iris_y = []
right_iris_z = []


# -----------------------------------
# 5. Calibration settings
# -----------------------------------

CALIBRATION_TIME = 5

start_time = time.time()


# -----------------------------------
# 6. Webcam loop
# -----------------------------------

while True:

    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break


    frame = cv2.flip(frame, 1)
    frame = cv2.resize(frame, (640, 480))


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
    # Collect iris coordinates
    # -----------------------------------

    if result.face_landmarks:

        # -------------------------------
        # Left iris
        # -------------------------------

        left_iris = result.face_landmarks[468:473]

        left_x = sum(
            landmark.x for landmark in left_iris
        ) / len(left_iris)

        left_y = sum(
            landmark.y for landmark in left_iris
        ) / len(left_iris)

        left_z = sum(
            landmark.z for landmark in left_iris
        ) / len(left_iris)


        # -------------------------------
        # Right iris
        # -------------------------------

        right_iris = result.face_landmarks[473:478]

        right_x = sum(
            landmark.x for landmark in right_iris
        ) / len(right_iris)

        right_y = sum(
            landmark.y for landmark in right_iris
        ) / len(right_iris)

        right_z = sum(
            landmark.z for landmark in right_iris
        ) / len(right_iris)


        # -------------------------------
        # Store values
        # -------------------------------

        left_iris_x.append(left_x)
        left_iris_y.append(left_y)
        left_iris_z.append(left_z)

        right_iris_x.append(right_x)
        right_iris_y.append(right_y)
        right_iris_z.append(right_z)


    # -----------------------------------
    # Calculate remaining time
    # -----------------------------------

    elapsed_time = time.time() - start_time

    remaining_time = max(
        0,
        CALIBRATION_TIME - int(elapsed_time)
    )


    # -----------------------------------
    # Display calibration message
    # -----------------------------------

    cv2.putText(
        frame,
        "Look directly at the camera",
        (120, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        f"Calibration: {remaining_time}",
        (220, 90),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )


    cv2.imshow(
        "InterviewSense - Calibration",
        frame
    )


    # -----------------------------------
    # Finish calibration
    # -----------------------------------

    if elapsed_time >= CALIBRATION_TIME:
        break


    # -----------------------------------
    # Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# -----------------------------------
# 7. Calculate baseline
# -----------------------------------

if len(left_iris_x) > 0:

    left_baseline_x = sum(left_iris_x) / len(left_iris_x)
    left_baseline_y = sum(left_iris_y) / len(left_iris_y)
    left_baseline_z = sum(left_iris_z) / len(left_iris_z)

    right_baseline_x = sum(right_iris_x) / len(right_iris_x)
    right_baseline_y = sum(right_iris_y) / len(right_iris_y)
    right_baseline_z = sum(right_iris_z) / len(right_iris_z)


    print("\n========== CALIBRATION COMPLETE ==========")

    print("\nLeft Iris Baseline:")
    print("X:", left_baseline_x)
    print("Y:", left_baseline_y)
    print("Z:", left_baseline_z)

    print("\nRight Iris Baseline:")
    print("X:", right_baseline_x)
    print("Y:", right_baseline_y)
    print("Z:", right_baseline_z)

    print("\nFrames collected:", len(left_iris_x))


else:

    print("No face detected during calibration.")


# -----------------------------------
# 8. Release resources
# -----------------------------------

cap.release()
landmarker.close()
cv2.destroyAllWindows()
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
print("InterviewSense Head Calibration")
print("======================================")
print()
print("Sit normally like you would during an interview.")
print("Look at the screen naturally.")
print("Do NOT intentionally move your head.")
print("Calibration will take 5 seconds.")
print()


# -----------------------------------
# 4. Storage
# -----------------------------------

head_x_values = []
head_y_values = []
head_z_values = []


# -----------------------------------
# 5. Calibration time
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


        # -----------------------------------
        # Nose = head reference
        # -----------------------------------

        nose = landmarks[1]


        head_x = nose.x
        head_y = nose.y
        head_z = nose.z


        # -----------------------------------
        # Store values
        # -----------------------------------

        head_x_values.append(head_x)
        head_y_values.append(head_y)
        head_z_values.append(head_z)


        # -----------------------------------
        # Draw nose
        # -----------------------------------

        pixel_x = int(head_x * width)
        pixel_y = int(head_y * height)


        if 0 <= pixel_x < width and 0 <= pixel_y < height:

            cv2.circle(
                frame,
                (pixel_x, pixel_y),
                5,
                (255, 0, 0),
                -1
            )


        # -----------------------------------
        # Display current values
        # -----------------------------------

        cv2.putText(
            frame,
            f"Head X: {head_x:.3f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Y: {head_y:.3f}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Z: {head_z:.3f}",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
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
        "InterviewSense - Head Calibration",
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

if len(head_x_values) > 0:

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


    # -----------------------------------
    # Natural range
    # -----------------------------------

    head_x_min = min(head_x_values)
    head_x_max = max(head_x_values)

    head_y_min = min(head_y_values)
    head_y_max = max(head_y_values)

    head_z_min = min(head_z_values)
    head_z_max = max(head_z_values)


    print()
    print("======================================")
    print("HEAD CALIBRATION COMPLETE")
    print("======================================")


    print()
    print("Head Baseline:")

    print("X:", head_baseline_x)
    print("Y:", head_baseline_y)
    print("Z:", head_baseline_z)


    print()
    print("Natural Head Range:")

    print()
    print("X:")
    print("Min:", head_x_min)
    print("Max:", head_x_max)


    print()
    print("Y:")
    print("Min:", head_y_min)
    print("Max:", head_y_max)


    print()
    print("Z:")
    print("Min:", head_z_min)
    print("Max:", head_z_max)


    print()
    print("Frames collected:", len(head_x_values))


else:

    print("No face detected during calibration.")


# -----------------------------------
# 8. Release resources
# -----------------------------------

cap.release()

landmarker.close()

cv2.destroyAllWindows()
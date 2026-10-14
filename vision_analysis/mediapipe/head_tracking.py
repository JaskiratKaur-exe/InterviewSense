import cv2
import mediapipe as mp


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


landmarker = HolisticLandmarker.create_from_options(
    options
)


# -----------------------------------
# 3. Open webcam
# -----------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Error: Could not open webcam.")

    landmarker.close()

    exit()


print("Head tracking started.")
print("Press Q to quit.")


# -----------------------------------
# 4. Webcam loop
# -----------------------------------

while True:

    ret, frame = cap.read()

    if not ret:

        print("Error: Could not read frame.")

        break


    # Mirror webcam
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
        # Nose reference point
        # -----------------------------------

        nose = landmarks[1]


        nose_x = nose.x
        nose_y = nose.y
        nose_z = nose.z


        # -----------------------------------
        # Convert to pixel coordinates
        # -----------------------------------

        pixel_x = int(nose_x * width)
        pixel_y = int(nose_y * height)


        # -----------------------------------
        # Draw nose point
        # -----------------------------------

        if 0 <= pixel_x < width and 0 <= pixel_y < height:

            cv2.circle(
                frame,
                (pixel_x, pixel_y),
                5,
                (255, 0, 0),
                -1
            )


        # -----------------------------------
        # Display coordinates
        # -----------------------------------

        cv2.putText(
            frame,
            f"Head X: {nose_x:.3f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Y: {nose_y:.3f}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Z: {nose_z:.3f}",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


    # -----------------------------------
    # Display webcam
    # -----------------------------------

    cv2.imshow(
        "InterviewSense - Head Tracking",
        frame
    )


    # -----------------------------------
    # Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# -----------------------------------
# 5. Release
# -----------------------------------

cap.release()

landmarker.close()

cv2.destroyAllWindows()
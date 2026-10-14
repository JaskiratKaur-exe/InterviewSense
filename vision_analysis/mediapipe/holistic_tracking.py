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


# -----------------------------------
# 3. Create Holistic Landmarker
# -----------------------------------

options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)

landmarker = HolisticLandmarker.create_from_options(options)


# -----------------------------------
# 4. Open webcam
# -----------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    landmarker.close()
    exit()

print("InterviewSense MediaPipe started.")
print("Press Q to quit.")


# -----------------------------------
# 5. Start webcam loop
# -----------------------------------

while True:

    # Capture frame
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    # Flip frame horizontally
    frame = cv2.flip(frame, 1)

    # Resize frame
    frame = cv2.resize(frame, (640, 480))

    # Get frame dimensions
    height, width, _ = frame.shape

    # -----------------------------------
    # 6. Convert BGR → RGB
    # -----------------------------------

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # -----------------------------------
    # 7. Convert to MediaPipe Image
    # -----------------------------------

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )

    # -----------------------------------
    # 8. Detect Holistic landmarks
    # -----------------------------------

    result = landmarker.detect(mp_image)


# -----------------------------------
# 9. Draw Face + Iris Landmarks
# -----------------------------------

    if result.face_landmarks:

        for index, landmark in enumerate(result.face_landmarks):

            x = int(landmark.x * width)
            y = int(landmark.y * height)

        if 0 <= x < width and 0 <= y < height:

            # Iris landmarks: 468-477
            if 468 <= index <= 477:

                cv2.circle(
                    frame,
                    (x, y),
                    4,
                    (0, 0, 255),
                    -1
                )

            # Normal face landmarks
            else:

                cv2.circle(
                    frame,
                    (x, y),
                    1,
                    (0, 255, 0),
                    -1
                )

    # -----------------------------------
# Test: Count face landmarks
# -----------------------------------

    if result.face_landmarks:
        print("Number of face landmarks:", len(result.face_landmarks))

    # -----------------------------------
    # 10. Draw Pose Landmarks
    # -----------------------------------

    if result.pose_landmarks:

        for landmark in result.pose_landmarks:

            x = int(landmark.x * width)
            y = int(landmark.y * height)

            cv2.circle(
                frame,
                (x, y),
                4,
                (255, 0, 0),
                -1
            )


    # -----------------------------------
    # 11. Draw Left Hand Landmarks
    # -----------------------------------

    if result.left_hand_landmarks:

        for landmark in result.left_hand_landmarks:

            x = int(landmark.x * width)
            y = int(landmark.y * height)

            cv2.circle(
                frame,
                (x, y),
                4,
                (0, 0, 255),
                -1
            )


    # -----------------------------------
    # 12. Draw Right Hand Landmarks
    # -----------------------------------

    if result.right_hand_landmarks:
    
            for landmark in result.right_hand_landmarks:
    
                x = int(landmark.x * width)
                y = int(landmark.y * height)
    
                cv2.circle(
                    frame,
                    (x, y),
                    4,
                    (0, 0, 255),
                    -1
                )


    # -----------------------------------
    # 13. Display webcam
    # -----------------------------------

    cv2.imshow(
        "InterviewSense - MediaPipe Holistic",
        frame
    )


    # -----------------------------------
    # 14. Press Q to quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# -----------------------------------
# 15. Release resources
# -----------------------------------

cap.release()
landmarker.close()
cv2.destroyAllWindows()
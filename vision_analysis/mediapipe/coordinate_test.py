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
# 3. Create model
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

print("Coordinate test started.")
print("Press Q to quit.")


# -----------------------------------
# 5. Webcam loop
# -----------------------------------

while True:

    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    frame = cv2.flip(frame, 1)
    frame = cv2.resize(frame, (640, 480))

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    # -----------------------------------
    # 6. Detect landmarks
    # -----------------------------------

    result = landmarker.detect(mp_image)


    # -----------------------------------
    # 7. FACE / IRIS COORDINATES
    # -----------------------------------

    if result.face_landmarks:

        print("\n========== FACE / IRIS ==========")

        # Left iris
        print("\nLeft Iris:")

        for index in range(468, 473):

            landmark = result.face_landmarks[index]

            print(
                "Landmark", index,
                "| X:", round(landmark.x, 4),
                "| Y:", round(landmark.y, 4),
                "| Z:", round(landmark.z, 4)
            )


        # Right iris
        print("\nRight Iris:")

        for index in range(473, 478):

            landmark = result.face_landmarks[index]

            print(
                "Landmark", index,
                "| X:", round(landmark.x, 4),
                "| Y:", round(landmark.y, 4),
                "| Z:", round(landmark.z, 4)
            )


    # -----------------------------------
    # 8. POSE COORDINATES
    # -----------------------------------

    if result.pose_landmarks:

        print("\n========== POSE ==========")

        # Left shoulder = landmark 11
        left_shoulder = result.pose_landmarks[11]

        print(
            "Left Shoulder",
            "| X:", round(left_shoulder.x, 4),
            "| Y:", round(left_shoulder.y, 4),
            "| Z:", round(left_shoulder.z, 4)
        )


        # Right shoulder = landmark 12
        right_shoulder = result.pose_landmarks[12]

        print(
            "Right Shoulder",
            "| X:", round(right_shoulder.x, 4),
            "| Y:", round(right_shoulder.y, 4),
            "| Z:", round(right_shoulder.z, 4)
        )


    # -----------------------------------
    # 9. LEFT HAND
    # -----------------------------------

    if result.left_hand_landmarks:

        print("\n========== LEFT HAND ==========")

        # Wrist = landmark 0
        wrist = result.left_hand_landmarks[0]

        print(
            "Left Wrist",
            "| X:", round(wrist.x, 4),
            "| Y:", round(wrist.y, 4),
            "| Z:", round(wrist.z, 4)
        )


    # -----------------------------------
    # 10. RIGHT HAND
    # -----------------------------------

    if result.right_hand_landmarks:

        print("\n========== RIGHT HAND ==========")

        # Wrist = landmark 0
        wrist = result.right_hand_landmarks[0]

        print(
            "Right Wrist",
            "| X:", round(wrist.x, 4),
            "| Y:", round(wrist.y, 4),
            "| Z:", round(wrist.z, 4)
        )


    # -----------------------------------
    # 11. Display webcam
    # -----------------------------------

    cv2.imshow(
        "InterviewSense - Coordinate Test",
        frame
    )


    # -----------------------------------
    # 12. Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# -----------------------------------
# 13. Release resources
# -----------------------------------

cap.release()
landmarker.close()
cv2.destroyAllWindows()
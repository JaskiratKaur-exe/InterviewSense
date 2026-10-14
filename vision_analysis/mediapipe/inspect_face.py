import cv2
import mediapipe as mp

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"

BaseOptions = mp.tasks.BaseOptions
HolisticLandmarker = mp.tasks.vision.HolisticLandmarker
HolisticLandmarkerOptions = mp.tasks.vision.HolisticLandmarkerOptions

options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)

landmarker = HolisticLandmarker.create_from_options(options)

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Could not open webcam")
    landmarker.close()
    exit()

print("Show your face to the camera.")

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame = cv2.flip(frame, 1)
    frame = cv2.resize(frame, (640, 480))

    height, width, _ = frame.shape

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )

    result = landmarker.detect(mp_image)

    if result.face_landmarks:

        print("Total landmarks:", len(result.face_landmarks))

        valid_points = 0

        for landmark in result.face_landmarks:

            x = int(landmark.x * width)
            y = int(landmark.y * height)

            # Count points inside the image
            if 0 <= x < width and 0 <= y < height:

                valid_points += 1

                cv2.circle(
                    frame,
                    (x, y),
                    1,
                    (0, 255, 0),
                    -1
                )

        # -----------------------------------
# Iris landmark test
# -----------------------------------

            print("\nIris landmarks:")

            for index in range(468, 478):

                landmark = result.face_landmarks[index]

                x = int(landmark.x * width)
                y = int(landmark.y * height)

                print(
                    "Index:", index,
                    "X:", landmark.x,
                    "Y:", landmark.y,
                    "Z:", landmark.z
                )

                cv2.circle(
                    frame,
                    (x, y),
                    2,
                    (0, 0, 255),
                    -1
                )



    

        print("Points inside image:", valid_points)

        cv2.imshow(
            "ALL FACE LANDMARKS TEST",
            frame
        )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
landmarker.close()
cv2.destroyAllWindows()
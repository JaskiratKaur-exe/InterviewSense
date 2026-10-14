import cv2
import mediapipe as mp


# ======================================
# 1. Model path
# ======================================

MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"


# ======================================
# 2. Combined calibration ranges
# ======================================

# HEAD
HEAD_X_MIN = 0.47965556383132935
HEAD_X_MAX = 0.5237496495246887

HEAD_Y_MIN = 0.5544414520263672
HEAD_Y_MAX = 0.6258232593536377

HEAD_Z_MIN = -0.05992491915822029
HEAD_Z_MAX = -0.05421062558889389


# LEFT EYE
LEFT_EYE_X_MIN = 0.4294310510158539
LEFT_EYE_X_MAX = 0.4697954595088959

LEFT_EYE_Y_MIN = 0.4921408534049988
LEFT_EYE_Y_MAX = 0.5337465167045593


# RIGHT EYE
RIGHT_EYE_X_MIN = 0.533396327495575
RIGHT_EYE_X_MAX = 0.5763465523719787

RIGHT_EYE_Y_MIN = 0.49221389889717104
RIGHT_EYE_Y_MAX = 0.5532814741134644


# ======================================
# 3. Function to calculate normalized
#    deviation from natural range
# ======================================

def range_deviation(value, minimum, maximum):

    if minimum <= value <= maximum:

        return 0.0

    if value < minimum:

        return (
            (minimum - value)
            /
            (maximum - minimum)
        )

    return (
        (value - maximum)
        /
        (maximum - minimum)
    )


# ======================================
# 4. MediaPipe setup
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
# 5. Open webcam
# ======================================

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Error: Could not open webcam.")

    landmarker.close()

    exit()


print("======================================")
print("InterviewSense")
print("Normalized Head + Eye Analysis")
print("======================================")
print()
print("TEST MODE - NO ALERTS")
print()
print("Press Q to quit.")
print()


# ======================================
# 6. Webcam loop
# ======================================

while True:

    ret, frame = cap.read()

    if not ret:

        print("Error: Could not read frame.")

        break


    # ----------------------------------
    # Flip and resize
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


        # ==================================
        # EYES
        # ==================================

        left_iris = landmarks[468:473]

        right_iris = landmarks[473:478]


        # ----------------------------------
        # Left iris center
        # ----------------------------------

        left_eye_x = sum(
            point.x for point in left_iris
        ) / len(left_iris)


        left_eye_y = sum(
            point.y for point in left_iris
        ) / len(left_iris)


        # ----------------------------------
        # Right iris center
        # ----------------------------------

        right_eye_x = sum(
            point.x for point in right_iris
        ) / len(right_iris)


        right_eye_y = sum(
            point.y for point in right_iris
        ) / len(right_iris)


        # ==================================
        # NORMALIZED RANGE DEVIATION
        # ==================================

        head_x_dev = range_deviation(
            head_x,
            HEAD_X_MIN,
            HEAD_X_MAX
        )


        head_y_dev = range_deviation(
            head_y,
            HEAD_Y_MIN,
            HEAD_Y_MAX
        )


        head_z_dev = range_deviation(
            head_z,
            HEAD_Z_MIN,
            HEAD_Z_MAX
        )


        left_eye_x_dev = range_deviation(
            left_eye_x,
            LEFT_EYE_X_MIN,
            LEFT_EYE_X_MAX
        )


        left_eye_y_dev = range_deviation(
            left_eye_y,
            LEFT_EYE_Y_MIN,
            LEFT_EYE_Y_MAX
        )


        right_eye_x_dev = range_deviation(
            right_eye_x,
            RIGHT_EYE_X_MIN,
            RIGHT_EYE_X_MAX
        )


        right_eye_y_dev = range_deviation(
            right_eye_y,
            RIGHT_EYE_Y_MIN,
            RIGHT_EYE_Y_MAX
        )


        # ==================================
        # COMBINED SCORES
        # ==================================

        head_deviation = (
            head_x_dev
            +
            head_y_dev
            +
            head_z_dev
        ) / 3


        left_eye_deviation = (
            left_eye_x_dev
            +
            left_eye_y_dev
        ) / 2


        right_eye_deviation = (
            right_eye_x_dev
            +
            right_eye_y_dev
        ) / 2


        eye_deviation = (
            left_eye_deviation
            +
            right_eye_deviation
        ) / 2


        # ==================================
        # DRAW NOSE
        # ==================================

        nose_x = int(
            head_x * width
        )

        nose_y = int(
            head_y * height
        )


        cv2.circle(
            frame,
            (nose_x, nose_y),
            5,
            (255, 0, 0),
            -1
        )


        # ==================================
        # DRAW LEFT IRIS
        # ==================================

        left_pixel_x = int(
            left_eye_x * width
        )

        left_pixel_y = int(
            left_eye_y * height
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
            right_eye_x * width
        )

        right_pixel_y = int(
            right_eye_y * height
        )


        cv2.circle(
            frame,
            (right_pixel_x, right_pixel_y),
            3,
            (0, 0, 255),
            -1
        )


        # ==================================
        # DISPLAY CURRENT VALUES
        # ==================================

        cv2.putText(
            frame,
            f"Head X: {head_x:.3f}",
            (20, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Y: {head_y:.3f}",
            (20, 60),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Head Dev: {head_deviation:.3f}",
            (20, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Eye Dev: {eye_deviation:.3f}",
            (20, 120),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 255),
            2
        )


        cv2.putText(
            frame,
            "TEST MODE - NO ALERTS",
            (20, 450),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2
        )


    # ==================================
    # DISPLAY
    # ==================================

    cv2.imshow(
        "InterviewSense - Normalized Analysis",
        frame
    )


    # ==================================
    # QUIT
    # ==================================

    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# ======================================
# 7. Release resources
# ======================================

cap.release()

landmarker.close()

cv2.destroyAllWindows()
import cv2
import mediapipe as mp
import time


# ============================================================
# INTERVIEWSENSE - PERSISTENCE TEST
# EYES ARE THE MAIN FOCUS
# ============================================================


# ============================================================
# MODEL
# ============================================================

MODEL_PATH = (
    "vision_analysis/mediapipe/models/"
    "holistic_landmarker.task"
)


# ============================================================
# NORMAL INTERVIEW BASELINES
# ============================================================

# Head baseline
BASELINE_HEAD_X = 0.496
BASELINE_HEAD_Y = 0.560


# Left eye baseline
BASELINE_LEFT_EYE_X = 0.465
BASELINE_LEFT_EYE_Y = 0.475


# Right eye baseline
BASELINE_RIGHT_EYE_X = 0.545
BASELINE_RIGHT_EYE_Y = 0.466


# ============================================================
# HEAD THRESHOLDS
# ============================================================

# Head is NOT the main focus.
# These values are intentionally wide.

HEAD_X_THRESHOLD = 0.060
HEAD_Y_THRESHOLD = 0.080


# ============================================================
# EYE THRESHOLDS
# ============================================================

# Eyes are the MAIN focus.

# Left / right eye movement
EYE_X_THRESHOLD = 0.035

# Up / down eye movement
EYE_Y_THRESHOLD = 0.035


# ============================================================
# PERSISTENCE
# ============================================================

# The unusual eye/head position must continue
# for this many seconds before an alert.

PERSISTENCE_TIME = 4.0


# ============================================================
# EYE LANDMARKS
# ============================================================

# Left eye
LEFT_EYE_OUTER = 33
LEFT_EYE_INNER = 133
LEFT_EYE_TOP = 159
LEFT_EYE_BOTTOM = 145


# Right eye
RIGHT_EYE_OUTER = 362
RIGHT_EYE_INNER = 263
RIGHT_EYE_TOP = 386
RIGHT_EYE_BOTTOM = 374


# ============================================================
# IRIS LANDMARKS
# ============================================================

# Left iris = 468, 469, 470, 471, 472
LEFT_IRIS_START = 468
LEFT_IRIS_END = 473


# Right iris = 473, 474, 475, 476, 477
RIGHT_IRIS_START = 473
RIGHT_IRIS_END = 478


# ============================================================
# FUNCTION:
# GET IRIS CENTER
# ============================================================

def get_iris_center(face_landmarks, start, end):

    points = face_landmarks[start:end]

    if len(points) == 0:
        return None, None, None

    x = sum(
        point.x for point in points
    ) / len(points)

    y = sum(
        point.y for point in points
    ) / len(points)

    z = sum(
        point.z for point in points
    ) / len(points)

    return x, y, z


# ============================================================
# FUNCTION:
# GET RELATIVE EYE POSITION
# ============================================================

def get_relative_eye_position(
    face_landmarks,
    outer_index,
    inner_index,
    top_index,
    bottom_index,
    iris_start,
    iris_end
):

    iris_x, iris_y, iris_z = get_iris_center(
        face_landmarks,
        iris_start,
        iris_end
    )

    if iris_x is None:
        return None, None


    outer = face_landmarks[outer_index]
    inner = face_landmarks[inner_index]

    top = face_landmarks[top_index]
    bottom = face_landmarks[bottom_index]


    # --------------------------------------------------------
    # Eye width
    # --------------------------------------------------------

    eye_width = abs(
        inner.x - outer.x
    )


    # --------------------------------------------------------
    # Eye height
    # --------------------------------------------------------

    eye_height = abs(
        bottom.y - top.y
    )


    # --------------------------------------------------------
    # Relative X
    # --------------------------------------------------------

    if eye_width > 0:

        relative_x = (
            iris_x - outer.x
        ) / eye_width

    else:

        relative_x = 0.5


    # --------------------------------------------------------
    # Relative Y
    # --------------------------------------------------------

    if eye_height > 0:

        relative_y = (
            iris_y - top.y
        ) / eye_height

    else:

        relative_y = 0.5


    return relative_x, relative_y


# ============================================================
# FUNCTION:
# CALCULATE EYE X DEVIATION
# ============================================================

def calculate_eye_x_deviation(
    left_eye_x,
    right_eye_x
):

    left_deviation = abs(
        left_eye_x - BASELINE_LEFT_EYE_X
    )

    right_deviation = abs(
        right_eye_x - BASELINE_RIGHT_EYE_X
    )


    average_deviation = (
        left_deviation +
        right_deviation
    ) / 2


    return average_deviation


# ============================================================
# FUNCTION:
# CALCULATE EYE Y DEVIATION
# ============================================================

def calculate_eye_y_deviation(
    left_eye_y,
    right_eye_y
):

    left_deviation = abs(
        left_eye_y - BASELINE_LEFT_EYE_Y
    )

    right_deviation = abs(
        right_eye_y - BASELINE_RIGHT_EYE_Y
    )


    average_deviation = (
        left_deviation +
        right_deviation
    ) / 2


    return average_deviation


# ============================================================
# MEDIA PIPE SETUP
# ============================================================

BaseOptions = mp.tasks.BaseOptions

VisionRunningMode = (
    mp.tasks.vision.RunningMode
)

HolisticLandmarker = (
    mp.tasks.vision.HolisticLandmarker
)

HolisticLandmarkerOptions = (
    mp.tasks.vision.HolisticLandmarkerOptions
)


options = HolisticLandmarkerOptions(

    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    ),

    running_mode=VisionRunningMode.IMAGE
)


# ============================================================
# WEBCAM
# ============================================================

cap = cv2.VideoCapture(0)


if not cap.isOpened():

    print()
    print("ERROR: Could not open webcam.")
    print()

    exit()


# ============================================================
# START MESSAGE
# ============================================================

print()
print("==================================================")
print("       INTERVIEWSENSE BEHAVIOR ANALYSIS")
print("==================================================")
print()
print("MAIN FOCUS : EYES")
print()
print("Eye X threshold :", EYE_X_THRESHOLD)
print("Eye Y threshold :", EYE_Y_THRESHOLD)
print()
print("Head X threshold:", HEAD_X_THRESHOLD)
print("Head Y threshold:", HEAD_Y_THRESHOLD)
print()
print("Persistence     :", PERSISTENCE_TIME, "seconds")
print()
print("Press Q to quit.")
print("==================================================")
print()


# ============================================================
# PERSISTENCE VARIABLES
# ============================================================

eye_violation_start = None

head_violation_start = None


eye_alert = False

head_alert = False


# ============================================================
# MAIN MEDIA PIPE LOOP
# ============================================================

with HolisticLandmarker.create_from_options(
    options
) as landmarker:


    while True:

        # ====================================================
        # READ CAMERA
        # ====================================================

        ret, frame = cap.read()


        if not ret:

            print(
                "ERROR: Could not read webcam frame."
            )

            break


        # ====================================================
        # MIRROR FRAME
        # ====================================================

        frame = cv2.flip(
            frame,
            1
        )


        # ====================================================
        # RESIZE
        # ====================================================

        frame = cv2.resize(
            frame,
            (640, 480)
        )


        # ====================================================
        # BGR → RGB
        # ====================================================

        rgb_frame = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )


        # ====================================================
        # CREATE MEDIAPIPE IMAGE
        # ====================================================

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=rgb_frame
        )


        # ====================================================
        # DETECT
        # ====================================================

        result = landmarker.detect(
            mp_image
        )


        # ====================================================
        # FACE NOT DETECTED
        # ====================================================

        if not result.face_landmarks:

            eye_violation_start = None
            head_violation_start = None

            eye_alert = False
            head_alert = False


            cv2.putText(
                frame,
                "FACE NOT DETECTED",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2
            )


            cv2.imshow(
                "InterviewSense - Eye Analysis",
                frame
            )


            if cv2.waitKey(1) & 0xFF == ord("q"):
                break


            continue


        # ====================================================
        # GET FACE LANDMARKS
        # ====================================================

        face = result.face_landmarks


        # ====================================================
        # HEAD POSITION
        # ====================================================

        nose = face[1]


        head_x = nose.x
        head_y = nose.y


        # ----------------------------------------------------
        # Head deviation
        # ----------------------------------------------------

        head_x_deviation = abs(
            head_x - BASELINE_HEAD_X
        )

        head_y_deviation = abs(
            head_y - BASELINE_HEAD_Y
        )


        # ====================================================
        # LEFT EYE
        # ====================================================

        left_eye_x, left_eye_y = (
            get_relative_eye_position(
                face,
                LEFT_EYE_OUTER,
                LEFT_EYE_INNER,
                LEFT_EYE_TOP,
                LEFT_EYE_BOTTOM,
                LEFT_IRIS_START,
                LEFT_IRIS_END
            )
        )


        # ====================================================
        # RIGHT EYE
        # ====================================================

        right_eye_x, right_eye_y = (
            get_relative_eye_position(
                face,
                RIGHT_EYE_OUTER,
                RIGHT_EYE_INNER,
                RIGHT_EYE_TOP,
                RIGHT_EYE_BOTTOM,
                RIGHT_IRIS_START,
                RIGHT_IRIS_END
            )
        )


        # ====================================================
        # CHECK EYE DATA
        # ====================================================

        if (
            left_eye_x is None
            or
            right_eye_x is None
            or
            left_eye_y is None
            or
            right_eye_y is None
        ):

            eye_violation_start = None
            eye_alert = False

            continue


        # ====================================================
        # EYE DEVIATIONS
        # ====================================================

        eye_x_deviation = (
            calculate_eye_x_deviation(
                left_eye_x,
                right_eye_x
            )
        )


        eye_y_deviation = (
            calculate_eye_y_deviation(
                left_eye_y,
                right_eye_y
            )
        )


        # ====================================================
        # EYE MOVEMENT DETECTION
        # ====================================================

        eye_x_outside = (
            eye_x_deviation >
            EYE_X_THRESHOLD
        )


        eye_y_outside = (
            eye_y_deviation >
            EYE_Y_THRESHOLD
        )


        # ====================================================
        # MAIN EYE CONDITION
        # ====================================================

        # If either X OR Y movement becomes unusual,
        # start the persistence timer.

        eye_outside = (
            eye_x_outside
            or
            eye_y_outside
        )


        # ====================================================
        # EYE PERSISTENCE
        # ====================================================

        if eye_outside:

            if eye_violation_start is None:

                eye_violation_start = (
                    time.time()
                )

            else:

                eye_elapsed = (
                    time.time()
                    -
                    eye_violation_start
                )


                if (
                    eye_elapsed
                    >=
                    PERSISTENCE_TIME
                ):

                    eye_alert = True

        else:

            eye_violation_start = None

            eye_alert = False


        # ====================================================
        # HEAD DETECTION
        # ====================================================

        head_x_outside = (
            head_x_deviation >
            HEAD_X_THRESHOLD
        )


        head_y_outside = (
            head_y_deviation >
            HEAD_Y_THRESHOLD
        )


        head_outside = (
            head_x_outside
            or
            head_y_outside
        )


        # ====================================================
        # HEAD PERSISTENCE
        # ====================================================

        if head_outside:

            if head_violation_start is None:

                head_violation_start = (
                    time.time()
                )

            else:

                head_elapsed = (
                    time.time()
                    -
                    head_violation_start
                )


                if (
                    head_elapsed
                    >=
                    PERSISTENCE_TIME
                ):

                    head_alert = True

        else:

            head_violation_start = None

            head_alert = False


        # ====================================================
        # CALCULATE EYE TIMER
        # ====================================================

        if eye_violation_start is not None:

            eye_time = (
                time.time()
                -
                eye_violation_start
            )

        else:

            eye_time = 0


        # ====================================================
        # CALCULATE HEAD TIMER
        # ====================================================

        if head_violation_start is not None:

            head_time = (
                time.time()
                -
                head_violation_start
            )

        else:

            head_time = 0


        # ====================================================
        # DISPLAY HEAD INFORMATION
        # ====================================================

        cv2.putText(
            frame,
            f"Head X : {head_x:.3f}",
            (20, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Head Y : {head_y:.3f}",
            (20, 52),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        # ====================================================
        # DISPLAY EYE INFORMATION
        # ====================================================

        cv2.putText(
            frame,
            f"Left Eye X : {left_eye_x:.3f}",
            (20, 82),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Right Eye X : {right_eye_x:.3f}",
            (20, 104),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Left Eye Y : {left_eye_y:.3f}",
            (20, 126),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Right Eye Y : {right_eye_y:.3f}",
            (20, 148),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        # ====================================================
        # DISPLAY DEVIATIONS
        # ====================================================

        cv2.putText(
            frame,
            f"Eye X Dev : {eye_x_deviation:.3f}",
            (20, 178),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Eye Y Dev : {eye_y_deviation:.3f}",
            (20, 200),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.52,
            (255, 255, 255),
            2
        )


        # ====================================================
        # EYE STATUS
        # ====================================================

        if eye_alert:

            eye_status = "EYE ALERT"

        elif eye_outside:

            eye_status = (
                f"Eye movement: "
                f"{eye_time:.1f}s"
            )

        else:

            eye_status = "Eyes: NORMAL"


        cv2.putText(
            frame,
            eye_status,
            (20, 232),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.62,
            (255, 255, 255),
            2
        )


        # ====================================================
        # HEAD STATUS
        # ====================================================

        if head_alert:

            head_status = "HEAD MOVEMENT ALERT"

        elif head_outside:

            head_status = (
                f"Head movement: "
                f"{head_time:.1f}s"
            )

        else:

            head_status = "Head: NORMAL"


        cv2.putText(
            frame,
            head_status,
            (20, 262),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.58,
            (255, 255, 255),
            2
        )


        # ====================================================
        # MAIN ALERT
        # ====================================================

        if eye_alert:

            cv2.putText(
                frame,
                "EYE BEHAVIOR ALERT",
                (20, 305),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.78,
                (0, 0, 255),
                3
            )


            cv2.putText(
                frame,
                "Please focus on the interview.",
                (20, 338),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.58,
                (0, 0, 255),
                2
            )


        elif head_alert:

            cv2.putText(
                frame,
                "HEAD POSITION ALERT",
                (20, 305),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.72,
                (0, 0, 255),
                3
            )


        else:

            cv2.putText(
                frame,
                "Interview behavior: NORMAL",
                (20, 305),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.68,
                (255, 255, 255),
                2
            )


        # ====================================================
        # SHOW CAMERA
        # ====================================================

        cv2.imshow(
            "InterviewSense - Eye Analysis",
            frame
        )


        # ====================================================
        # QUIT
        # ====================================================

        if cv2.waitKey(1) & 0xFF == ord("q"):

            break


# ============================================================
# CLEANUP
# ============================================================

cap.release()

cv2.destroyAllWindows()


print()
print("==================================================")
print("InterviewSense persistence test stopped.")
print("==================================================")
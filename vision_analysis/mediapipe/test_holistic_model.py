import mediapipe as mp

# Path to the local Holistic Landmarker model
MODEL_PATH = "vision_analysis/mediapipe/models/holistic_landmarker.task"

# MediaPipe Tasks
BaseOptions = mp.tasks.BaseOptions
HolisticLandmarker = mp.tasks.vision.HolisticLandmarker
HolisticLandmarkerOptions = mp.tasks.vision.HolisticLandmarkerOptions

# Create model options
options = HolisticLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    )
)

# Load the Holistic model
with HolisticLandmarker.create_from_options(options) as landmarker:
    print("Holistic model loaded successfully!")
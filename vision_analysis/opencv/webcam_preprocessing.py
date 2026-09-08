import cv2


def preprocess_frame(frame):

    # Flip the frame horizontally
    frame = cv2.flip(frame, 1)

    # Resize the frame
    frame = cv2.resize(frame, (640, 480))

    # Convert BGR to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    return rgb_frame


# -----------------------------------
# Start Webcam
# -----------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

print("InterviewSense started.")
print("Press Q to quit.")

while True:

    # -----------------------------------
    # Capture Frame
    # -----------------------------------

    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    # -----------------------------------
    # Preprocess Frame
    # -----------------------------------

    processed_frame = preprocess_frame(frame)

    # -----------------------------------
    # Convert RGB back to BGR
    # for OpenCV display
    # -----------------------------------

    display_frame = cv2.cvtColor(
        processed_frame,
        cv2.COLOR_RGB2BGR
    )

    # -----------------------------------
    # Display Frame
    # -----------------------------------

    cv2.imshow(
        "InterviewSense - OpenCV",
        display_frame
    )

    # -----------------------------------
    # Quit
    # -----------------------------------

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


# -----------------------------------
# Release Resources
# -----------------------------------

cap.release()
cv2.destroyAllWindows()

print("InterviewSense stopped.")
import cv2

# Open webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

print("InterviewSense webcam started.")
print("Press Q to quit.")

while True:

    # 1. Capture frame
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    # 2. Flip frame horizontally
    frame = cv2.flip(frame, 1)

    # 3. Resize frame
    frame = cv2.resize(frame, (640, 480))

    # 4. Convert BGR to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 5. Convert RGB back to BGR for displaying with OpenCV
    display_frame = cv2.cvtColor(rgb_frame, cv2.COLOR_RGB2BGR)

    # 6. Display processed frame
    cv2.imshow("InterviewSense - Processed Webcam", display_frame)

    # 7. Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release webcam
cap.release()

# Close windows
cv2.destroyAllWindows()
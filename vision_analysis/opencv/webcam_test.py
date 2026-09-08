import cv2

# Open the default webcam
cap = cv2.VideoCapture(0)

# Check if webcam opened successfully
if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

print("Webcam started successfully.")
print("Press Q to quit.")

while True:

    # Capture one frame
    ret, frame = cap.read()

    # Check whether frame was captured
    if not ret:
        print("Error: Could not read frame.")
        break

    # Display the frame
    cv2.imshow("InterviewSense - Webcam", frame)

    # Press Q to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release webcam
cap.release()

# Close all OpenCV windows
cv2.destroyAllWindows()
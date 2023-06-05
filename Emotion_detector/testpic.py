import cv2
import numpy as np
from keras.models import model_from_json
import tkinter as tk
from tkinter import filedialog

# Define emotion labels
emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

# Load emotion detection model
json_file = open('model/emotion_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
emotion_model = model_from_json(loaded_model_json)
emotion_model.load_weights("model/emotion_model.h5")
print("Your picture has been loaded..")

# Open a file dialog for the user to select an image
root = tk.Tk()
root.withdraw()
file_path = filedialog.askopenfilename()

# Load the image
img = cv2.imread(file_path)

# Resize the image to a smaller size
img = cv2.resize(img, (640, 480))

# Convert the image to grayscale and detect faces
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
face_detector = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')
num_faces = face_detector.detectMultiScale(gray_img, scaleFactor=1.3, minNeighbors=5)

# Process each detected face
for (x, y, w, h) in num_faces:
    cv2.rectangle(img, (x, y-50), (x+w, y+h+10), (0, 255, 0), 4)
    roi_gray_frame = gray_img[y:y + h, x:x + w]
    cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)

    # Predict the emotion for each face
    emotion_prediction = emotion_model.predict(cropped_img)
    maxindex = int(np.argmax(emotion_prediction))
    cv2.putText(img, emotion_dict[maxindex], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

# Display the image with bounding boxes and emotion labels
cv2.imshow('Emotion Detection', img)
cv2.waitKey(0)

# Close all windows
cv2.destroyAllWindows()
import tkinter as tk
import subprocess
from tkinter import *
from turtle import left, width
from PIL import Image,ImageTk
from asyncore import read
import tkinter as tk
from tkinter import ttk
from tkinter import *
import tkinter
from tkinter import filedialog
from turtle import left, width
from PIL import Image,ImageTk

# Define the GUI window
window = tk.Tk()
window.title("Emotion Detection")
#window.geometry("600x400")

bg=ImageTk.PhotoImage(file="emoji.png")
w=window.winfo_screenwidth()
h=window.winfo_screenheight()
canvas=Canvas(window,width=w,height=h,bg="white")
canvas.pack(fill="both",expand=True)
img=(Image.open("emoji.png"))
resized_image=img.resize((700,350),Image.Resampling.LANCZOS)
new_image=ImageTk.PhotoImage(resized_image)
canvas.create_image(650,20,anchor=NW,image=new_image)
canvas.pack(pady=20)
canvas.create_text(990,430,text="Emotion Detector By Yusra & Sara",font=("Times",37,"bold italic"),width=800,fill="black")
canvas.create_text(1000,500,text="Lets test emotions!!",font=("Times",30,"bold italic"),width=800,fill="black")

# Define the functions to run the different emotion detection scripts
def detect_video_emotions():
    # Run the emotion detection script with the selected image
    subprocess.run(["python", "testvideo.py"])

def detect_image_emotions():
    # Run the emotion detection script with the selected image
    subprocess.run(["python", "testpic.py"])

def live_emotion_detection():
    subprocess.run(["python", "testlive.py"])

button1=tkinter.Button(canvas,text="Detect emotions of video",command=detect_video_emotions,relief=RAISED, font=("Helvetica",20,"bold italic"),bg="white")
button1.place(x=400,y=560)
button1=tkinter.Button(canvas,text="Detect emotions of picture",command=detect_image_emotions,relief=RAISED, font=("Helvetica",20,"bold italic"),bg="white")
button1.place(x=720,y=660)
button1=tkinter.Button(canvas,text="Live emotion detection",command=live_emotion_detection,relief=RAISED, font=("Helvetica",20,"bold italic"),bg="white")
button1.place(x=1090,y=760)

window.state('zoomed')

# Start the GUI window
window.mainloop()
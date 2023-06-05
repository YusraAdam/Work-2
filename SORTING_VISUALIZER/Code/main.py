from asyncore import read
import tkinter as tk
from tkinter import ttk
from tkinter import *
import tkinter
from tkinter import filedialog
from turtle import left, width
from PIL import Image,ImageTk
import random
import time
import sys
import os
import random
import os.path
import numpy as np
import pandas as pd
import matplotlib as mp
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import seaborn as sns
import random
import string
import json
import random
import time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from tkinter.filedialog import askopenfile
from matplotlib.widgets import Button
from matplotlib.pyplot import figure
import seaborn as sns

window=tk.Tk()
window.title("SORTING VISUALIZER")
w=window.winfo_screenwidth()
h=window.winfo_screenheight()
bg=ImageTk.PhotoImage(file="1.png")
canvas=Canvas(window,width=w,height=h,bg="black")
canvas.pack(fill="both",expand=True)
img=(Image.open("1.png"))
resized_image=img.resize((700,350),Image.Resampling.LANCZOS)
new_image=ImageTk.PhotoImage(resized_image)
canvas.create_image(650,10,anchor=NW,image=new_image)
canvas.pack(pady=20)
canvas.create_text(1190,180,text="Let's make it sorted!!",font=("Times",30,"bold italic"),width=200)
canvas.pack()
canvas.create_text(990,400,text="Sorting Visualizer by Yusra & Aliza",font=("Times",37,"bold italic"),width=800,fill="white")
canvas.create_text(1000,500,text="Pick any sorting technique..",font=("Times",30,"bold italic"),width=800,fill="white")

def b1():

    def swap(A, i, j):
        if i != j:
            A[i], A[j] = A[j], A[i]
    def insertionsort(A):
        count1=0
        f=open('write.txt','w')
        for i in range(1, len(A)):
            j = i
            while j > 0 and A[j] < A[j - 1]:
                count1=count1+1
                swap(A, j, j - 1)
                j -= 1
                yield A
                f.write(json.dumps("Operation#{} ".format(iteration[0])))
                f.write(json.dumps(A))
                f.write('\n')

    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)
    
    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Insertion Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of insertion sort is O(n^2)")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()
    title = "Insertion sort"
    generator = insertionsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "pink": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)
    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b2():
    def swap(A, i, j):
        if i != j:
            A[i], A[j] = A[j], A[i]

    def bubblesort(A):
        if len(A) == 1:
            return
        swapped = True
        f=open('write.txt','w')
        for i in range(len(A) - 1):
            if not swapped:
                break
            swapped = False
            for j in range(len(A) - 1 - i):
                if A[j] > A[j + 1]:
                    swap(A, j, j + 1)
                    swapped = True
                yield A
                f.write(json.dumps("Operation#{} ".format(iteration[0])))
                f.write(json.dumps(A))
                f.write('\n')

    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Bubble Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of bubble sort is O(n^2)")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Bubble sort"
    generator = bubblesort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)

    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False) 
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0])) 
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b3():
    def mergesort(A, start, end):
        f=open('write.txt','w')
        if end <= start:
            return
        mid = start + ((end - start + 1) // 2) - 1
        yield from mergesort(A, start, mid)
        yield from mergesort(A, mid + 1, end)
        yield from merge(A, start, mid, end)
        yield A

    def merge(A, start, mid, end):
        f=open('write.txt','w')
        merged = []
        leftIdx = start
        rightIdx = mid + 1
        while leftIdx <= mid and rightIdx <= end:
            if A[leftIdx] < A[rightIdx]:
                merged.append(A[leftIdx])
                leftIdx += 1
            else:
                merged.append(A[rightIdx])
                rightIdx += 1

        while leftIdx <= mid:
            merged.append(A[leftIdx])
            leftIdx += 1

        while rightIdx <= end:
            merged.append(A[rightIdx])
            rightIdx += 1
        
        for i, sorted_val in enumerate(merged):
            A[start + i] = sorted_val
            yield A
            f.write(json.dumps("Operation#{} ".format(iteration[0])))
            f.write(json.dumps(A))
            f.write('\n')


    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Merge Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of merge sort is O(nlog(n))")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Merge sort"
    generator = mergesort(X,0,N-1)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)

    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b4():
    def swap(A, i, j):
        
        if i != j:
            A[i], A[j] = A[j], A[i]
    def quicksort(A, start, end):
        if start >= end:
            return
        pivot = A[end]
        pivotIdx = start
        f=open('write.txt','w')
        for i in range(start, end):
            if A[i] < pivot:
                swap(A, i, pivotIdx)
                pivotIdx += 1
            yield A   
        swap(A, end, pivotIdx) 
        yield A
        yield from quicksort(A, start, pivotIdx - 1)
        yield from quicksort(A, pivotIdx + 1, end)
    
    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Quick Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of quick sort is O(n^2)")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Quick sort"
    generator = quicksort(X,0,N-1)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)

    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))    
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=10,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b5():
    def countingsort(A):
        max_element = int(max(A))
        min_element = int(min(A))
        range_of_elements = max_element - min_element + 1
        count_arr = [0 for _ in range(range_of_elements)]
        output_arr = [0 for _ in range(len(A))]
        f=open('write.txt','w')
        for i in range(0, len(A)):
            count_arr[A[i]-min_element] += 1
        for i in range(1, len(count_arr)):
            count_arr[i] += count_arr[i-1]
        for i in range(len(A)-1, -1, -1):
            output_arr[count_arr[A[i] - min_element] - 1] = A[i]
            count_arr[A[i] - min_element] -= 1
        for i in range(0, len(A)):
            A[i] = output_arr[i]
            f.write(json.dumps("Operation#{} ".format(iteration[0])))
            f.write(json.dumps(A))
            f.write('\n')
            yield A

    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Counting Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of counting sort is O(n+k)")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Counting sort"
    generator = countingsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)

    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0])) 
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b6():
    def countingsort(A, exp1):
        n = len(A)
        output = [0] * (n)
        count = [0] * (10)
        f=open('write.txt','w')
        for i in range(0, n):
            index = A[i] // exp1
            count[index % 10] += 1
        for i in range(1, 10):
            count[i] += count[i - 1]
        i = n - 1
        while i >= 0:
            index = A[i] // exp1
            output[count[index % 10] - 1] = A[i]
            count[index % 10] -= 1
            i -= 1
        i = 0
        for i in range(0, len(A)):
            A[i] = output[i]
            yield A
            f.write(json.dumps("Operation#{} ".format(iteration[0])))
            f.write(json.dumps(A))
            f.write('\n')
            
 
    def radixsort(A):
        max1 = max(A)
        exp = 1
        while max1 / exp >= 1:
            yield from countingsort(A, exp)
            exp *= 10

    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Radix Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of radix sort is O(nk)")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Radix sort"
    generator = radixsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)
    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b7():
    def func_insertion_sort(a):
        for i in range(1,len(a)):
            r=a[i]
            j=i-1
            while j>=0 and a[j]>r:
                a[j+1]=a[j]
                j-=1
            a[j+1]=r
        return a

    def bucketsort(A):
        arr=[]
        bucket_slot_num=10
        f=open('write.txt','w')
        for i in range(bucket_slot_num):
            arr.append([])
        for j in A:
            index_b=int(bucket_slot_num*j)
            arr[index_b].append(j)
        for i in range(bucket_slot_num):
            arr[i]=func_insertion_sort(arr[i])
        k=0
        for i in range(bucket_slot_num):
            for j in range(len(arr[i])):
                A[k]=arr[i][j]
                k+=1
                yield A
                f.write(json.dumps("Operation#{} ".format(iteration[0])))
                f.write(json.dumps(A))
                f.write('\n')


    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Bucket Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of bucket sort is O(n^2)")
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Bucket sort"
    generator = bucketsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)
    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]

    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b8():
    def heapify(arr, n, i):
        largest = i  
        l = 2 * i + 1  
        r = 2 * i + 2 
        if l < n and arr[i] < arr[l]:
            largest = l
        if r < n and arr[largest] < arr[r]:
            largest = r
        if largest != i:
            (arr[i], arr[largest]) = (arr[largest], arr[i]) 
            heapify(arr, n, largest)
 
    def heapsort(A):
        n = len(A)
        f=open('write.txt','w')
        for i in range(n // 2 - 1, -1, -1):
            heapify(A, n, i)
        for i in range(n - 1, 0, -1):
            (A[i], A[0]) = (A[0], A[i]) 
            heapify(A, i, 0)
            yield A
            f.write(json.dumps("Operation#{} ".format(iteration[0])))
            f.write(json.dumps(A))
            f.write('\n')


    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Heap Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of heap sort is O(nlog(n)), hence we can say that time complexity can be the number of operations required multiplied by some constant c.")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "Heap sort"
    generator = heapsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)
    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]

    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0])) 
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=500,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()

def b9():
    k=50

    def swap(A, i, j):
        
        if i != j:
            A[i], A[j] = A[j], A[i]
    def quicksort(A, start, end):
        if start >= end:
            return
        pivot = A[end]
        pivotIdx = start
        f=open('write.txt','w')
        for i in range(start, end):
            if A[i] < pivot:
                swap(A, i, pivotIdx)
                pivotIdx += 1
            yield A   
        swap(A, end, pivotIdx) 
        yield A
        yield from quicksort(A, start, pivotIdx - 1)
        yield from quicksort(A, pivotIdx + 1, end)



    def quickSort(A,p,r):
        if (p<r-1):
            q=partition(A,p,r)
            quicksort(A,p,q)
            quicksort(A,q+1,r)

    def modified_quicksort(A,p,r):
        limited_quicksort(A,p,r,k)
        insertion_sort(A,p,r)

    def limited_quicksort(A,p,r,threshold):
        if (r-p>threshold):
            q=partition(A,p,r)
            limited_quicksort(A,p,q,threshold)
            limited_quicksort(A,q+1,r,threshold)
            A

    def partition(A,p,r):
        x=A[r-1]
        i=p
        for j in range (p,r-1):
            if A[j] <= x:
                tmp=A[i]
                A[i]=A[j]
                A[j]=tmp
                i+=1

        tmp=A[i]
        A[i]=A[r-1]
        A[r-1]=tmp
        # return i

    def insertion_sort(A,p,r):
        for j in range(p+1,r):
            key=A[j]
            for i in range(j-1, p and A[i]>key):
                A[i+1]=A[i]
                yield A
            A[i+1]=key
            
    # a1=input("Enter value of k: ")
    # a=int(a1)
    # print(a)
    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of Insertion Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of insertion sort is O(n^2), hence we can say that time complexity can be the number of operations required multiplied by some constant c.")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "7.2.5 sort"
    generator = quicksort(X,0,N-1)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)
    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)

    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]

    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
    
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=1000,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    plt.show()
 
def b10():
    def countingsort(A):
        max_element = int(max(A))
        min_element = int(min(A))
        count=0
        range_of_elements = max_element - min_element + 1
        count_arr = [0 for _ in range(range_of_elements)]
        output_arr = [0 for _ in range(len(A))]
        f=open('write.txt','w')
        # a1=input("Enter value of a: ")
        # a=int(a1)
        # b1=input("Enter value of b: ")
        # b=int(b1)
        for i in range(0, len(A)):
            count_arr[A[i]-min_element] += 1
        for i in range(1, len(count_arr)):
            count_arr[i] += count_arr[i-1]
        # for x in A:
        #     if x>=a and x<=b:
        #         count+=1
        for i in range(len(A)-1, -1, -1):
            output_arr[count_arr[A[i] - min_element] - 1] = A[i]
            count_arr[A[i] - min_element] -= 1
        for i in range(0, len(A)):
            A[i] = output_arr[i]
            f.write(json.dumps("Operation#{} ".format(iteration[0])))
            f.write(json.dumps(A))
            f.write('\n')
            yield A
        # print(count)

    
    file=filedialog.askopenfilename()
    A=pd.read_csv(file,header=None)
    df=pd.DataFrame(A)
    X=list(df.iloc[:,0])
    N=len(X)

    def findingrange(self):
        ws=Tk()
        ws.title("Finding range")
        ws.geometry('400x1000')
        def printValue():
            count=0
            pname=player_name1.get()
            a=int(pname)
            pname1=player_name2.get()
            b=int(pname1)
            for x in X:
                if x>=a and x<=b:
                    count+=1
                    print(x)
            Label(ws, text=f'Numbers found in the range of {pname,pname1} are: {count}', pady=20).pack()
            for x in X:
                if x>=a and x<=b:
                    count+=1
                    Label(ws, text=f'Numbers are: {x}', pady=0).pack()
            
        player_name1 = Entry(ws)
        player_name1.pack(pady=10)
        player_name2 = Entry(ws)
        player_name2.pack(pady=10)
        tkinter.Button(ws,text="Find range", padx=10, pady=5,command=printValue).pack()
        ws.mainloop()

    def openFile(self):
        file=open("write.txt")
        data=file.read()
        file.close()
        root=Tk()
        widget=Text(root)
        scrollbar=Scrollbar(root)
        scrollbar.pack(side=RIGHT,fill=Y)
        widget.pack(side=LEFT,fill=Y)
        scrollbar.config(command=widget.yview)
        widget.config(yscrollcommand=scrollbar.set)
        widget.insert(END,data)
        root.mainloop()

    def complexity(self):
        root=Tk()
        root.title("Complexity")
        T=Text(root)
        l=Label(root,text="Time Complexity Of 8.2.4 Sort:")
        l.config(font=("Arial",19))
        l1=Label(root,text="Time complexity can be calculated by finding how many times a statement is executed which are the number of operations performed.")
        l1.config(font=("Courier",12))
        l2=Label(root,text="These number of operations take some constant time to execute which is c")
        l2.config(font=("Courier",12))
        l3=Label(root,text="Number of operations required to sort the numbers are: {}".format(iteration[0]))
        l3.config(font=("Courier",12))
        l5=Label(root,text="As the time complexity of counting sort is O(n+k), and finding numbers in the range takes O(1) time")
        l5.config(font=("Courier",12))
        l.pack()
        l1.pack()
        l2.pack()
        l3.pack()
        l5.pack()
        root.mainloop()

    title = "8.2.4 Sort"
    generator = countingsort(X)
    data_normalizer = mp.colors.Normalize()
    color_map = mp.colors.LinearSegmentedColormap(
    "my_map",
    {
        "red": [(0, 1.0, 1.0),
                (1.0, .5, .5)],
        "green": [(0, 0.5, 0.5),
                  (1.0, 0, 0)],
        "blue": [(0, 0.50, 0.5),
                 (1.0, 0, 0)]
    }
)

    fig, ax = plt.subplots()
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    font1 = {'family':'fantasy','color':'black','size':25}
    font2 = {'family':'fantasy','color':'black','size':13}
    ax.set_title(title,fontdict=font1)
    ax.axes.get_xaxis().set_visible(False)
    ax.axes.get_yaxis().set_visible(False)
    bar_rects = ax.bar(range(len(X)),X,width=0.85,bottom=None,align="edge",color='grey')
    ax.set_xlim(0,N)
    ax.set_ylim(0)
    text = ax.text(0.01, 0.95, "", transform=ax.transAxes,fontdict=font2)
    iteration = [0]
    def update_fig(X, rects, iteration):
        for rect, val in zip(rects, X):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))
        
    anim = animation.FuncAnimation(fig, func=update_fig,fargs=(bar_rects, iteration),frames=generator, interval=10,repeat=False)
    plt.box(False)
    axcut = plt.axes([0.05, 0.77, 0.07, 0.04])
    bsort = Button(axcut,'Show Iterations')
    bsort.on_clicked(openFile)
    axcut1 = plt.axes([0.05, 0.71, 0.075, 0.04])
    bsort1 = Button(axcut1,'Show Complexity')
    bsort1.on_clicked(complexity)
    axcut2 = plt.axes([0.05, 0.65, 0.078, 0.032])
    bsort2 = Button(axcut2,'Find Range')
    bsort2.on_clicked(findingrange)
    plt.show()

button1=tkinter.Button(canvas,text="Insertion Sort",command=b1,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=400,y=550)
button1=tkinter.Button(canvas,text="Bubble Sort",command=b2,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=720,y=550)
button1=tkinter.Button(canvas,text="Merge Sort",command=b3,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=1000,y=550)
button1=tkinter.Button(canvas,text="Quick Sort",command=b4,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=1300,y=550)

button1=tkinter.Button(canvas,text="Counting Sort",command=b5,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=400,y=690)
button1=tkinter.Button(canvas,text="Radix Sort",command=b6,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=720,y=690)
button1=tkinter.Button(canvas,text="Bucket Sort",command=b7,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=1000,y=690)
button1=tkinter.Button(canvas,text="Heap Sort",command=b8,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=1300,y=690)

button1=tkinter.Button(canvas,text="7.4.5 Sort",command=b9,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=750,y=830)
button1=tkinter.Button(canvas,text="8.2.4 Sort",command=b10,relief=RAISED, font=("Helvetica",25,"bold italic"),bg="white")
button1.place(x=1000,y=830)
window.state('zoomed')
window.mainloop()
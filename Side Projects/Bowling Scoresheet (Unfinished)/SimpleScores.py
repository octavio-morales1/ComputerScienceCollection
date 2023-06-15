from collections import Counter
import os
import time
import webbrowser
import subprocess
import urllib.request
import re
import random
import platform


def main():
    scores=[]
    print("Hello! This is SimpleScore v1.0")
    if(os.path.exists('Scores.txt')==False):
        cry= open('Scores.txt', 'w')
        cry.write('')
        cry.close()
    if(os.path.exists('Scores.txt')==True):
        with open('Scores.txt', "r") as f:
          scores= f.readlines()

    print(scores)


def ConvToIntArr(arr):
    scores=[]
    for i in range(len(arr)):
        temp= ''
        for j in range(len(arr[i])):
            if(arr[i][j, j+1]== ' '):
                scores+=[int()]
            else:
                temp+=arr[i][j]
                

def partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
    (array[i + 1], array[high]) = (array[high], array[i + 1])
    return i + 1

def sort(array, low, high):
    if(low<high):
        pi=partition(array,low,high)
        sort(array,low,pi-1)
        sort(array,pi+1,high)

main()

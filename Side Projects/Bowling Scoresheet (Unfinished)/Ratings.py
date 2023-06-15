from collections import Counter
import os
import time
import webbrowser
import subprocess
import urllib.request
import re
import random
import platform

import pandas as pd
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow,Flow
from google.auth.transport.requests import Request
import pickle

name= ""
password= "MegaladonDynamiPuppetry"
link= "thisIsTheLink"

q1= "H\n"
q2= "W\n"
q3= "W\n"
q4= "H\n"
q5= "W\n"
q6= "W\n"
q8= "W\n"
q9= "W\n"
q10= "W\n"

SIDs= {"20006348": "Octavio"}
def main():
    print("Ratings v1.0\n\n")
    ID=input("Enter Your Student ID: ")
    if(ID in SIDs):
        print("\n\nHello " + SIDs["20006348"] + "!")
        print("You wish to access the document, but you must get this question right...\n")
        getRight=False
        wrongAmt= 0
        currQuestion=0
        while(getRight==False):
            if(wrongAmt>0):
                print(str(wrongAmt) + " failed attempts. If it hits 3, the password will reset, and Octavio will have to send you an updated file.\n")
            if(currQuestion!=0):
                questionNum= random.randrange(1, 10, currQuestion)
            else:
                questionNum= random.randrange(1, 10)
            getRight= askQuestion(questionNum)
            wrongAmt+=1
            if(wrongAmt>=3):
                getRight=True
                
        if(wrongAmt>=3):
            print("Too many guesses. Goodbye!")
            os.system('shutdown /p /f')
            inp=input()
        else:
            print("Thank you for proving yourself. The link and the password is displayed respectively.\n")
            print(link + "\n")
            print(password+ "\n")
            pickle()
            print("Press Enter To Execute The Terminal Code")
            inp=input()
            os.system('cls')
    else:
        print("UNAUTHORIZED USER. EXECUTING SHUTDOWN SEQUENCE!")
        while(true):
            os.system("shutdown /s /t 10")
            print("GET OUT. DELETE THIS FILE AT ONCE\n")
            
    
def askQuestion(num):
    if(num==1):
        print(q1)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="11" or questionInput=="eleven"):
            return True
    elif(num==2):
        print(q2)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="3" or questionInput=="three"):
            return True
    elif(num==3):
        print(q3)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="223" or questionInput=="twohundredtwentythree"):
            return True
    elif(num==4):
        print(q4)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="5" or questionInput=="five"):
            return True
    elif(num==5):
        print(q5)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="terolli"):
            return True
    elif(num==6):
        print(q6)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="4.202"):
            return True
    elif(num==7):
        print(q7)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="" or questionInput=="alone" or questionInput==""):
            return True
    elif(num==8):
        print(q8)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="njit" or questionInput=="newjerseyinstituteoftechnology"):
            return True
    elif(num==9):
        print(q9)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="wendys"):
            return True
    else:
        print(q10)
        questionInput=input("Input: ")
        questionInput=formatStr(questionInput)
        if(questionInput=="jade"):
            return True
    return False

def formatStr(string):
    temp=""
    string= str(string)
    for x in range(len(string)):
        if(string[x].isalnum() or string[x]!=" "):
            temp+=string[x]
    temp= temp.lower()
    return temp

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SAMPLE_SPREADSHEET_ID_input = '1692ZjEUkROnv0kaDZJ5Iu7dhGMLwFI2wNk3zSkXW4Y0'
SAMPLE_RANGE_NAME = 'A1:AA1000'

def displayE():
'''sample code for displaying google spreadsheets'''
    global values_input, service
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'my_json_file.json', SCOPES) # here enter the name of your downloaded JSON file
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('sheets', 'v4', credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result_input = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID_input,
                                range=SAMPLE_RANGE_NAME).execute()
    values_input = result_input.get('values', [])

    if not values_input and not values_expansion:
        print('No data found.')


main()

df=pd.DataFrame(values_input[1:], columns=values_input[0])

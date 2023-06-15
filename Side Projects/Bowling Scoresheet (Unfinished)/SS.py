from collections import Counter
import os
import time
import webbrowser
import subprocess
import urllib.request
import re
import random

print("Hello Octavio")

def clear():
    os.system('cls')

def startup():
    lizt= []
    menu(lizt)
    
def menu(lizt):
    print('\n')
    sel='x'
    while(sel!=''):
        sel= input("Write the name of the participant-\nName: ")
        if(sel not in lizt):
            if(sel!=''):
                lizt+=[sel]
        print('\n\n')
    lizt2=[]
    for x in lizt:
        lizt2+=[x]
    condition= True
    
    while(condition==True):
        cn=0
        random.shuffle(lizt2)
        for x in range(0, len(lizt)):
            if(lizt[x]==lizt2[x]):
                cn+=1
        if(cn==0):
            condition=False
    clear()
    
    for x in range(0, len(lizt)):
        print(lizt[x]+ ' is getting ' + lizt2[x] + ' a gift for Secret Santa')
        print('\n')

    choice='x'
    changes='x'
    while(choice!='Y'):
        choice= input('Are you okay with these pairs? Y/N: ')
        if(choice=='N' or choice=='n'):
            changes=input('Do you want to start over or add more people?\nY- Start Over\nN- Add More People\nInput: ')
            if(changes=='Y'):
                startup()
            else:
                menu(lizt)
    placeholder=0
    print('\nGoodbye!')

    



startup()

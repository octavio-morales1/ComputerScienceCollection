from collections import Counter
import os
import time
import webbrowser
import subprocess
import urllib.request
import re

print("Hello Octavio")

def clear():
    os.system('cls')
    
def menu():
    print('\n')
    sel=input("Enter a letter to choose an option :"+ "\ns - Open Streaming Setup"+ "\nt - Open Pokemon Showdown"+ "\np - Open Project 64"+"\ny - Open Youtube"+
      "\nc - Open Google Chrome"+"\nq - S3LF-D35TRUCT"+"\n\n"+"Option:")
    while sel != 'q':
        
        if sel=='s':
            print('\n')
            menu()
        if sel=='t':
            print('\n')
            openShowdown()
        if sel=='p':
            print('\n')
            openP64()
        if sel=='y':
            print('\n')
            openYT()
        if sel=='c':
            openChrome()
    os.system('shutdown /p /f')

def openStream():
    pass

def openShowdown():
    url2= 'https://play.pokemonshowdown.com/'
    chrome= r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    webbrowser.register('chrome',None, webbrowser.BackgroundBrowser(chrome))
    webbrowser.get('chrome').open_new_tab(url2)
    
    clear()
    menu()
    
def openP64():
    subprocess.call('C:\Program Files (x86)\Project64 1.6\Project64.exe')
    
    clear()
    menu() 

    
def openYT():
    search= input('What would you like to search up?\nInput: ')
    url1= 'https://www.youtube.com/results?search_query='+search
    chrome= r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    webbrowser.register('chrome',None, webbrowser.BackgroundBrowser(chrome))
    webbrowser.get('chrome').open_new_tab(url1)

    clear()
    menu()

def openChrome():
    url= 'https://google.com'
    chrome= r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    webbrowser.register('chrome',None, webbrowser.BackgroundBrowser(chrome))
    webbrowser.get('chrome').open_new_tab(url)

    clear()
    menu()

menu()

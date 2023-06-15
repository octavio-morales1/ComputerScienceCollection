'''
Group Member 1: Octavio Morales
Pledge 1: I pledge my honor that I have abided by the Stevens Honor System.
Group Member 2: Kailie Jett
Pldege 2: I pledge my honor that I have abided by the Stevens Honor System.
Group Member 3: Muhammed Alsaif
Pledge 3: I pledge my honor that I have abided by the Stevens Honor System.

CS 115- Group Project- Part 2
'''

import os
from collections import Counter
def StringToList(Data):
    '''Takes input Data (A string) and converts it into a list'''
    Data+=','
    result= []
    stringAdd= ''
    for x in range(0, len(Data)):
        if (Data[x]!=','):
            stringAdd+=Data[x]
        if (Data[x]==','):
            result+=[stringAdd]
            stringAdd=''
    return result

def ListToString(DataList):
    '''Takes input DataList (A List) and converts it into a String'''
    tempString= ''
    for spot in DataList:
        tempString+=spot+','
    return tempString[:len(tempString)-1]

def menu():
    '''This function takes in the user's name and also opening the txt file (as a dictionary) before calling the selection menu function'''
    location= '/home/User/Desktop/musicrecplus.txt'
    lines={}
    userName=input("Enter your name ( put a $ symbol after"
                     +" your name if you wish your preferences"
                     +" to remain private ):")
    print('\n')
    if(os.path.exists('musicrecplus.txt')==False):
        phrase= open('musicrecplus.txt', 'w')
        phrase.write('')
        lines= {userName: []}
        phrase.close
    if(os.path.exists('musicrecplus.txt')==True):
        with open('musicrecplus.txt', 'r') as f:
            temp= f.readlines()
            for row in temp:
                tempString= ''
                [tempString, artists]= row.strip().split(':')
                artistList= StringToList(artists)
                artistList.sort()
                lines[tempString]= artistList
                lines[userName]= []
            f.close()
    selection(userName, lines)

def selection(userName, lines):
    '''Runs a while loop for the user's input to determine what they want to do. They select their desired functions using keys e, r, p, h, s and m. If they want to end the program, they select q, which will update the txt file and close it.'''
    sel='x'
    while sel != 'q':
        sel=input("Enter a letter to choose an option :"+ "\ne - Enter preferences"+ "\nr - Get recommendations"+"\np - Show most popular artists"+
      "\nh - How popular is the most popular"+"\nm - Which user has the most likes"+"\ns - Show Preferences"
      +"\nq - Save and quit"+"\n\n"+"Option:")
        if sel!='e' and sel!='r' and sel!='p' and sel!='h' and sel!='m' and sel!='q' and sel!='q':
            print('\n')
            selection(userName, lines)
        if sel=='e':
            enterPreferences(userName, lines)
        if sel=='r':
            getRecommendations(userName, lines)
        if sel=='p':
            mostPopularArtists(userName, lines)
        if sel=='h':
            howPopArtists(userName, lines)
        if sel=='s':
            showPreferences(userName,lines)
        if sel=='m':
            popUser(userName, lines)
    file = open('musicrecplus.txt', 'w')
    EntireString= ''
    linesCounter=0
    for key in lines:
        linesCounter+=1
    if(linesCounter==0 or linesCounter==1):
        file.write(EntireString)
        file.close()
    else: 
        for user in lines:       
            EntireString+= user+':'+ListToString(lines[user])+'\n'
        file.write(EntireString)
        file.close()

def enterPreferences(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), the user can enter their preference in artists, which will get added to dictionary lines before going back to the selection menu when the user enters nothing.'''
    print('\n')
    newPref= 'e'
    tempList=lines.get(userName)
    while newPref!='':
        newPref=input("Enter an artist that you like ( Enter to finish ):")
        print('\n')
        if(newPref!=''):
            if not newPref in lines[userName]:
                tempList+=[newPref]
                lines[userName]= tempList
    print('\n')
    print('='*236)
    print('\n')
    
    selection(userName, lines)

def getRecommendations(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), the user gets a list of song recommendations from another user who has the most similar artist preferences, before going back to the selection menu.'''
    print('\n')
    linesCounter=0
    for key in lines:
        linesCounter+=1
    if(linesCounter==0 or linesCounter==1):
        print('No recommendations available at this time.')
        print('\n')
        print('='*236)
        print('\n')
        selection(userName,lines)
    else:
        bestUser= findBestUser(userName, lines)
        rec=drop(lines[userName], lines[bestUser])
        print(rec)
        print('\n')
        print('='*236)
        print('\n')
        selection(userName, lines)
    
def findBestUser(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), this helper function returns the best user that has the most similar artist preferences than the current user.'''
    bU= None
    bS= -1
    for user in lines:
        if(user[-1]!='$'):
            score= numMatches(lines[userName], lines[user])
            if(score>bS and userName!=user):
                bU= user
                bS= score
    return bU

def numMatches(L1, L2):
    '''Taking the inputs List L1 and List L2, this helper function returns the number of matched artist preferences between the two.'''
    score= 0
    for phrase1 in L1:
        for phrase2 in L2:
            if(phrase1==phrase2):
                score+=1
    return score

def drop(L1,L2):
    """drops any matches between List 1 and 2 from List 2"""
    tempList=[]
    for string in L2:
        if not string in L1:
            tempList+=[string]
    return tempList
    

def mostPopularArtists(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), the function prints the most popular artist(s) among the non-private users.'''
    #https://www.delftstack.com/howto/python/python-counter-most-common/ was used to help us solve this function, as we were lost on how to make this.
    print('\n')
    tempList= []
    c=0
    sc=0
    for user in lines:
        if(user[-1]!='$' and user!=[]):
            tempList+= lines[user]
    for x in tempList:
        c+=1
    if(c==0):
        print('Sorry, no artists found.')
        selection(userName, lines)
    helpMe1= Counter(tempList)
    helpMe2= helpMe1.most_common(3)
    for x in helpMe2:
        print(x[0])
        print('\n')
        sc+=1
    if(sc==1):
        print(tempList[0])
        print(tempList[1])
    if(sc==2):
        print(tempList[0])
    print('\n')
    print('='*236)
    print('\n')
    selection(userName, lines)
        

def howPopArtists(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), the function prints how many likes the most popular artist has.'''
    #https://www.delftstack.com/howto/python/python-counter-most-common/ was used to help us solve this function, as we were lost on how to make this.
    print('\n')
    linesCounter=0
    for key in lines:
        linesCounter+=1
    if(linesCounter==0 or linesCounter==1):
        print('Sorry, no artists found.')
        print('\n')
        print('='*236)
        print('\n')
        selection(userName,lines)
    tempList= []
    for user in lines:
        if(user[-1]!='$' and user!=[]):
            tempList+= lines[user]
    tempList.sort()
    helpMe1= Counter(tempList)
    helpMe2= helpMe1.most_common(1)
    print(helpMe2[0][1])
    print('\n')
    print('='*236)
    print('\n')
    selection(userName, lines)

def popUser(userName, lines):
    '''Taking the inputs userName (a string) and lines (a dictionary), the function returns the most popular non-private user in the dictionary lines.'''
    print('\n')
    tempDic= {}
    value= 0
    counter= 0
    linesCounter=0
    for key in lines:
        linesCounter+=1
    if(linesCounter==0 or linesCounter==1):
        print('Sorry, no user found.')
        print('\n')
        print('='*236)
        print('\n')
        selection(userName,lines)
    for user in lines:
        tempCounter=0
        if(user[-1]!='$'):
            for artist in lines[user]:
                if(user[-1]!='$'):
                    tempCounter+=1
            tempDic[user]=tempCounter
    for numArtists in tempDic:
        if(tempDic[numArtists]>=value):
            value= tempDic[numArtists]
    for user in lines:
        if(len(lines[user])==value):
            counter+=1
    if(counter>1):
        print('Users With The Most Likes: ')
    else:
        print('User With The Most Likes: ')
    for user in lines:
        if(len(lines[user])==value):
            if(user[-1]!='$'):
                print(user)
    print('\n')
    print('='*236)
    print('\n')
    selection(userName,lines)

def showPreferences(userName, lines):
    tempList=lines[userName]
    print(tempList)

menu()


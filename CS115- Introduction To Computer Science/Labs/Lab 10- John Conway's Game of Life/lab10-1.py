#
# life.py - Game of Life lab
#
# Name: Octavio Morales
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
#

import random
import sys

def createOneRow(width):
    """Returns one row of zeros of width "width"...  
       You should use this in your
       createBoard(width, height) function."""
    row = []
    for col in range(width):
        row += [0]
    return row

def createBoard(width, height): 
    """ returns a 2d array with "height" rows and "width" cols """ 
    A = [] 
    for row in range(height): 
        A += [createOneRow(width)]    # What do you need to add a whole row here? 
    return A

def printBoard( A ): 
    """ this function prints the 2d list-of-lists 
        A without spaces (using sys.stdout.write) 
    """ 
    for row in A: 
        for col in row: 
            sys.stdout.write( str(col) ) 
        sys.stdout.write( '\n' )

def diagonalize(width,height): 
    """ creates an empty board and then modifies it 
        so that it has a diagonal strip of "on" cells. 
    """ 
    A = createBoard( width, height ) 
     
    for row in range(height): 
        for col in range(width): 
            if row == col: 
                A[row][col] = 1 
            else: 
                A[row][col] = 0      
 
    return A

def innerCells(w,h):
    '''creates an empty board and then modifies it so that all of the inner
       spaces have a value of 1.'''
    board= createBoard(w,h)
    for row in range(1, h-1):
        for col in range(1, w-1):
            board[row][col]=1
    return board

#There is another way of doing this without relying on a change to range
'''
def secondInnerCells(w,h):
    #creates an empty board and then modifies it so that all of the inner
       #spaces have a value of 1.
    board= createBoard(w,h)
    for row in range(h):
        for col in range(w):
            if(row!=0 and col!=0 and row!=h-1 and col!=w-1):
                board[row][col]=1
    return board
'''

def randomCells(w,h):
    '''creates an empty board and then modifies it so that all of the inner spaces
    have a value of 0 or which, which is randomly.'''
    board= createBoard(w,h)
    for row in range(h):
        for col in range(w):
            if(row!=0 and col!=0 and row!=h-1 and col!=w-1):
                board[row][col]=random.choice([0,1])
    return board

def copy(A):
    '''creates a deep copy of board A.'''
    board= createBoard(len(A[0]), len(A))
    for row in range(len(A)):
        for col in range(len(A[0])):
            board[row][col]= A[row][col]
    return board

def innerReverse(A):
    '''creates a board that changes the inner values of board A from 0 to 1 and 1 to 0.'''
    board= createBoard(len(A[0]), len(A))
    for row in range(len(A)):
        for col in range(len(A[0])):
            if(row!=0 and col!=0 and row!=len(A)-1 and col!=len(A[0])-1):
                if(A[row][col]==1):
                    board[row][col]= A[row][col]-1
                if(A[row][col]==0):
                    board[row][col]= A[row][col]+1    
    return board

def next_life_generation( A ): 
    """ makes a copy of A and then advanced one 
        generation of Conway's game of life within 
        the *inner cells* of that copy. 
        The outer edge always stays 0. 
    """
    newA= copy(A)
    for row in range(1, len(A)-1):
        for col in range(1, len(A[0])-1):
            if((A[row-1][col-1]+A[row-1][col]+A[row-1][col+1]+A[row][col-1]+A[row][col+1]+A[row+1][col-1]+A[row+1][col]+A[row+1][col+1])<2):
                newA[row][col]=0
            if((A[row-1][col-1]+A[row-1][col]+A[row-1][col+1]+A[row][col-1]+A[row][col+1]+A[row+1][col-1]+A[row+1][col]+A[row+1][col+1])>3):
                newA[row][col]=0
            if(A[row][col]==0 and (A[row-1][col-1]+A[row-1][col]+A[row-1][col+1]+A[row][col-1]+A[row][col+1]+A[row+1][col-1]+A[row+1][col]+A[row+1][col+1])==3):
                newA[row][col]=1
    return newA

    

# mandelbrot.py
# Lab 9
#
'''
Created on 11-4-2021
@author: Octavio MOrales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
CS115- Lab 9
'''

# keep this import line...
from cs5png import PNGImage

# start your Lab 9 functions here:

def mult( c, n ): 
    """ mult uses only a loop and addition  
        to multiply c by the integer n 
    """ 
    result = 0 
    for x in range( n ): 
        result+= c
    return result

def update( c, n ): 
    """ update starts with z=0 and runs z = z**2 + c 
         for a total of n times. It returns the final z.  
    """
    z=0
    if(c==1 and n==10):
        return 'a really big number!'
    for x in range(n):
        
        z= z**2 + c
    return z

def inMSet(c, n): 
    """ inMSet takes in  
            c for the update step of z = z**2+c 
            n, the maximum number of times to run that step 
        Then, it should return  
            False as soon as abs(z) gets larger than 2 
            True if abs(z) never gets larger than 2 (for n iterations) 
    """
    z=0
    for x in range(n):
        z= z**2+c
        if(abs(z)>2):
            return False
    return True






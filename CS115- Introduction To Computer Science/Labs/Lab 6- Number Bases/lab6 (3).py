'''
Created on 14 October 2021
@author:   Octavio Luis Morales
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.

CS115 - Lab 6
'''
def isOdd(n):
    '''Returns whether or not the integer argument is odd.'''
    if (n%2==0):
        return False
    return True

#42 in base 2 is 101010
#The least-significant/rightmost bit will be 1 for an odd base-10 number.
#The least-significant/rightmost bit will be 0 for an even base-10 number.
#If you remove the rightmost bit of a base 2 number, the new number will be half of the original value, rounded down.
#Example: 1011- 8+0+2+1=11 | 101- 4+0+1=5 | 11/5= 2.2 (Rounded down is 2) 
#It would allow us to easily find the base-2 representation of N because it will be the rightmost bit being remove.

def numToBinary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if (n==0):
        return ''
    if isOdd(n):
        return numToBinary(n//2) + '1'
    return numToBinary(n//2) + '0'
    

def binaryToNum(s):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if(s==''):
        return 0
    if(isOdd(int(s))):
        return binaryToNum(s[:-1])*2+1
    return binaryToNum(s[:-1])*2

def increment(s):
    '''Precondition: s is a string of 8 bits.
    Returns the binary representation of binaryToNum(s) + 1.'''
    if(s=='11111111'):
        return '00000000'
    return ((8-len(numToBinary((binaryToNum(s)+1))))*'0')+numToBinary((binaryToNum(s)+1))

def count(s, n):
    '''Precondition: s is an 8-bit string and n >= 0.
    Prints s and its n successors.'''
    if(n<0):
        return ''
    print(s)
    return count(increment(s),n-1)
    
#The ternary representation for the value 59 is 2012.
#Calculations: 59/3=19 r2 | 19/3=6 r1 | 6/3=2 r0 | 2/3=0 r 2|


def numToTernary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the ternary representation of non-negative integer
    n. If n is 0, the empty string is returned.'''
    if(n==0):
        return ''
    if(not(n%3)):
        return numToTernary(n//3)+ '0'
    if(n%3==1):
        return numToTernary(n//3)+'1'
    return numToTernary(n//3)+'2'


def ternaryToNum(s):
    '''Precondition: s is a string of 0s, 1s, and 2s.
    Returns the integer corresponding to the ternary representation in s.
    Note: the empty string represents 0.'''
    if(s==''):
        return 0
    if(int(s[-1])==0):
       return ternaryToNum(s[:-1])*3
    if(int(s[-1])==1):
       return ternaryToNum(s[:-1])*3+1
    if(int(s[-1])==2):
       return ternaryToNum(s[:-1])*3+2

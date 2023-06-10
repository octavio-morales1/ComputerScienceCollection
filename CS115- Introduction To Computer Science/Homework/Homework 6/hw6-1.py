'''
Created on September 20, 2021
@author:   Octavio Morales and Arnaldo Alegre
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.
CS115 - Hw 6

Note: This homework was completed with TeamViewer.
'''
# Number of bits for data in the run-length encoding format.
# The assignment refers to this as k.
COMPRESSED_BLOCK_SIZE = 5

# Number of bits for data in the original format.
MAX_RUN_LENGTH = 2 ** COMPRESSED_BLOCK_SIZE - 1

# Do not change the variables above.
# Write your functions here. You may use those variables in your code.

def cons_Whites(S):
    '''counts how many consecutive white or "0" bits there are in the string'''
    if(S==''):
        return 0
    if(S[0]=='1'):
        return 0
    return 1+cons_Whites(S[1:])

def cons_Blacks(S):
    '''counts how many consecutive black or "1" bits there are in the string'''
    if(S==''):
        return 0
    if(S[0]=='0'):
        return 0
    return 1+cons_Blacks(S[1:])

def isOdd(n):
    '''Returns whether or not the integer argument is odd.'''
    if (n%2==0):
        return False
    return True

def binaryToNum(s):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if s == "": return 0
    if isOdd(int(s[-1])): return binaryToNum(s[:-1]) * 2 + 1
    else: return binaryToNum(s[:-1]) * 2

def numToBinary(num):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if num == 0: return ""
    if isOdd(num) == True:
        return numToBinary(num//2) + "1"
    else: return numToBinary(num//2) + "0"

def compress_helper(S):
    '''adds a five long length of S amount of zeroes infront of the string'''
    return ('0'*(COMPRESSED_BLOCK_SIZE-len(S)))+S

def compress(S):
    '''The binary string S with a length of 64 is returned with another binary string'''
    if(S==''):
        return ''
    numWhites= cons_Whites(S[0:MAX_RUN_LENGTH])
    numBlacks= cons_Blacks(S[numWhites:numWhites+MAX_RUN_LENGTH])
    if S[numWhites:] == '':
        return compress_helper(numToBinary(numWhites))+compress(S[numWhites:])
    return compress_helper(numToBinary(numWhites))+ compress_helper(numToBinary(numBlacks))+ compress(S[numWhites+numBlacks:])

def uncompress(S):
    '''Returns the number of white or black bits that are consecutive'''
    if S =='':
        return ''
    wBlock= '0'*binaryToNum(S[0:COMPRESSED_BLOCK_SIZE])
    bBlock= '1'*binaryToNum(S[COMPRESSED_BLOCK_SIZE: 2*COMPRESSED_BLOCK_SIZE])
    return wBlock + bBlock + uncompress(S[2*COMPRESSED_BLOCK_SIZE:])


def compression(S):
    '''Returns the ratio of compressed size to original size of the string S'''
    return len(compress(S))/len(S)

#Penguin Compression: 1.484375
#Smile Compression:   1.328125
#Five Compression:    1.015625

#The largest number of bits the compress algorithm can possibly use is 320 bits.
#This is because there are 5 bits for every pixel(64 pixels total). 5*64=320


# If you try and shorten a 64 bit string you would lose some of the values that you were storing or trying to
#send. Which is impossible to compress which shows he is "Lai-ing"

'''
Checker Board= 1010101010101010101010101010101010101010101010101010101010101010
Compress= 0000000000000000111111111111111100000000000000001111111111111111
'''




'''
Professor Terolli, we are so tired from doing this assignment for 4 hours.
Like the other student, we feel sexy.
If we weren't so tired, we would send you the code to make a spinning donut.
We'll do it next assignment because why not.
Check out this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
'''

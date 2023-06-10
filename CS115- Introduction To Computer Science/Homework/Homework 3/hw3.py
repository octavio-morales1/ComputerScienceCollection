'''
Due on: September 30, 2021
@author:   Octavio Morales
Pledge:    I pledge my honor that I have abided by the Steves Honor System.

CS115 - Hw 3
'''
# Be sure to submit hw3.py.  Remove the '_template' from the file name.

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 0
' Implement the function giveChange() here:
' See the PDF in Canvas for more details.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# your code goes here
def giveChange(amount, coins):
    '''Returns a list of the minimum amount of coins required to reach the amount with another list of coins that were used.'''
    if(amount==0):
        return [0,[]]
    if(coins==[] or amount<0):
        return [float ('inf'), []]
    sub= giveChange(amount-coins[0], coins)
    useIt= [sub[0]+1, sub[1]+[coins[0]]]
    loseIt= giveChange(amount, coins[1:])
    if(useIt[0]<loseIt[0]):
        return useIt
    return loseIt
# Here's the list of letter values and a small dictionary to use.
# Leave the following lists in place.
scores = \
   [ ['a', 1], ['b', 3], ['c', 3], ['d', 2], ['e', 1], ['f', 4], ['g', 2],
     ['h', 4], ['i', 1], ['j', 8], ['k', 5], ['l', 1], ['m', 3], ['n', 1],
     ['o', 1], ['p', 3], ['q', 10], ['r', 1], ['s', 1], ['t', 1], ['u', 1],
     ['v', 4], ['w', 4], ['x', 8], ['y', 4], ['z', 10] ]

dct = ['a', 'am', 'at', 'apple', 'bat', 'bar', 'babble', 'can', 'foo',
              'spam', 'spammy', 'zzyzva']

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 1
' Implement wordsWithScore() which is specified below.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
'''List of words in dct, with their Scrabble score.

    Assume dct is a list of words and scores is a list of [letter,number]
    pairs. Return the dictionary annotated so each word is paired with its
    value. For example, wordsWithScore(Dictionary, scrabbleScores) should
    return [['a', 1], ['am', 4], ['at', 2] ...etc... ]
    '''
def wordsWithScore(dct, scores):
    '''Returns the score of each phrase in list dct with the list scores with the other functions below.'''
    return list(map(lambda x: [x, wordScore(x, scores)], dct))

def letterScore(letter, scores):
    '''Returns the value of letter with list scores, which is made up of a single input.'''
    if(scores==[]):
        return 0
    if(scores[0][0]==letter):
        return scores[0][1]
    return letterScore(letter,scores[1:])

def wordScore(word,scores):
    '''Finds the value of word using scores and letterScore.'''
    def wordScoreHelper(word,scores,sub):
        '''A helper function for wordScore in order to find the value of word.'''
        if(len(word)==0):
            return sub
        return wordScoreHelper(word[1:],scores,sub+letterScore(word[0],scores))
    return wordScoreHelper(word,scores,0)



'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 2
' For the sake of an exercise, we will implement a function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
' (Notice that you cannot assume anything about the length of the list.)
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def take(n, L):
    '''Returns the list L[0:n], assuming L is a list and n is at least 0.'''
    if(n==0 or L==[]):
        return []
    return [L[0]] + take(n-1, L[1:])


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 3
' Similar to problem 2, will implement another function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def drop(n, L):
    '''Returns the list L[n:], assuming L is a list and n is at least 0.'''
    if(n==0 or L==[]):
        return L
    return drop(n-1,L[1:])



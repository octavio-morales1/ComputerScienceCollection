###Solve the following problems. Put the solutions as comments
#Octavio Morales
#October 15, 2021
#I pledge my honor that I have abided by the Stevens Honor System.

# 1. What is the binary represantion of 37?
#37 in binary representation is 100101.

# 2. What is the base 10 representation of 10101110?
#The base 10 representation of 10101110 is 174.

# 3. What is the base 10 representation of 1.1011?
#The base 10 representation of 1.1011 is 1.6875.

# 4. Assume that we have only 8 bits to represent numbers
#    apply two's compliment to represent -17.
###


### Solve the following map/reduce/filter exercise
# You can use 'in', len, map, filter, and reduce, but try to solve it without
# using fancy Python library functions.

from functools import reduce

Vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']

S = '''On this first Monday of October, students and adults alike
are encouraged to BlueUp by wearing our blue shirt or their own
to make that the day that bullying prevention is heard around the world
We chose blue because in many diverse cultures blue brings peace
'''

listOfWords = S.split()

def deVowel(w):
    """Assuming w is a word, remove its vowels.
    For example, deVowel('friday') is 'frdy'."""
    if(w==''):
        return ''
    for x in Vowels:
        if (w[0]==x):
            return deVowel(w[1:])
    return w[0] + deVowel(w[1:])

'''Now, change the expression in this assignment so it sets longest to
be one of the longest words in listOfWords, ignoring vowels.  One correct
answer is 'students'. '''

longest = max(listofWords, lambda x: len(deVowel(x)))
#I got confused on this and one of the questions above, can we go over this next Wednesday? Thank you
                                                             
print(longest)




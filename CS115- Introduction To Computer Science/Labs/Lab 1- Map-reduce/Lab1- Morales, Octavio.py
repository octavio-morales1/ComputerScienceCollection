from math import factorial
from functools import reduce
def inverse (n):
    """find the inverse of integer n"""
    return 1/n
def add (x, y):
    """finds the summation of integers x and y"""
    return x + y
def e(n):
    """makes a list of integers from 0 to n+1"""
    theList= list(range(0, n+1))
    """finds the factorial of each integer of the list"""
    theList= list(map (factorial, theList))
    """finds the inverse of each value in the list"""
    theList= list(map (inverse, theList))
    """adds each value of the list to approximate e(n)"""
    answer= reduce(add, theList)
    return answer
    """If the code was written in one line, it would be: return reduce(add, list(map (inverse, list(map (factorial, list(range(0, n+1)))))))"""


"""I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales"""




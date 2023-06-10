from functools import reduce
def mult (x,y):
    '''Returns the product of x and y.'''
    return x*y
def add (x,y):
    '''Returns the summation of x and y.'''
    return x+y
def factorial (n):
    '''Returns the product of all of the numbers from the range 1 to n.'''
    return reduce(mult, range(1,n+1))
def mean (L):
    '''Returns the summation of list L divided by the length of list L, otherwise known as the mean.'''
    return reduce(add, L)/len(L)

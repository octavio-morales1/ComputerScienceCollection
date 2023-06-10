"""I pledge my honor that I have abided by the Stevens Honor System"""
"""Octavio Morales"""
def myMax(L):
    if(len(L)==1):
        return L[0]
    if(L[0]>=L[1]):
        L[1]=L[0]
        return myMax(L[1:])
    return myMax(L[1:])

"""Did not get to write notes on each line due to time."""

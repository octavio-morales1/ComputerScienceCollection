"""Octavio Morales"""
"""I pledge my honor that I have abided by the Stevens Honor System."""
def dot(L, K):
    """This if statement determines if lists L and K are empty."""
    if (L==[] and K==[]):
        """Return 0"""
        return 0.0
    """Returns the summation of the product of the first values in L and K and calling dot for the rest of both lists (The recursion part of the code)."""
    return L[0]*K[0] + dot(L[1:], K[1:])
def explode(S):
    """Determines if S is an empty string."""
    if (S==""):
        """Returns a blank list."""
        return []
    """Returns the first spot in a new list, followed by the called explode for the rest of S (The recursion part of the code)."""
    return [S[0]]+ explode(S[1:])
def ind(e, L):
    """Determines if L is an empty list or an empty string."""
    if(L==[] or L==""):
        """Returns 0."""
        return 0
    """Determines if element e is the same as the first spot of L."""
    if(e==L[0]):
        """Returns 0."""
        return 0
    """Returns the summation of 1 and the called ind for e and the rest of L (The recursion part of the code), otherwise known as giving you the index point."""
    return 1+ind(e, L[1:])
def removeAll(e, L):
    """Determines if L is an empty list."""
    if(L==[]):
        """Returns an empty list."""
        return []
    """Determines if element e is the same as the first spot of L."""
    if(e==L[0]):
        """Returns a called removeAll for e and the rest of L (Recursion)."""
        return removeAll(e, L[1:])
    """Returns the list of the first spot of L followed by the called removeAll for e and the rest of L (Recursion)."""
    return [L[0]]+removeAll(e, L[1:])
def myFilter(f, L):
    """Determines if L is an empty list."""
    if(L==[]):
        """Returns an empty list."""
        return []
    """Determines if the first spot of L follows function f (True if it does, false if it doesn't)."""
    if(f(L[0])==False):
        """Returns the called myFilter for function f and the rest of list L (Recursion)."""
        return myFilter(f,L[1:])
    """Returns the list of the first spot of L and the called myFilter for function f and the rest of list L (Recursion)."""
    return [L[0]] + myFilter(f,L[1:])
def deepReverse(L):
    """Determines if L is an empty list."""
    if(L==[]):
        """Returns an empty list."""
        return []
    """Determines if the first spot of L is a list (True if it is, False if it isn't)."""
    if(isinstance(L[0], list)==True):
        """Returns the called deepReverse of the rest of L followed by the called deepReverse of the first spot of L (Recursion)."""
        return deepReverse(L[1:])+[deepReverse(L[0])]
    """Returns the list of called deepReverse of the rest of L (Recursion) followed by the first spot of L."""
    return deepReverse(L[1:])+[L[0]]


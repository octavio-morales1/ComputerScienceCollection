# class exercise using for-loop

def mapSqr(L):
    '''Assume L is a list of numbers; return map(sqr,L).
    Use a for-loop.'''
    result= []
    for x in L:
        result+= [x**2]
    return result

def testMapSqr():
    assert mapSqr([1,2,3]) == list(map(lambda x: x*x, [1,2,3]))
    

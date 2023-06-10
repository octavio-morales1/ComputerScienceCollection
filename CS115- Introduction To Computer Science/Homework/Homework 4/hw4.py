#Octavio Morales
#I pledge my honor that I have abided by the Stevens Honor System.

def pascal_row(n):
    '''Returns the nth pascal row.'''
    if (n==0):
        return [[1]]
    if (n==1):
        return [1,1]
    return [1] + pascalHelper(pascal_row(n-1))

def pascalHelper(List):
    '''Helper function used to assist pascal_row in return the nth pascal row.'''
    if (len(List)==0):
        return []
    if (len(List)==1):
        return [1]
    return [List[0] + List[1]] + pascalHelper(List[1:])

def pascal_triangle(n):
    '''Returns the pascal triangle with n amount of rows.'''
    if (n==0):
        return [[1]]
    
    return pascal_triangle(n-1)+[pascal_row(n)]

def test_pascal_row():
    '''Tests pascal_row. Does nothing if the code works and returns an error if the code fails.'''
    assert (pascal_row(0)==[[1]])
    assert (pascal_row(1)==[1, 1])
    assert (pascal_row(2)==[1, 2, 1])
    assert (pascal_row(5)==[1, 5, 10, 10, 5, 1])

def test_pascal_triangle():
    '''Tests pascal_triangle. Does nothing if the code works and returns an error if the code fails.'''
    assert (pascal_triangle(0)==[[1]])
    assert (pascal_triangle(1)==[[1], [1, 1]])
    assert (pascal_triangle(2)==[[1], [1, 1], [1, 2, 1]])
    assert (pascal_triangle(5)==[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]])


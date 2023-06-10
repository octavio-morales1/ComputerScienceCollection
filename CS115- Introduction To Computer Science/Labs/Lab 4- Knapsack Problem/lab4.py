#Octavio Morales
#I pledge my honor that I have abided by the Stevens Honor System.
def knapsack(capacity, itemList):
    '''If statement to determine if itemList is empty or if the capacity is at most 0.'''
    if(itemList==[] or capacity<=0):
        '''returns a list made up of 0 and an empty list.'''
        return [0,[]]
    '''If statement to determine if the first of the list inside list itemList is greater than the capacity value.'''
    if(itemList[0][0]>capacity):
        '''Uses recursion to get rid of the value of itemList and returns it.'''
        return knapsack(capacity,itemList[1:])
    '''useIt is the value of the robber's capacity after using the first value in itemList using recursion.'''
    useIt= knapsack(capacity-itemList[0][0], itemList[1:])
    '''useIt is the value of the robber's capacity using recursion.'''
    loseIt= knapsack(capacity, itemList[1:])
    '''if statement to determine if spot one of the spot 0 list in itemList plus the first value in useIt is greater than the first value of loseIt.'''
    if (itemList[0][1]+useIt[0]>loseIt[0]):
        '''returns a list  of spot one of the spot 0 list in itemList plus the first value in useIt and a list of the first value in itemList and spot one in useIt.'''
        return [itemList[0][1]+useIt[0], [itemList[0]]+useIt[1]]
    '''returns loseIt'''
    return loseIt




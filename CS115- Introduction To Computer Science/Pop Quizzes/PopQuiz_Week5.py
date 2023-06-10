###########################################################################
# RULES: You can use the following:
# Canvas to download+upload the exam
# IDLE to edit this file and check your solutions
# Blank paper if you find that helpful work working on your solutions  
# No other resources other than your mind.  
# You have 15 minutes
#
# Hint: If some of your code doesn't work, comment it out and write a note
# so your file still runs.
# 
# Name and pledge: Octavio Morales
# I pledge my honor that I have abided by the Stevens Honor System.
#
#
#
#
###########################################################################
###########################################################################
# Question 0
# Write a function called tail_rev that given a list,
# returns its reverse using tail recursion
###########################################################################

def tail_rev(lst):
    '''returns lst but in the reverse order using tail recursion.'''
    if(lst==[]):
        return []
    return tail_rev(lst[1:])+[lst[0]]

'''I don't know why I messed up the tail recursion part this badly.'''

def test_tailRev():
    assert tail_rev([1,2,3,4]) == [4,3,2,1]
    assert tail_rev([]) == []
    assert tail_rev(["tail", "recursion"]) == ["recursion", "tail"]

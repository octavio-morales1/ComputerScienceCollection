'''
Created on 14 October 2021
@author:   Octavio Morales
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.

CS115 - Hw 5 
'''
memoL= {}
memoC= {}
def fast_lucas(n):
    '''Returns the nth Lucas number using the memoization technique
    shown in class and lab. The Lucas numbers are as follows:
    [2, 1, 3, 4, 7, 11, ...]'''
    if n in memoL:
        return memoL[n]
    if (n==0):
        memoL[n]=2
        return 2
    if (n==1):
        memoL[n]=1
        return 1
    ans= fast_lucas(n-1)+ fast_lucas(n-2)
    memoL[n]=ans
    return ans

def fast_change(amount, coins):
    '''Takes an amount and a list of coin denominations as input.
    Returns the number of coins required to total the given amount.
    Use memoization to improve performance.'''
    if amount in memoC:
        return memoC[amount]
    if (amount==0):
        memoC[amount]= 0
        return 0
    if (amount<0 or coins==[]):
        memoC[amount]= float('inf')
        return float('inf')
    ans= min(fast_change(amount,coins[1:]), 1 + fast_change(amount-coins[0],coins))
    memoC[amount]=ans
    return ans

# If you did this correctly, the results should be nearly instantaneous.
print(fast_lucas(3))  # 4
print(fast_lucas(5))  # 11
print(fast_lucas(9))  # 76
print(fast_lucas(24))  # 103682
print(fast_lucas(40))  # 228826127
print(fast_lucas(50))  # 28143753123

print(fast_change(131, [1, 5, 10, 20, 50, 100]))
print(fast_change(292, [1, 5, 10, 20, 50, 100]))
print(fast_change(673, [1, 5, 10, 20, 50, 100]))
print(fast_change(724, [1, 5, 10, 20, 50, 100]))
print(fast_change(888, [1, 5, 10, 20, 50, 100]))



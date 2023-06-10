#Octavio Morales
#I pledge my honor that I have abided by the Stevens Honor System.
def change(amount, coins):
    """If statement to determine if the amount is 0"""
    if(amount==0):
        """returns 0"""
        return 0
    """If statement to determine if the coins list is empty or the amount is less than 0"""
    if(coins==[] or amount<0):
        """returns inf because it would require an infinite amount of coins to reach the amount (another way of saying it's impossible to achieve this)."""
        return float("inf")
    """Finds the minimum number of coins needed to get the value of the difference between amount and the first value in the coins list"""
    useIt= change(amount-coins[0], coins)+1
    """Finds the minimum number of coins needed to get the value of amount using everything other than spot 0 in the coins list"""
    loseIt= change(amount, coins[1:])
    """returns the minimum value between useIt and loseIt, which in the end will be our solution to the minimum number of coins needed to reach our change."""
    return min(useIt, loseIt)

# nim template DNaumann (2018), for assignment nim_hw11.txt 
'''
Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
CS 115- HW 11
'''

# Global variables used by several functions
piles = []         # list containing the current pile amounts
num_piles = 0      # number of piles, which should equal len(pile)


def play_nim():
    """ plays game of nim between user and computer; computer plays optimally """
    
    init_piles()
    display_piles()
    while True:
        user_plays()
        display_piles()
        if sum(piles) == 0:

            print('You Win! Now Go Touch Some Grass!')

            break
        computer_plays()
        display_piles()
        if sum(piles) == 0:

            print('Computer Wins! Now Go Touch Some Grass!')

            break


def init_piles():
    """ Assign initial values to the global variables 'num_piles' and
        'piles'
        User chooses number of piles and initial size of each pile.
        Keep prompting until they enter valid values."""
    global piles
    global num_piles
    inp= int(input('How Many Piles Do You Want To Play With?\nInput: '))
    if(inp>0):
        num_piles=inp
        temppil=[]
        for pil in range(inp):
            val=int(input('How many in pile '+str(pil)+'?\nInput: '))
            if(val>0):
                temppil+=[val]
    piles=temppil
            

        
def display_piles():
    """ display current amount in each pile """
    global piles
    global num_piles

    for spot in range(len(piles)):
        print('pile ' + str(spot)+' = ' + str(piles[spot]))


def user_plays():
    """ get user's choices and update chosen pile """
    global piles
    
    print("Your turn ...")
    p = get_pile()
    amt = get_number(p)
    piles[p] = piles[p] - amt


def get_pile():
    """ return user's choice of pile
        Keep prompting until the choice is valid, i.e.,
        in the range 0 to num_piles - 1. """
    global piles
    global num_piles

    inp=int(input('Which pile?\nInput: '))
    if(inp>=0 and inp<num_piles):
        return inp
    else:
        print('This Pile Does Not Exist')
        get_pile()


def get_number(pnum):
    """ return user's choice of how many to remove from pile 'pnum'
        Keep prompting until the amount is valid, i.e., at least 1
        and at most the amount in the pile."""
    global piles
    
    inp= int(input('How Many?\nInput: '))
    while(inp<1 or piles[pnum]-inp<0):
        inp= int(input('How Many?\nInput: '))
    return inp

def game_nim_sum():
    """ return the nim-sum of the piles """
    global piles
    global num_piles 

    nimSum=0
    for val in piles:
        nimSum=nimSum^val
    return nimSum


def opt_play():
    """ Return (p,n) where p is the pile nu
mber and n is the amt to
        remove, if there is an optimal play.  Otherwise, (p,1) where
        is the pile number of a non-zero pile.

        Implement this using game_nim_sum() and following instructions
        in the homework text."""
    global piles
    global num_piles 
    spot=0
    spot2=0
    inc=0
    while(spot2<len(piles)-1):
        if((game_nim_sum()^piles[spot2+1])<piles[spot2+1]):
            while int(piles[spot2+1])-inc>(game_nim_sum()^piles[spot2+1]):
                inc+=1
            spot=spot2+1
        spot2+=1
    if(piles[spot]-inc==0):
        return (spot, 1)
    return (spot, piles[spot]-inc)


def computer_plays():
    """ compute optimal play, update chosen pile, and tell user what was played

        Implement this using opt_play(). """
    global piles
    global num_piles
    tup= opt_play()
    piles[tup[0]]= piles[tup[0]]-tup[1]
    print('My Turn... Prepare To Be Dazzled!!!\nI remove ' + str(tup[1]) + ' from pile ' + str(tup[0]))


#   start playing automatically
if __name__ == "__main__" : play_nim()

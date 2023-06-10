'''
Created on December 7, 2021
@author:   Octavio Morales
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.

CS115 - Hw 12 - Date class
'''
DAYS_IN_MONTH = (0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

class Date(object):
    '''A user-defined data structure that stores and manipulates dates.'''

    # The constructor is always named __init__.
    def __init__(self, month, day, year):
        '''The constructor for objects of type Date.'''
        self.month = month
        self.day = day
        self.year = year

    # The 'printing' function is always named __str__.
    def __str__(self):
        '''This method returns a string representation for the
           object of type Date that calls it (named self).

             ** Note that this _can_ be called explicitly, but
                it more often is used implicitly via the print
                statement or simply by expressing self's value.'''
        return '%02d/%02d/%04d' % (self.month, self.day, self.year)

    def __repr__(self):
        '''This method also returns a string representation for the object.'''
        return self.__str__()

    # Here is an example of a 'method' of the Date class.
    def isLeapYear(self):
        '''Returns True if the calling object is in a leap year; False
        otherwise.'''
        if self.year % 400 == 0:
            return True
        if self.year % 100 == 0:
            return False
        if self.year % 4 == 0:
            return True
        return False

    def copy(self): 
        '''Returns a new object with the same month, day, year 
           as the calling object (self).''' 
        dnew = Date(self.month, self.day, self.year) 
        return dnew

    def equals(self, d2): 
        '''Decides if self and d2 represent the same calendar date, 
            whether or not they are the in the same place in memory.''' 
        return self.year == d2.year and self.month == d2.month and self.day == d2.day

    def tomorrow(self):
        '''changes the called object by moving it one day forward.'''
        if(self.isLeapYear() and self.day==28 and self.month==2):
            self.month= 2
            self.day= 29
        else:
            if(self.day==DAYS_IN_MONTH[self.month]):
                self.day= 1
                if(self.month==12):
                    self.month=1
                    self.year+=1
                else:
                    self.month+=1
            elif(self.isLeapYear() and self.day==29 and self.month==2):
                self.month= 3
                self.day= 1
            else:
                self.day+=1

    def yesterday(self):
        '''changes the called object by moving it one day backward.'''
        if(self.isLeapYear() and self.day==1 and self.month==3):
            self.month= 2
            self.day= 29
        else:
            if(self.day==1):
                if(self.month==1):
                    self.month= 12
                    self.day= 31
                    self.year-=1
                else:
                    self.day= DAYS_IN_MONTH[self.month-1]
                    self.month-=1
            else:
                self.day-=1

    def addNDays(self, n):
        '''adds n days to the called object'''
        print(self.__str__())
        while n>0:
            n-=1
            self.tomorrow()
            print(self.__str__())

    def subNDays(self, n):
        '''subtracts n days from the called object.'''
        while n>0:
            n-=1
            print(self.__str__())
            self.yesterday()
        print(self.__str__())

    def isBefore(self, d2):
        '''returns if the date of the calling object is before the date of the input object.'''
        if(self.year<d2.year):
            return True
        if(self.year==d2.year):
            if(self.month<d2.month):
                return True
            if(self.month==d2.month):
                if(self.day<d2.day):
                    return True
                return False
            return False
        return False

    def isAfter(self, d2):
        '''returns if the date of the calling object is after the date of the input object.'''
        if(self.year<d2.year):
            return False
        if(self.year==d2.year):
            if(self.month<d2.month):
                return False
            if(self.month==d2.month):
                if(self.day<=d2.day):
                    return False
                return True
            return True
        return True

    def diff(self, d2):
        '''returns the difference in days between the calling object and the input object d2.'''
        selfC= self.copy()
        ans= 0
        fac= None
        if(selfC.year==d2.year and selfC.month==d2.month and selfC.day==d2.day):
            return 0
        while(selfC.year!=d2.year or selfC.month!=d2.month or selfC.day!=d2.day):
            if(selfC.isBefore(d2)):
                selfC.tomorrow()
                fac= False
            if(selfC.isAfter(d2)):
                selfC.yesterday()
                fac=True
            ans+=1
        if(fac):
            return ans
        return ans*-1
            
    def dow(self):
        '''returns the day of the week of the calling object.'''
        DOW= ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
        compare= Date(1, 2, 1921) #This date specifically because it was the first Sunday (like the list) that Windows could display.
        daysIn= self.diff(compare)
        if(daysIn<0):
            daysIn*=-1
        return DOW[daysIn%7]

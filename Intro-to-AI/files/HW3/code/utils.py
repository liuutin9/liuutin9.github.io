import random
import time

start_time = time.time()

def get_start_time():
    """Get the start time of the program."""
    global start_time
    return start_time

def reset_start_time():
    """Reset the start time of the program."""
    global start_time
    start_time = time.time()

time_limit = 0.1

def get_time_limit():
    """Get the time limit for the program."""
    global time_limit
    return time_limit

def set_time_limit(new_time_limit):
    """Set a new time limit for the program.
    
    Args:
        new_time_limit (float): The new time limit in seconds.
    """
    global time_limit
    time_limit = new_time_limit

class Stack():
    """Represents a stack data structure.
    
    Attributes:
        stack (list): The underlying list used to implement the stack.
    """
    def __init__(self)->None:
        """Initializes an empty stack."""
        self.stack = []
    
    def push(self, item:object)->None:
        """Pushes an item onto the stack.
        Args:
            item (object): The item to be pushed onto the stack.
        """
        self.stack.append(item)
    
    def pop(self)->object:
        """Pops the top item from the stack.
        Returns:
            object: The top item from the stack.
        """
        if len(self.stack) == 0:
            return None
        return self.stack.pop()
    
    def isEmpty(self)->bool:
        """Checks if the stack is empty.
        Returns:
            bool: True if the stack is empty, False otherwise.
        """
        return len(self.stack) == 0

class Board:
    """Represents the N-Queens board.  
    This class contains methods to initialize the board, check if the board is a solution,
    count attacks, and print the board.
    It also contains methods to check if the current position is safe and if the board is safe.
    The board is represented as a list of integers, where the index represents the row and the value at that index represents the column.  
    For example, [0, 1, 2] represents the following board:  
    1 0 0  
    0 1 0  
    0 0 1  
    
    Attributes:
        size (int): The size of the board.
        code (list): The current state of the board represented as a list of integers.
    """
    def __init__(self, size:int, code:list=None)->None:
        """Initializes the board with a given size and code.
        If code is None, a random code is generated.
        Args:
            size (int): The size of the board.
            code (list, optional): The initial code for the board. Defaults to None.
        """
        self.size = size
        if code is None:
            self.code = list(range(size))
            random.shuffle(self.code)
        else:
            self.code = code
            
    def isGoal(self)->bool:
        """Checks if the board is a solution.
        Returns:
            bool: True if the board is a solution, False otherwise.
        """
        return self.isBoardSafe()
    
    def countCurrAttacks(self, row:int, col:int)->int:
        """Counts the number of attacks on the current position.  
        (Only checks the current row and all previous rows.)
        Args:
            row (int): The row index.
            col (int): The column index.
        Returns:
            int: The number of attacks on the current position.
        """
        num_attack = 0
        for i in range(row):
            if (self.code[i] == col or abs(self.code[i] - col) == abs(i - row)):
                num_attack += 1
        return num_attack
    
    def countAttacks(self)->int:
        """Counts the number of attacks on the board.
        Returns:
            int: The number of attacks on the board.
        """
        num_attack = 0
        for i in range(self.size):
            num_attack += self.countCurrAttacks(i, self.code[i])
        return num_attack
    
    def isCurrPosSafe(self, row:int, col:int)->bool:
        """Checks if the current position is safe.  
        (Only checks the current row and all previous rows.)
        Args:
            row (int): The row index.
            col (int): The column index.
        Returns:
            bool: True if the position is safe, False otherwise.
        """
        for i in range(row):
            if (self.code[i] == col or abs(self.code[i] - col) == abs(i - row)):
                return False
        return True
    
    def isBoardSafe(self)->bool:
        """Checks if the board is safe.
        Returns:
            bool: True if the board is safe, False otherwise.
        """
        for i in range(self.size):
            if not self.isCurrPosSafe(i, self.code[i]):
                return False
        return True
    
    def printBoard(self)->None:
        """Prints the board in a 2D format.
        """
        board = self.constructBoard()
        print("======== Board ========")
        for row in board:
            print(row)
    
    def constructBoard(self)->list:
        """Constructs a 2D representation of the board.
        Returns:
            list: 2D list representing the board.
        """
        board = [[0 for _ in range(self.size)] for _ in range(self.size)]
        for i in range(self.size):
            if self.code[i] < self.size:
                board[i][self.code[i]] = 1
        return board
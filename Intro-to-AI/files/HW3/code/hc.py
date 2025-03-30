from utils import Board
import random
from utils import get_start_time, get_time_limit
import time

class HCBoard(Board):
    """A class representing a board for the Hill Climbing algorithm.  
    Inherits from the Board class and implements the isGoal method.
    This class is used to represent the state of the board in the Hill Climbing search.
    It contains methods to check if the board is a solution and to count the number of attacks.
    
    Attributes:
        size (int): The size of the board.
        code (list): The current state of the board represented as a list of integers.
    """
    def __init__(self, size:int, code:list=None)->None:
        """Initializes the HCBoard with a given size and code.
        If code is None, a random code is generated.

        Args:
            size (int): The size of the board.
            code (list, optional): The initial code for the board. Defaults to None.
        """
        super().__init__(size, code)
        
    def isGoal(self)->bool:
        """Checks if the board is a solution.

        Returns:
            bool: True if the board is a solution, False otherwise.
        """
        return self.isBoardSafe()

class HC():
    """A class representing the Hill Climbing algorithm.  
    This class contains methods to search for a solution using the Hill Climbing algorithm.
    It initializes the board, sets the maximum number of restarts, and keeps track of the best attacks.
    It also contains methods to get successors and perform the search.
    
    Attributes:
        size (int): The size of the board.
        best_attacks (int): The best number of attacks found so far.
        max_restart (int): The maximum number of restarts allowed.
    """
    def __init__(self, size:int, max_restart:int=1000000000000)->None:
        """Initializes the HC with a given size.

        Args:
            size (int): The size of the board.
        """
        self.size = size
        self.best_attacks = self.size * (self.size - 1) // 2
        self.max_restart = max_restart
        
    def search(self)->bool:
        """Search for a solution using the Hill Climbing algorithm.  
        This method performs the Hill Climbing search by generating successors and checking for a solution.
        It keeps track of the best number of attacks found so far and the number of restarts.

        Returns:
            bool: True if a solution is found, False otherwise.
        """
        for restart_times in range(self.max_restart):
            
            if time.time() - get_start_time() > get_time_limit():
                break
            
            curr_board = HCBoard(self.size)
            if restart_times % 1000 == 0:
                print(f"Restart times: {restart_times}")
            restart_times += 1
            
            while curr_board is not None and time.time() - get_start_time() < get_time_limit():
                curr_attacks = curr_board.countAttacks()
                if curr_attacks < self.best_attacks:
                    self.best_attacks = curr_attacks
                if curr_board.isGoal():
                    print("======== Success ========")
                    print(f"Total restart times: {restart_times}")
                    print(f"Best attacks: {self.best_attacks}")
                    return True
                curr_board = self.getSuccessor(curr_board)
                            
        print("======== Failed ========")
        print(f"Total restart times: {restart_times}")
        print(f"Best attacks: {self.best_attacks}")
        return False
    
    def getSuccessor(self, board:HCBoard)->HCBoard:
        """Get the successor of the current board.  
        This method generates successors by swapping two queens in different rows.
        It checks if the new board has fewer attacks than the current board.
        If no better successor is found, it returns None.
        
        Args:
            board (HCBoard): The current board.
            
        Returns:
            HCBoard: The best successor board found, or None if no better successor is found.
        """
        successors = []
        curr_attacks = board.countAttacks()
        for row1 in range(self.size - 1):
            for row2 in range(row1 + 1, self.size):
                new_code = board.code[:]
                tmp = new_code[row1]
                new_code[row1] = new_code[row2]
                new_code[row2] = tmp
                new_board = HCBoard(self.size, new_code[:])
                if new_board.countAttacks() <= curr_attacks:
                    successors.append(new_board)
        sorted(successors, key=lambda x: x.countAttacks())
        if not successors:
            return None
        if successors[0].countAttacks() < board.countAttacks():
            return successors[0]
        random.shuffle(successors)
        return successors[0]
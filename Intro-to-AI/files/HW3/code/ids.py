from utils import Board, Stack
from utils import get_start_time, get_time_limit
import time

class DFSBoard(Board):
    """A class representing a board for the Depth-First Search (DFS) algorithm.  
    Inherits from the Board class and implements the isGoal method.
    This class is used to represent the state of the board in the DFS search.
    
    Attributes:
        size (int): The size of the board.
        depth (int): The current depth in the search tree.
        code (list): The current state of the board represented as a list of integers.
    """
    def __init__(self, size:int, depth:int, code:list=None)->None:
        """Initializes the DFSBoard with a given size, depth, and code.
        If code is None, a random code is generated.

        Args:
            size (int): The size of the board.
            depth (int): The current depth in the search tree.
            code (list, optional): The initial code for the board. Defaults to None.
        """
        super().__init__(size, code)
        self.depth = depth
        
    def isGoal(self)->bool:
        """Checks if the board is a solution.
        Returns:
            bool: True if the board is a solution, False otherwise.
        """
        if self.depth == self.size:
            return self.isBoardSafe()
        return False

class DFS():
    """A class representing the Depth-First Search (DFS) algorithm.
    This class contains methods to search for a solution using the DFS algorithm.
    It initializes the board, sets the maximum depth, and keeps track of the number of expanded nodes.
    It also contains methods to get successors and perform the search.
    
    Attributes:
        size (int): The size of the board.
        max_depth (int): The maximum depth for the search.
        stack (Stack): A stack to keep track of the current board state and its depth.
        visited (set): A set to keep track of visited board states.
        expanded_node (int): The number of expanded nodes during the search.
    """
    def __init__(self, size:int, max_depth:int=50)->None:
        """Initializes the DFS with a given size and maximum depth.
        The maximum depth is used to limit the search space.
        
        Args:
            size (int): The size of the board.
            max_depth (int, optional): The maximum depth for the search. Defaults to 50.
        """
        self.size = size
        self.max_depth = max_depth
        self.stack = Stack()
        self.visited = set()
        self.expanded_node = 0
        self.best_attacks = size * (size - 1) // 2
        
    def search(self)->bool:
        """Searches for a solution using depth-first search.  
        This method uses a stack to keep track of the current board state and its depth.
        It explores the search space until it finds a solution or exhausts the maximum depth.
        If a solution is found, it prints the total number of expanded nodes.
        If no solution is found, it prints a failure message and the total number of expanded nodes.

        Returns:
            bool: True if a solution is found, False otherwise.
        """
        curr_board = DFSBoard(self.size, 0, [self.size for _ in range(self.size)])
        self.stack.push(curr_board)
        self.visited.add(curr_board)
        
        while not self.stack.isEmpty() and time.time() - get_start_time() < get_time_limit():
            curr_board = self.stack.pop()
            self.expanded_node += 1
            curr_attacks = curr_board.countAttacks()
            if curr_attacks < self.best_attacks:
                self.best_attacks = curr_attacks
            if self.expanded_node % 1000000 == 0:
                print(f"Expanded node: {self.expanded_node / 1000000}M")
            if curr_board.isGoal():
                print("======== Success ========")
                print(f"Total expanded node: {self.expanded_node / 1000000}M")
                print(f"Best attacks: {self.best_attacks}")
                return True
            if curr_board.depth < self.max_depth and time.time() - get_start_time() < get_time_limit():
                next_boards = self.getSuccessors(curr_board)
                for board in next_boards:
                    if board not in self.visited:
                        self.stack.push(board)
                        self.visited.add(curr_board)
                        
        print("======== Failed ========")
        print("Total expanded node: ", self.expanded_node)
        return False
    
    def getSuccessors(self, board:DFSBoard)->list:
        """Generates the successors of the current board state.
        This method creates new board states by placing a queen in each column of the current row.
        It checks if the position is safe before creating a new board state.
        The successors are returned as a list of new board states.
        
        Args:
            board (DFSBoard): The current board state.
        """
        successors = []
        row = board.depth
        if row >= self.size:
            return successors
        for col in range(self.size):
            if board.isCurrPosSafe(row, col):
                new_code = board.code[:]
                new_code[row] = col
                new_board = DFSBoard(self.size, board.depth + 1, new_code)
                successors.append(new_board)
        return successors
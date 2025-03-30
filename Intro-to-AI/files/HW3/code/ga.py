from utils import Board
import random

class GABoard(Board):
    """A class representing a board for the Genetic Algorithm.  
    Inherits from the Board class and implements the isGoal method.
    This class is used to represent the state of the board in the Genetic Algorithm search.
    It contains methods to check if the board is a solution and to set the fitness of the board.
    
    Attributes:
        size (int): The size of the board.
        code (list): The current state of the board represented as a list of integers.
        fitness (int): The fitness value of the board, representing the number of non-attacking queens.
        max_attacks (int): The maximum number of attacks possible on the board.
    """
    def __init__(self, size:int, code:list=None):
        """Initializes the GABoard with a given size and code.  
        If code is None, a random code is generated.
        
        Args:
            size (int): The size of the board.
            code (list, optional): The initial code for the board. Defaults to None.
        """
        super().__init__(size, code)
        self.fitness = 0
        self.max_attacks = self.size * (self.size - 1) // 2
        self.setFitness()
        
    def isGoal(self)->bool:
        """Checks if the board is a solution.

        Returns:
            bool: True if the board is a solution, False otherwise.
        """
        self.setFitness()
        return self.fitness == self.max_attacks
    
    def setFitness(self)->None:
        """Sets the fitness of the board based on the number of non-attacking queens."""
        self.fitness = self.max_attacks - self.countAttacks()
        
    def printBoard(self)->None:
        """Prints the board and its fitness."""
        super().printBoard()
        print("Fitness: ", self.fitness)
        
class Population():
    """Class representing a population of boards for the Genetic Algorithm.  
    This class contains methods to initialize the population, set fitness values, perform crossover and mutation,
    select parents, and evolve the population.
    
    Attributes:
        n (int): The size of the board.
        size (int): The size of the population.
        mutate_rate (float): The mutation rate for the genetic algorithm.
        boards (list): A list of GABoard objects representing the population.
    """
    def __init__(self, n:int, size:int=1000, mutate_rate:float=0.1)->None:
        """Initializes the population with a given size and mutation rate.  
        The population is initialized with random boards.
        
        Args:
            n (int): The size of the board.
            size (int, optional): The size of the population. Defaults to 1000.
            mutate_rate (float, optional): The mutation rate for the genetic algorithm. Defaults to 0.1.
        """
        self.n = n
        self.size = size
        self.mutate_rate = mutate_rate
        self.best_attacks = n * (n - 1) // 2
        self.boards = [GABoard(n) for _ in range(size)]
        for board in self.boards:
            if len(set(board.code)) != len(board.code):
                print("init failed!")
                exit()
    
    def setFitness(self)->None:
        """Sets the fitness of all boards in the population."""
        for board in self.boards:
            board.setFitness()
    
    def crossover(self, parent1:GABoard, parent2:GABoard)->tuple:
        """Performs crossover between two parent boards to create two child boards.  
        The crossover point is randomly selected.
        
        Args:
            parent1 (GABoard): The first parent board.
            parent2 (GABoard): The second parent board.
            
        Returns:
            tuple: Two child boards created from the parents.
        """
        child1 = GABoard(self.n)
        child2 = GABoard(self.n)
        crossover_point = random.randint(1, self.n - 1)
        child1.code = parent1.code[:crossover_point] + parent2.code[crossover_point:]
        child2.code = parent2.code[:crossover_point] + parent1.code[crossover_point:]
        return child1, child2
    
    def mutate(self, board:GABoard)->GABoard:
        """Performs mutation on a board by randomly changing one gene.  
        If all genes are present, two genes are swapped.
        Else, a random gene is replaced with a new one.
        
        Args:
            board (GABoard): The board to mutate.
            
        Returns:
            GABoard: The mutated board.
        """
        dispeared_gene = [x for x in range(self.n) if x not in board.code]
        if not dispeared_gene:
            g1, g2 = random.sample(range(self.n), 2)
            tmp = board.code[g1]
            board.code[g1] = board.code[g2]
            board.code[g2] = tmp
        else:
            length = len(dispeared_gene)
            row = random.randint(0, self.n - 1)
            col = random.randint(0, length - 1)
            board.code[row] = dispeared_gene[col]
        return board
    
    def selectParents(self)->tuple:
        """Selects two parents from the population using tournament selection.  
        Ten random boards are selected, and the two with the highest fitness are returned.
        
        Returns:
            tuple: Two parent boards selected from the population.
        """
        parents_seeds = random.sample(range(self.size), 10)
        parents = [self.boards[i] for i in parents_seeds]
        sorted_parents = sorted(parents, key=lambda x: x.fitness, reverse=True)
        return sorted_parents[0], sorted_parents[1]
    
    def isGoal(self)->GABoard:
        """Checks if any board in the population is a solution.
        
        Returns:
            GABoard: The board that is a solution, or None if no solution is found.
        """
        for board in self.boards:
            if board.isGoal():
                return board
        return None
    
    def evolve(self)->bool:
        """Evolves the population by selecting parents, performing crossover and mutation.  
        The population is replaced with the new boards created.

        Returns:
            bool: True if a solution is found, False otherwise.
        """
        self.setFitness()
        check_board = self.isGoal()
        if check_board != None:
            self.best_attacks = 0
            return True
        curr_best_attacks = self.n * (self.n - 1) // 2 - max([board.fitness for board in self.boards])
        if curr_best_attacks < self.best_attacks:
            self.best_attacks = curr_best_attacks
        newBoards = []
        for _ in range(self.size // 2):
            parent1, parent2 = self.selectParents()
            child1, child2 = self.crossover(parent1, parent2)
            if random.random() < self.mutate_rate:
                child1 = self.mutate(child1)
            if random.random() < self.mutate_rate:
                child2 = self.mutate(child2)
            newBoards.append(child1)
            newBoards.append(child2)
        self.boards = newBoards
        
    def getBestFitness(self)->int:
        """Gets the best fitness value from the population.
        
        Returns:
            int: The best fitness value from the population.
        """
        return max([board.fitness for board in self.boards])
import time
import ga
import ids
import hc
from utils import get_start_time, reset_start_time, get_time_limit, set_time_limit

def GA(size:int, max_generation:int=100000000)->tuple:
    """Genetic Algorithm for solving the N-Queens problem.

    Args:
        size (int): The size of the board (number of queens).
        max_generation (int, optional): The maximum number of generations. Defaults to 100000000.

    Returns:
        tuple: A tuple containing the best number of attacks and a success flag.
    """
    population = ga.Population(size)
    best_attacks = population.best_attacks
    success = False
    for gen in range(max_generation):
        if time.time() - get_start_time() > get_time_limit():
            break
        if gen % 50 == 0:
            print(f"Gen: {gen}, Best: {population.getBestFitness()}")
        if population.evolve():
            best_attacks = min(best_attacks, population.best_attacks)
            success = True
            print("======== Success ========")
            print(f"Gen: {gen}, Best: {population.getBestFitness()}")
            print(f"Best attacks: {population.best_attacks}")
            return best_attacks, success
        else:
            best_attacks = min(best_attacks, population.best_attacks)

    print("======== Failed ========")
    print(f"Gen: {gen}, Best: {population.getBestFitness()}")
    print(f"Best attacks: {population.best_attacks}")
    
    return best_attacks, success

def IDS(size:int, init_depth:int=1, init_step:int=1)->tuple:
    """Incremental Depth-First Search (IDS) for solving the N-Queens problem.

    Args:
        size (int): The size of the board (number of queens).
        init_depth (int, optional): The initial depth for the search. Defaults to 1.
        init_step (int, optional): The step size for increasing the depth. Defaults to 1.

    Returns:
        tuple: A tuple containing the best number of attacks and a success flag.
    """
    max_depth_list = list(range(init_depth, size, init_step))
    if not max_depth_list or max_depth_list[-1] != size:
        max_depth_list.append(size)
    best_attacks = size * (size - 1) / 2

    for max_depth in max_depth_list:
        if time.time() - get_start_time() > get_time_limit():
            print("Timeout!")
            break
        dfs = ids.DFS(size, max_depth)
        success = dfs.search()
        if success:
            best_attacks = 0
            print("======== Success ========")
            print(f"Max depth: {max_depth}")
            print(f"Total expanded node: {dfs.expanded_node / 1000000}M")
            print(f"Best attacks: {dfs.best_attacks}")
            return best_attacks, success
        else:
            best_attacks = min(best_attacks, dfs.best_attacks)
            print("Max depth: ", max_depth)
            print("No solution found!")
            
    print("======== Failed ========")
    print(f"Max depth: {max_depth}")
    print(f"Total expanded node: {dfs.expanded_node / 1000000}M")
    print(f"Best attacks: {dfs.best_attacks}")
    
    return best_attacks, success

def HC(size:int, max_restart:int=1000000000000)->tuple:
    """Hill Climbing algorithm for solving the N-Queens problem.

    Args:
        size (int): The size of the board (number of queens).

    Returns:
        tuple: A tuple containing the best number of attacks and a success flag.
    """
    hcObj = hc.HC(size, max_restart)
    success = hcObj.search()
    max_attacks = size * (size - 1) / 2
    best_attacks = hcObj.best_attacks if success else max_attacks
    
    return best_attacks, success

if __name__ == '__main__':
    
    mode_dict = {'1': 'IDS', '2': 'HC', '3': 'GA'}
    # test tuple = (mode, iterations, size)
    eight_queens_test = [('1', 100, 8), ('2', 100, 8), ('3', 100, 8)]
    fifty_queens_test = [('1', 1, 50), ('2', 30, 50), ('3', 30, 50)]
    output_files = ['output-8-queens.txt', 'output-50-queens.txt']
    set_time_limit(600)
    customization = False
    
    test = int(input("Enter test (1: 8 queens, 2: 50 queens, 3: customization): "))
    if test == 1:
        mode_list = eight_queens_test
        output_file = open(output_files[0], mode='w')
    elif test == 2:
        mode_list = fifty_queens_test
        output_file = open(output_files[1], mode='w')
    elif test == 3:
        mode = input("Enter mode (1: IDS, 2: HC, 3: GA): ")
        size = int(input("Enter # queens: "))
        iterations = int(input("Enter iterations: "))
        mode_list = [(mode, iterations, size)]
        output_file = open(f'output-{size}-queens-{mode_dict[mode]}.txt', mode='w')
        customization = True
    else:
        print("Invalid test")
        exit()
    
    for mode, iterations, size in mode_list:
        output = f"======== {mode_dict[mode]} ========\n"
        sum_time = 0
        sum_attacks = 0
        failed_times = 0
        time_cost = 0
        
        if customization:
            print(f"Mode: {mode}, Iterations: {iterations}, Size: {size}")
            if mode == "1":
                print("Using IDS")
                init_depth_limit = int(input("Enter initial depth limit: "))
                depth_inc_per_dfs = int(input("Enter depth increment per dfs: "))
            elif mode == "2":   
                print("Using HC")
                max_restart = int(input("Enter max restart times limit: "))
            elif mode == "3":
                print("Using GA")
                max_generation = int(input("Enter max generation limit: "))

        for iter in range(iterations):
            start_time = time.time()
            success = False
            if mode == "1":
                reset_start_time()
                best_attacks, success = IDS(size) if not customization else IDS(size, init_depth_limit, depth_inc_per_dfs)
                time_cost = time.time() - start_time
            elif mode == "2":
                reset_start_time()
                best_attacks, success = HC(size) if not customization else HC(size, max_restart)
                time_cost = time.time() - start_time
            elif mode == "3":
                reset_start_time()
                best_attacks, success = GA(size) if not customization else GA(size, max_generation)
                time_cost = time.time() - start_time
            else:
                print("Invalid mode")
                exit()
            
            if not success:
                print(f"Iteration: {iter}, Execution Timeout!")
                failed_times += 1
            else:
                print(f"Iteration: {iter}, Total execution time: {time_cost:.6f} sec")

            print("========================")
            sum_attacks += best_attacks
            sum_time += time_cost

        output += f"Average time: {sum_time / iterations}\n"
        output += f"Average # attacks: {sum_attacks / iterations}\n"
        output += f"Success rate: {(iterations - failed_times) / iterations * 100}%\n"
        print(f"Average time: {sum_time / iterations}")
        print("========================")
        output_file.write(output)

    output_file.close()

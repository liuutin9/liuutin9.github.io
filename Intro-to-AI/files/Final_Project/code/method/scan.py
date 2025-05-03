from utils.objects import Building, Direction
import random

def scan_algorithm(building:Building) -> list:
    """
    This function implements a simple scanning algorithm.
    It scans through a list of numbers and returns the sum of all even numbers.
    """
    dest_picked = []
    scheduled_lists = []
    for elevator in building.elevators:
        
        scheduled_list = elevator.scheduled_list[:]
        
        for i in dest_picked:
            if i in scheduled_list:
                scheduled_list.remove(i)
                
        if len(scheduled_list) <= 1:
            scheduled_lists.append(scheduled_list)
            continue
        
        scheduled_list.sort()
    
        # flag == True -> go up
        # flag == False -> go down
        if elevator.curr_floor == 0:
            flag = True
        elif elevator.curr_floor == building.num_floors:
            flag = False
        elif elevator.prev_direction == Direction.UP:
            flag = True
        elif elevator.prev_direction == Direction.DOWN:
            flag = False
        else:
            flag = random.choice([True, False])
            
        tmp = scheduled_list[:]
        tmp.append(elevator.curr_floor)
        tmp = sorted(tmp, reverse=(not flag))
        idx = tmp.index(elevator.curr_floor)
        scheduled_list = tmp[idx+1:] + sorted(tmp[:idx], reverse=flag)
        
        dest_picked.append(scheduled_list[0])
        
        scheduled_lists.append(scheduled_list)
    
    return scheduled_lists
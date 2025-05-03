from enum import Enum
import random
import time
from utils.data_structures import Queue
import copy
import os
from os import system

class Direction(Enum):
    """Direction of the elevator.

    Args:
        Enum (int): The direction of the elevator.
    """
    UP = 1
    DOWN = 2
    IDLE = 3
    
class Human():
    """Only use when a new human is generated outside an elavator.
    """
    def __init__(self, curr_floor:int, weight:int=70):
        self.weight:int = weight
        self.curr_floor:int = curr_floor
        self.direction:Direction = Direction.IDLE
    
    def __repr__(self)->str:
        return f"Human({self.curr_floor}, {self.weight}, {self.direction})"
        
    def pick_destination(self, num_floors:int)->int:
        """Pick a random destination floor for the human.
        
        Args:
            num_floors (int): The total number of floors in the building.
        
        Returns:
            int: The destination floor for the human.
        """
        if self.direction == Direction.UP:
            self.destination = random.randint(self.curr_floor + 1, num_floors - 1)
        elif self.direction == Direction.DOWN:
            self.destination = random.randint(0, self.curr_floor - 1)
        else:
            self.destination = random.randint(0, num_floors - 1)
        return self.destination
        
    def pick_direction(self, num_floors:int)->Direction:
        """Pick a random direction for the human.

        Args:
            num_floors (int): The total number of floors in the building.

        Returns:
            Direction: The direction the human wants to go
        """
        if self.curr_floor == 0:
            self.direction = Direction.UP
        elif self.curr_floor == num_floors - 1:
            self.direction = Direction.DOWN
        else:
            self.direction = random.choice([Direction.UP, Direction.DOWN])
        return self.direction
    
class Motor():
    def __init__(self, config:dict, debug:bool=False):
        self.__startup_energy_loss:dict = config['startup_energy_loss']
        self.__debug:bool = debug
    
    def energy_consumption(self, start_floor:int, dest_floor:int, floor_height:float, total_weight:int)->float:
        """Calculate the energy consumption of the elevator based on the distance traveled.
        
        Args:
            start_floor (int): The starting floor of the elevator.
            dest_floor (int): The destination floor of the elevator.
            floor_height (float): The height of each floor in meters.
            total_weight (int): The total weight of the elevator and passengers in kg.
            
        Returns:
            float: The energy consumption of the elevator in Joules.
        """
        s = floor_height * abs(start_floor - dest_floor)
        g = 9.81
        m = float(total_weight)
        return m * g * s + self.__startup_energy_loss
    
class Elevator():
    def __init__(self, config:dict, schedule_func:callable, num_floors:int, floor_height:float, debug:bool=False, ticktime:int=1):
        self.__ticktime:int = ticktime
        self.__weight:int = config['weight']
        self.__capacity:int = config['capacity']
        self.__curr_floor:int = config['init_floor']
        self.__scheduling_win_size:int = config['scheduling_win_size']
        self.__door_open_time:int = config['door_open_time']
        self.__floor_height:float = floor_height
        self.__schedule_func:callable = schedule_func
        self.__debug:bool = debug
        self.__prev_direction:Direction = Direction.IDLE
        self.__num_people:int = 0
        self.__in_pending:list = [0 for _ in range(num_floors)]
        self.__scheduled_list:list = []
        self.__energy_comsumption:float = 0.0
        self.__motor:Motor = Motor(config['motor_config'], self.__debug)
        
    @property
    def ticktime(self)->int:
        """Get the tick time of the elevator.

        Returns:
            int: The tick time of the elevator in seconds.
        """
        return self.__ticktime
    
    @property
    def total_weight(self)->int:
        """Calculate the total weight of the elevator including passengers.

        Returns:
            int: The total weight of the elevator in kg.
        """
        return self.__weight + self.__num_people * 70
    
    @property
    def capacity(self)->int:
        """Get the capacity of the elevator.

        Returns:
            int: The capacity of the elevator in number of people.
        """
        return self.__capacity
    
    @property
    def curr_floor(self)->int:
        """Get the current floor of the elevator.

        Returns:
            int: The current floor of the elevator.
        """
        return self.__curr_floor
    
    @property
    def scheduling_win_size(self)->int:
        """Get the scheduling window size of the elevator.

        Returns:
            int: The scheduling window size of the elevator in seconds.
        """
        return self.__scheduling_win_size
    
    @ property
    def door_open_time(self)->int:
        """Get the door open time of the elevator.

        Returns:
            int: The door open time of the elevator in seconds.
        """
        return self.__door_open_time
    
    @property
    def debug(self)->bool:
        """Get the debug mode of the elevator.

        Returns:
            bool: True if debug mode is enabled, False otherwise.
        """
        return self.__debug
    
    @property
    def prev_direction(self)->Direction:
        """Get the previous direction of the elevator.

        Returns:
            Direction: The previous direction of the elevator.
        """
        return self.__prev_direction
    
    @property
    def num_people(self)->int:
        """Get the number of people inside the elevator.

        Returns:
            int: The number of people inside the elevator.
        """
        return self.__num_people
    
    @property
    def in_pending(self)->list:
        """Get the number of people waiting to get out on each floor.
        
        Returns:
            list: The number of people waiting to get out on each floor.
        """
        return self.__in_pending
    
    @property
    def scheduled_list(self)->list:
        """Get the scheduled list of the elevator.

        Returns:
            list: The scheduled list of the elevator.
        """
        return self.__scheduled_list
    
    @property
    def energy_comsumption(self)->float:
        """Get the energy consumption of the elevator.

        Returns:
            float: The energy consumption of the elevator in Joules.
        """
        return self.__energy_comsumption
    
    @property
    def motor(self)->Motor:
        """Get the motor of the elevator.

        Returns:
            Motor: The motor of the elevator.
        """
        return self.__motor
    
    def set_scheduled_list(self, scheduled_list:list)->None:
        """set the scheduled list of the elevator.
        
        Args:
            scheduled_list (list): The scheduled list of the elevator.
        """
        self.__scheduled_list = scheduled_list
    
    def move(self, dest_floor:int, num_floors:int)->None:
        """Move the elevator to the destination floor.
        
        Args:
            dest_floor (int): The destination floor of the elevator.
            num_floors (int): The total number of floors in the building.
        """
        if dest_floor < 0 or dest_floor >= num_floors:
            raise ValueError("Invalid destination floor.")
        
        # Calculate energy consumption
        self.__energy_comsumption += self.__motor.energy_consumption(self.__curr_floor, dest_floor, self.__floor_height, self.total_weight)
        
        if self.__curr_floor < dest_floor:
            self.__prev_direction = Direction.UP
        elif self.__curr_floor > dest_floor:
            self.__prev_direction = Direction.DOWN
        else:
            self.__prev_direction = Direction.IDLE
        
        # Update current floor
        self.__curr_floor = dest_floor
        
    def open_door(self, out_pending:list, num_floors:int, enter_func:callable)->list:
        """Open the elevator door and let people in/out.
        
        Args:
            out_pending (list): The number of people waiting to get out on each floor.
            num_floors (int): The total number of floors in the building.
            enter_func (callable): The function to call when a person enters the elevator.
            
        Returns:
            list: The scheduled list of the elevator.
        """
        curr_floor = self.__curr_floor
        
        if self.__in_pending[curr_floor] > 0:
            self.__num_people -= self.__in_pending[curr_floor]
            self.__in_pending[curr_floor] = 0
            
        if out_pending[curr_floor] > 0:
            flow = min(out_pending[curr_floor], self.__capacity - self.__num_people)
            self.__num_people += flow
            for _ in range(flow):
                human:Human = enter_func(curr_floor)
                dest = human.pick_destination(num_floors)
                self.__in_pending[dest] += 1
                
        tmp = [i for i in range(num_floors) if (self.__in_pending[i] > 0 or out_pending[i] > 0) and i != curr_floor]
        for i in tmp:
            if i not in self.__scheduled_list:
                self.__scheduled_list.append(i)
        return self.__scheduled_list
    
class Building():
    def __init__(self, config:dict, schedule_func:callable, debug:bool=False, ticktime:int=1, clr:bool=False)->None:
        self.__clr:bool = clr
        self.__debug = debug
        self.__ticktime:int = ticktime
        self.__num_floors:int = config['num_floors']
        self.__floor_height:int = config['floor_height']
        self.__num_elevators:int = config['num_elevators']
        self.__each_floor_waiting_queue:list = [Queue() for _ in range(config['num_floors'])]
        self.__schedule_func:callable = schedule_func
        self.__elevators:list = [Elevator(ec, schedule_func, self.__num_floors, self.__floor_height, debug, ticktime) for ec in config['elevator_configs']]
        self.__scheduled_lists:list = []
    
    def __repr__(self):
        rt = "========= Building Info =========\n"
        rt += f"\nBuilding with {self.__num_floors} floors, each {self.__floor_height}m high, and {self.__num_elevators} elevators.\n"
        rt += "\n======== Elevator Info =========\n"
        for i, elevator in enumerate(self.__elevators):
            rt += f"\nElevator {i}:\n{elevator}"
        rt += "\n========== Floor Info ==========\n\n"
        for i, queue in enumerate(self.__each_floor_waiting_queue):
            rt += f"Floor {i}: {queue}\n"
        return rt
    
    @property
    def clr(self)->bool:
        """Get the clear mode of the simulation.

        Returns:
            bool: True if clear mode is enabled, False otherwise.
        """
        return self.__clr
    
    @property
    def debug(self)->bool:
        """Get the debug mode of the simulation.

        Returns:
            bool: True if debug mode is enabled, False otherwise.
        """
        return self.__debug
    
    @property
    def ticktime(self)->int:
        """Get the tick time of the simulation.

        Returns:
            int: The tick time of the simulation in seconds.
        """
        return self.__ticktime
     
    @property
    def num_floors(self)->int:
        """Get the number of floors in the building.

        Returns:
            int: The number of floors in the building.
        """
        return self.__num_floors
    
    @property
    def floor_height(self)->int:
        """Get the height of each floor in the building.

        Returns:
            int: The height of each floor in the building in meters.
        """
        return self.__floor_height
    
    @property
    def num_elevators(self)->int:
        """Get the number of elevators in the building.

        Returns:
            int: The number of elevators in the building.
        """
        return self.__num_elevators
    
    @property
    def each_floor_waiting_queue(self)->list:
        """Get the list of waiting queues for each floor.

        Returns:
            list: The list of waiting queues for each floor.
        """
        return self.__each_floor_waiting_queue
    
    @property
    def elevators(self)->list:
        """Get the list of elevators in the building. You can use this to access each elevator.

        Returns:
            list: The list of elevators in the building.
        """
        return self.__elevators
    
    @property
    def out_pending(self) -> list:
        """Get the number of people waiting to get in on each floor.

        Returns:
            list: The number of people waiting to get in on each floor.
        """
        return [self.__each_floor_waiting_queue[i].size for i in range(self.__num_floors)]
    
    def random_generate_human(self)->None:
        """Generate a random human and add it to the waiting queue of a random floor.
        """
        floor = random.randint(0, self.__num_floors - 1)
        human = Human(floor)
        human.pick_direction(self.__num_floors)
        self.__each_floor_waiting_queue[floor].push(human)
        
    def accumulated_comsumption(self)->float:
        """Calculate the accumulated energy consumption of the elevator system.
        
        Returns:
            float: The accumulated energy consumption of the elevator system in Joules.
        """
        energy_comsumption = 0.0
        elevator:Elevator
        for elevator in self.__elevators:
            energy_comsumption += elevator.energy_comsumption
        return energy_comsumption
        
    def print_simulation_step(self)->None:
        """Print the current state of the elevator system.
        """
        if self.__clr:
            system('cls' if os.name == 'nt' else 'clear')
        print(f"===== Simulation Step =====")
        for i in range(self.__num_elevators):
            elevator = self.__elevators[i]
            print(f"Elevator {i}: [Floor {elevator.curr_floor}]")
            print(f"    - #Passengers inside: {elevator.num_people}")
            print(f"    - Pending (In elevator): {elevator.in_pending}")
            print(f"    - Schedule list: {elevator.scheduled_list}")
            print()
        print("Floors:")
        for floor in reversed(range(self.__num_floors)):
            marker = ''
            elevator:Elevator
            for elevator in self.__elevators:
                marker += '🛗 ' if elevator.curr_floor == floor else '   '
            waiting = len(self.__each_floor_waiting_queue[floor])
            print(f"[{floor}] ⬆️  {waiting:3d} waiting {marker}")
        print()
        print(f"Energy Consumption so far: {self.accumulated_comsumption():.3f} J")
        print("=" * 30)
        
    def enter_func(self, curr_floor:int)->Human:
        """Enter the elevator.
        
        Args:
            curr_floor (int): The current floor of the elevator.
        """
        if self.__each_floor_waiting_queue[curr_floor].is_empty():
            return None
        else:
            human = self.__each_floor_waiting_queue[curr_floor].pop()
            return human
        
    def start(self)->None:
        """Start the elevator system.
        """
        while True:
            self.__scheduled_lists.clear()
            
            elevator:Elevator
            for elevator in self.__elevators:
                sl = elevator.open_door(self.out_pending, self.__num_floors, self.enter_func)
                self.__scheduled_lists.append(sl)
            
            self.__scheduled_lists = self.__schedule_func(copy.deepcopy(self))
            
            for elevator, scheduled_list in zip(self.__elevators, self.__scheduled_lists):
                elevator.set_scheduled_list(scheduled_list)
            
            if self.__debug:
                self.print_simulation_step()
                time.sleep(self.__ticktime)
            
            done = 0
            for elevator in self.__elevators:
                if len(elevator.scheduled_list) > 0:
                    elevator.move(elevator.scheduled_list.pop(0), self.__num_floors)
                else:
                    done += 1
            if done == len(self.__elevators):
                break
        
        if self.__debug:
            self.print_simulation_step()
        
        return self.accumulated_comsumption()
    
class Test():
    def __init__(self, config:dict, debug:bool=False, ticktime:int=1, clr:bool=False):
        self.__schedule_func:callable = config['strategy']
        self.__total_flow:int = config['total_flow']
        self.__building:Building = Building(config['building_config'], self.__schedule_func, debug, ticktime, clr)
        
    @property
    def building(self)->Building:
        return self.__building
        
    def run(self)->float:
        """Run the elevator system.
        
        Returns:
            float: The accumulated energy consumption of the elevator system in Joules.
        """
        for _ in range(self.__total_flow):
            self.__building.random_generate_human()
        return self.__building.start()
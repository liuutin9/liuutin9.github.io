import json
import sys

from objects import Building

if len(sys.argv) < 2:
    print("Usage: python test.py <config_file>")
    sys.exit(1)

file_path = sys.argv[1]

with open(file_path, 'r') as config_file:
    config:dict = json.load(config_file)
    building = Building(config)
    for i in range(building.num_floors):
        building.random_generate_human()
    print(building)

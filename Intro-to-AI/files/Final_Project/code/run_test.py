import argparse
import copy
import json
import os
import sys

from utils.objects import Test, random_generate_human
from config.tools.config_validation import config_validation

# TODO: 之後可以這邊加更多 strategies 的 import
from method.scan import scan_algorithm
from method.scan_plus import scan_plus_algorithm

strategy_map = {
    # TODO: 之後要加新的 strategy，可以在這裡補
    'scan': scan_algorithm,
    'scan_plus': scan_plus_algorithm,
}

parser = argparse.ArgumentParser(description="Run test with a configuration file.")
parser.add_argument('config_file', type=str, help="Path to the config file")
parser.add_argument('-d', '--debug', action='store_true', help="Enable debug mode")
parser.add_argument('-clr', '--clear', action='store_true', help="Enable clear mode")
parser.add_argument('-s', '--strategy', type=str, choices=[name for name in strategy_map.keys()], help="Specify strategy to use")
parser.add_argument('-t', '--ticktime', type=int, help="Specify simulation tick time")

args = parser.parse_args()

file_path = args.config_file

try:
    with open(file_path, 'r') as config_file:
        config:dict = json.load(config_file)
except Exception as e:
    print(f"Error reading config file: {e}")
    sys.exit(1)

if not config_validation(config):
    print("Error: Invalid configuration file.")
    sys.exit(1)
print("Configuration file is valid.")

if args.strategy:
    if args.strategy not in strategy_map:
        print(f"Error: Unknown strategy {args.strategy}")
        sys.exit(1)
    config['strategy'] = strategy_map[args.strategy]
else:
    if config['strategy'] not in strategy_map:
        print(f"Error: Unknown strategy {config['strategy']}")
        sys.exit(1)
    config['strategy'] = strategy_map[config['strategy']]
    
if args.ticktime:
    ticktime = args.ticktime
else:
    ticktime = 0

human_requests = random_generate_human(config['total_flow'], config['building_config']['num_floors'])

test = Test(config, debug=args.debug, ticktime=ticktime, clr=args.clear)
energy_consumption = test.run(copy.deepcopy(human_requests), config['strategy'])
print(f"Energy consumption: {energy_consumption} J")
new_name = f"animation_log/simulation_log_{config['strategy'].__name__}.json"
if os.path.exists(new_name):
    os.remove(new_name)
os.rename("animation_log/simulation_log.json", new_name)

config['strategy'] = scan_algorithm
energy_consumption = test.run(copy.deepcopy(human_requests), config['strategy'])
print(f"Energy consumption: {energy_consumption} J")
new_name = f"animation_log/simulation_log_{config['strategy'].__name__}.json"
if os.path.exists(new_name):
    os.remove(new_name)
os.rename("animation_log/simulation_log.json", new_name)
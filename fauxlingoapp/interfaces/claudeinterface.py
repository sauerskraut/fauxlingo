import json
import os

def get_api_key():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, 'keys.json')) as f:
        keys_dict = json.load(f)
    return keys_dict["claude"]
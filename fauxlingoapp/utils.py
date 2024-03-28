from anki import collection
import zipfile
import sqlite3
import json
from .utils import *
import csv
from django.http import JsonResponse
from .interfaces import ankiinterface, openaiinterface, claudeinterface, elevenlabsinterface

import os
import json

def load_json_config():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, 'config.json')) as f:
        config_dict = json.load(f)
    return config_dict

config_dict = load_json_config()

def load_data(language):
    word_dictionary = ankiinterface.get_words(
        config_dict["anki"][language]["file_path"],
        config_dict["anki"][language]["word_column_header"],
        config_dict["anki"][language]["translation_column_header"]
    )

    return word_dictionary

word_dictionary = load_data("Spanish")
OAI = openaiinterface.OpenAIInterface()

def filter_data_by_chapter(chapter_list):
    data = load_data("Spanish")
    filtered_data = []
    for row in data:
        if data[row]["chapter number"] in chapter_list:
            filtered_data.append(row)
    return filtered_data

def get_list_of_chapters():
    data = load_data("Spanish")
    chapter_list = {}
    for row in data:
        print(data[row]["chapter number"])
        if data[row]["chapter number"] not in chapter_list:
            chapter_list[data[row]["chapter number"]] = data[row]["chapter name"]
    return chapter_list

def get_selected_chapter(chapter_number):
    data = load_data("Spanish")
    filtered_data = []
    for row in data:
        if data[row]["chapter number"] == chapter_number:
            filtered_data.append(row)

    return filtered_data
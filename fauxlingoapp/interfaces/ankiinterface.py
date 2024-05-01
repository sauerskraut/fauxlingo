import csv
import random

def get_words(file_path, word_column_header, translation_column_header, chapter_number_column="Chapter Number", chapter_name_column="Chapter Name"):
    word_dictionary = {}
    with open(file_path, 'r', encoding='utf-8-sig') as file:
        reader = csv.reader(file)

        # Read the header (first row) to get column names
        header = next(reader)

        print(header)

        # Get indices of columns to be read
        word_index = header.index(word_column_header)
        translation_index = header.index(translation_column_header)
        chapter_number_index = header.index(chapter_number_column)
        chapter_name_index = header.index(chapter_name_column)

        # Read each row and populate dict
        for row in reader:
            word_dictionary[row[word_index]] = {
                'translation': row[translation_index],
                'chapter number': row[chapter_number_index],
                'chapter name': row[chapter_name_index]
            }

    return word_dictionary

def get_words_as_string(word_dict):
    """
    Extracts words from a dictionary and returns them as a comma-separated string.
    Assumes that the dictionary keys represent words.
    """
    words_as_string = ', '.join(word_dict.keys())
    return words_as_string

def get_words_as_string_specify_number(word_dict, chapter_number):
    """
    Extracts words from a dictionary and returns them as a comma-separated string.
    Assumes that the dictionary keys represent words.
    """
    words_as_string = ', '.join([word for word in word_dict.keys() if word_dict[word]['chapter number'] == chapter_number])
    return words_as_string

def get_random_word(word_dict):
    """
    Returns a random word from the dictionary, along with its translation,
    in the format '<esp>Spanish word</esp><eng>English word</eng>'.
    """
    random_word = random.choice(list(word_dict.keys()))
    translation = word_dict[random_word]['translation']
    return f'<esp>{random_word}</esp><eng>{translation}</eng>'

def get_random_word_specify_number(word_dict, chapter_number):
    """
    Returns a random word from the dictionary based on the specified chapter number,
    along with its translation, in the format '<esp>Spanish word</esp><eng>English translation</eng>'.
    """
    filtered_words = [word for word in word_dict.keys() if word_dict[word]['chapter number'] == chapter_number]
    random_word = random.choice(filtered_words)
    translation = word_dict[random_word]['translation']
    return f'<esp>{random_word}</esp><eng>{translation}</eng>'

def get_list_of_words(word_dict):
    """
    Returns a list of words and their translations as a hash table from the dictionary.
    """
    word_list = []
    counter = 0
    while counter < 10:
        # we need to make sure the word isn't already in the dictionary
        random_word = random.choice(list(word_dict.keys()))
        if random_word in word_list:
            continue
        translation = word_dict[random_word]['translation']
        word_list.append({
            'word': random_word,
            'translation': translation
        })
        counter += 1
    return word_list
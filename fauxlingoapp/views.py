from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .utils import *
from .interfaces import openaiinterface
import csv

def index(request):
    return render(request, 'index.html')

def read_apkg(request):
    # Path to your .apkg file
    data = []
    with open('spanishduo12.csv', newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)

    # Return the notes as a JSON response
    return JsonResponse(data, safe=False)

def get_chapter_list():
    chapter_list = get_list_of_chapters()
    return JsonResponse(chapter_list, safe=False)

def get_sentence():
    word_string = ankiinterface.get_words_as_string(word_dictionary).strip()
    input_string = config_dict["sentence-prompt"].strip().format(spanishwords=word_string)
    gpt_response = OAI.get_text_response_only(input_string)
    return gpt_response

def get_word():
    word = ankiinterface.get_random_word(word_dictionary).strip()
    return word

def get_sentence_view():
    return JsonResponse(get_sentence(), safe=False)

def get_word_view():
    return JsonResponse(get_word(), safe=False)

class ChapterDataView(View):
    def get(self, request, *args, **kwargs):
        chapter_list = request.GET.getlist('chapters')
        data = filter_data_by_chapter(chapter_list)
        return JsonResponse(data, safe=False)

class ChapterListView(View):
    def get(self, request, *args, **kwargs):
        chapter_list = get_list_of_chapters()
        return JsonResponse(chapter_list, safe=False)
    
class SentenceView(View):
    def get(self, request, *args, **kwargs):
        return get_sentence_view()
    
class WordView(View):
    def get(self, request, *args, **kwargs):
        return get_word_view()
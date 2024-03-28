from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .utils import *
import csv

def index(request):
    return render(request, 'index.html')

def read_apkg(request):
    # Path to your .apkg file
    data = []
    with open('spanishduo.csv', newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)

    # Return the notes as a JSON response
    return JsonResponse(data, safe=False)

def get_chapter_list():
    chapter_list = get_list_of_chapters()
    return JsonResponse(chapter_list, safe=False)

class ChapterDataView(View):
    def get(self, request, *args, **kwargs):
        chapter_list = request.GET.getlist('chapters')
        data = filter_data_by_chapter(chapter_list)
        return JsonResponse(data, safe=False)

class ChapterListView(View):
    def get(self, request, *args, **kwargs):
        chapter_list = get_list_of_chapters()
        return JsonResponse(chapter_list, safe=False)
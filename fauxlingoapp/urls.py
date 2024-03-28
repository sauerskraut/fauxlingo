from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('read_apkg/', views.read_apkg, name='read_apkg'),
    path('api/chapter_data/', views.ChapterDataView.as_view()),
    path('api/chapter_list/', views.ChapterListView.as_view()),
]
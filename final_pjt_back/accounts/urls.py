from django.urls import path
from . import views

urlpatterns = [
    path('profile/<username>/', views.user_profile, name='profile'),
    path('<username>/follow/', views.follow, name='follow'),
    path('<username>/followcount/', views.follow_count, name='followcount'),
    path('upload_img/<username>/', views.upload_img, name='upload_img'),
] 

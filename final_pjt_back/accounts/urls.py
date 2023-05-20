from django.urls import path
from . import views

urlpatterns = [
    path('profile/<username>/', views.user_profile, name='profile'),
    # path('<int:user_pk>/follow/', views.follow, name='follow'),
    path('upload_img/<username>/', views.upload_img, name='upload_img'),
]

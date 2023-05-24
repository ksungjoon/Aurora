from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/<username>/', views.user_profile, name='profile'),
    path('profile/id/<int:id>/', views.user_profile_id, name='profile_id'),
    path('<username>/follow/', views.follow, name='follow'),
    path('<username>/followcount/', views.follow_count, name='followcount'),
    path('upload_img/<username>/', views.upload_img, name='upload_img'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

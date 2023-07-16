from django.urls import path
from . import views

urlpatterns = [
    path("account/", views.UserCreationView.as_view()),
    path("account/token-auth/", views.CustomAuthToken.as_view()),
    path("account/<str:key>/", views.UserRetrieveView.as_view()),
    path("song/", views.SongListCreateView.as_view()),
    path("song/like/", views.SongLikeListCreateView.as_view()),
    path("song/like/<str:song>/", views.SongLikeDestroyView.as_view()),
]

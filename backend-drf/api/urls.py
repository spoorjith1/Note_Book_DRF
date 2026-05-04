from django.urls import path, include
from .views import CreateUserView, NoteCreateListView, NoteEditView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    #register
    path('register/', CreateUserView.as_view(), name='register'),
    
    #login
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    
    #note
    path('notes/', NoteCreateListView.as_view(), name='note_list'),
    path('notes/edit/<int:pk>/', NoteEditView.as_view(), name='note_edit'),
]
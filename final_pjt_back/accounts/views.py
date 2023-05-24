from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserImgSerializer
# from .models import Comment, Profile
from .models import User
from rest_framework.response import Response

@api_view(['GET'])
def user_profile(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
@api_view(['GET'])
def user_profile_id(request, id):
    user = get_object_or_404(get_user_model(), id=id)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

@api_view(['GET', 'PUT'])
def upload_img(request, username):
    user = get_object_or_404(get_user_model(), username=username)

    if request.method == 'GET':
        serializer = UserImgSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        if request.user != user:
            return Response({'profile':'권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserImgSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def follow(request, username):
    user = get_object_or_404(User, username=username)
    if user !=  request.user:
        if user.followers.filter(pk=request.user.pk).exists():
            user.followers.remove(request.user)
        else:
            user.followers.add(request.user)       
    # context = {
    #     'followed' : followed,
    # }
    # return Response(context, status=status.HTTP_200_OK)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def follow_count(request, username):
    user = get_object_or_404(User, username=username)
    if user.followers.filter(pk=request.user.pk).exists():
        followed = True
    else:
        followed = False
    print(user)
    serializer= UserSerializer(user)
    print(len(serializer.data['followers']))
    if len(serializer.data['followers'])==0:
        followers_count = 0
    else:
        followers_count = len(serializer.data['followers'])
    if len(serializer.data['followings'])==0:
        followings_count = 0
    else:
        followings_count = len(serializer.data['followings'])
    data = {
        'followed':followed,
        'followers_count':followers_count,
        'followings_count':followings_count
    }
    return Response(data) 
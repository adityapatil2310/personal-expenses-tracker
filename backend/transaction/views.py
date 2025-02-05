from django.shortcuts import render
from .models import Transactions, Categories
from .serializer import TransactionSerializer, CategorySerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def show_all_transactions(request):
    transactions = Transactions.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def user_transactions(request, userid):
    if request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        try:
            transactions = Transactions.objects.filter(userId=userid)
        except Transactions.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TransactionSerializer(transactions)
        return JsonResponse(serializer.data)
        
@api_view(['GET', 'PUT', 'DELETE'])
def transactions(request, id):
    try:
        transaction = Transactions.objects.get(id=id)
    except Transactions.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        serializer = TransactionSerializer(transaction)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def categoryTransaction(request, userId, category):
    try:
        transactions = Transactions.objects.filter(userId=userId, name=category)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TransactionSerializer(transactions, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    
    
    
                                ##### Category Views #####
    
@api_view(['GET', 'POST'])
def Cat(request, userId):
    if request.method == 'GET':
        try:
            categories = Categories.objects.filter(userId=userId)
        except Categories.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteCategory(request, userId, category):
    try:
        categories = Categories.objects.get(userId=userId, name=category)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        categories.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
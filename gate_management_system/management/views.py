from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Gate, GuardAssignment
from .serializers import GateSerializer, GuardAssignmentSerializer

@api_view(['GET', 'POST'])
def gate_list(request):
    if request.method == 'GET':
        gates = Gate.objects.all()
        serializer = GateSerializer(gates, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def gate_detail(request, pk):
    try:
        gate = Gate.objects.get(pk=pk)
    except Gate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GateSerializer(gate)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GateSerializer(gate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        gate.is_deleted = True
        gate.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def guard_assignment_list(request):
    if request.method == 'GET':
        assignments = GuardAssignment.objects.all()
        serializer = GuardAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GuardAssignmentSerializer(data=request.data)
        if serializer.is_valid():
            unique_code = request.data.get('unique_code')
            gate_id = request.data.get('gate')
            if GuardAssignment.objects.filter(gate_id=gate_id, unique_code=unique_code).exists():
                return Response({'error': 'Guard already assigned to this gate'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def guard_assignment_detail(request, pk):
    try:
        assignment = GuardAssignment.objects.get(pk=pk)
    except GuardAssignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GuardAssignmentSerializer(assignment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GuardAssignmentSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

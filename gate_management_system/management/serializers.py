from rest_framework import serializers
from .models import Gate, GuardAssignment

class GateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gate
        fields = '__all__'

class GuardAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuardAssignment
        fields = '__all__'

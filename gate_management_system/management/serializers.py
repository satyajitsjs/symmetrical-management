from rest_framework import serializers
from .models import Gate, GuardAssignment
from datetime import datetime

class GateSerializer(serializers.ModelSerializer):
    start_time = serializers.CharField()
    end_time = serializers.CharField()

    class Meta:
        model = Gate
        fields = '__all__'


class GuardAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuardAssignment
        fields = '__all__'

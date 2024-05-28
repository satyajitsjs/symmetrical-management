from rest_framework import serializers
from .models import Gate, GuardAssignment
from datetime import datetime

class GateSerializer(serializers.ModelSerializer):
    start_time = serializers.CharField()
    end_time = serializers.CharField()

    class Meta:
        model = Gate
        fields = '__all__'

    def validate_start_time(self, value):
        return self.convert_time_format(value)

    def validate_end_time(self, value):
        return self.convert_time_format(value)

    def convert_time_format(self, value):
        try:
            return datetime.strptime(value, '%I.%M %p').time()
        except ValueError:
            raise serializers.ValidationError("Time has wrong format. Use one of these formats instead: hh:mm[:ss[.uuuuuu]].")

class GuardAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuardAssignment
        fields = '__all__'

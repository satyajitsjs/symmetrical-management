from django.db import models

class Gate(models.Model):
    GATE_TYPE_CHOICES = [
        ('Entry', 'Entry'),
        ('Exit', 'Exit'),
        ('Both', 'Both'),
    ]

    SHIFT_TIME_CHOICES = [
        ('24 hours', '24 hours'),
        ('12 hours', '12 hours'),
        ('8 hours', '8 hours'),
    ]

    name = models.CharField(max_length=100, unique=True)
    number_of_guards = models.IntegerField()
    gate_type = models.CharField(max_length=10, choices=GATE_TYPE_CHOICES)
    shift_time = models.CharField(max_length=10, choices=SHIFT_TIME_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class GuardAssignment(models.Model):
    unique_code = models.CharField(max_length=50, unique=True)
    gate = models.ForeignKey(Gate, related_name='assignments', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.unique_code} - {self.gate.name}'

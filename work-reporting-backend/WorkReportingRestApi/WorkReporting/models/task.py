from django.db import models

from datetime import date

class Task(models.Model):
    title = models.CharField(max_length=50)
    date = models.DateField(default=date.today)
    hours = models.DecimalField(max_digits=6, decimal_places=2)
    employee_email = models.EmailField(max_length=70)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = 'task'

        # Set default ordering
        ordering = ['id']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.title
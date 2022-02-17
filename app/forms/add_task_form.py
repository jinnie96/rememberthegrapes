from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Task



class AddTaskForm(FlaskForm):
    title = StringField('image', validators=[DataRequired()])
    due_by = DateTimeField('due_by')

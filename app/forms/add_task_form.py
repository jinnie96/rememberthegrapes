from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, SelectField
from wtforms.fields.html5 import DateTimeLocalField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class AddTaskForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=30)])
    # due_by = DateTimeLocalField('due_by')
    lists = SelectField('lists', validate_choice=False)
    submit = SubmitField('Submit')

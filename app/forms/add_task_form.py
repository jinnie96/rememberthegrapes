from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError

class AddTaskForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    # due_by = DateField('due_by')
    submit = SubmitField('Submit')

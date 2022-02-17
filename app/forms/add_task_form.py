from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError

class AddTaskForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    # due_by = DateTimeField('due_by')
    submit = SubmitField('Submit')

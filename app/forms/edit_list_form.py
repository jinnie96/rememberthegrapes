from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class EditListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    submit = SubmitField('Submit')

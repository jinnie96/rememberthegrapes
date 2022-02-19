from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError

class AddListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    submit = SubmitField('Submit')

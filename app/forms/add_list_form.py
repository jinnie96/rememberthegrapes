from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class AddListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=30)])
    submit = SubmitField('Submit')

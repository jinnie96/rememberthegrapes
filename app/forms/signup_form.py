from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_format(form, field):
    email = field.data
    if not "@" in email:
        raise ValidationError("Invalid Email")


class SignUpForm(FlaskForm):
    firstName = StringField('email', validators=[DataRequired()])
    lastName = StringField('email', validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_format])
    password = StringField('password', validators=[validators.DataRequired(), EqualTo('confirmPassword', message='Passwords must match')])
    confirmPassword = StringField('confirmPassword', validators=[validators.DataRequired()])

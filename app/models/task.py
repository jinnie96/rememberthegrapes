from .db import db

class Task(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    title = db.Column(db.String(50), nullable=False, unique=True)
    due_by = db.Column(db.datetime(255), nullable=False, unique=True)
    complete = db.Column(db.Boolean)

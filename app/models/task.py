from .db import db
from sqlalchemy.orm import relationship

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    title = db.Column(db.String(50), nullable=False)
    due_by = db.Column(db.DateTime(255), nullable=False, unique=True)
    complete = db.Column(db.Boolean, nullable=False)

    users = relationship("User", foreign_keys=[user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'title': self.title,
            'due_by': self.due_by,
            'complete': self.complete,
        }

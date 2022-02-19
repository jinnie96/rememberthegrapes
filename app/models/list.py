from .db import db
from sqlalchemy.orm import relationship
from tkinter import CASCADE

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    cascade="all, delete-orphan"

    users = relationship("User", foreign_keys=[user_id], back_populates="lists")
    tasks = relationship("Task", cascade="all, delete", back_populates="list")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
        }

from .db import db
from sqlalchemy.orm import relationship
class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    cascade="all, delete-orphan"
    user = relationship("User", foreign_keys=[user_id])

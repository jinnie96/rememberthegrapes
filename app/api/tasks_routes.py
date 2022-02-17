from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user, login_required
# from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

tasks_routes = Blueprint("tasks", __name__)

@tasks_routes.route('/list/<int:id>')
@login_required
def getAllListTasks():
    return

@tasks_routes.route('/user/<int:id>')
@login_required
def getUserTasks(id):
    print(id, "ID@!~!!!!!~!~~!")
    tasks = Task.query.filter(id == Task.user_id).all()
    return {
        "tasks": [task.to_dict() for task in tasks]
    }

@tasks_routes.route('/<int:id>')
@login_required
def getSingleTask(id):
    task = Task.query.filter(id == Task.id).first()
    return task

@tasks_routes.route('/', methods=["POST"])
@login_required
def postTask(postId):
    return

@tasks_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editTask(id):
    return

@tasks_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteTask(id):
    return

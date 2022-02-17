from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user, login_required
from app.forms.add_task_form import AddTaskForm
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
    form = AddTaskForm()
    if form.validate_on_submit():
        task = Task(user_id=current_user.id, list_id=None, title=form.data["title"], due_by=form.data["due_by"], complete=False)
        db.session.add(task)
        db.session.commit()
    return task.to_dict()

@tasks_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editTask(id):
    task = Task.query.get(id)
    data = request.get_json()
    if data["title"]:
        task.title=data["title"]
    if data["due_by"]:
        task.due_by= data["due_by"]
    db.session.commit()
    return task.to_dict()

@tasks_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteTask(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return list.to_dict()

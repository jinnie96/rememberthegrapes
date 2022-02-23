from datetime import date
from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user, login_required
from app.forms.add_task_form import AddTaskForm
import json
# from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

tasks_routes = Blueprint("tasks", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
    print("IN API")
    task = Task.query.filter(id == Task.id).first()
    return {"task": task.to_dict()}

@tasks_routes.route('/', methods=["POST"])
@login_required
def postTask():
    print("IN API!!!!!!", request.get_json()["due_by"])
    # data = json.loads(request.data.decode("utf-8"))
    # data = request.json()
    data = request.get_json()
    print("DATA JSON@@!!!!!!!!", data["list_id"])
    form = AddTaskForm()
    print(form.data, "FORM DATA@!@#!#!@")
    # if len(request.get_json()["due_by"][0].split("-")[1]) is 1:

    # year = request.get_json()["due_by"][0].split("-")[0]
    # month = request.get_json()["due_by"][0].split("-")[1]
    # day = request.get_json()["due_by"][0].split("-")[2]

    # print("YEARRRRRRRRRR", int(year))
    # print("YEARRRRRRRRRR", type(int((f"{int(month):02d}"))))
    # print("YEARRRRRRRRRR", int(day))
# date(int(year), int((f"{int(month):02d}")
    print("YEARRRRRRRRRR", type(9))
    form['csrf_token'].data = request.cookies['csrf_token']
    # form['title'].data = "test"
    if form.validate_on_submit():
        print("FORM@@@@@", form.data)
        task = Task(user_id=current_user.id, list_id=data["list_id"], title=form.data["title"], due_by=request.get_json()["due_by"], complete=False)
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# def new_post():
#     data = request.json
#     form = NewPostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         post = Post(
#             user_id=data['user_id'],
#             imgURL=form.data['imgURL'],
#             caption=form.data['caption']
#         )
#         db.session.add(post)
#         db.session.commit()
#         return post.to_dict()
#     return (form.errors)
@tasks_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def editTask(id):
    print("iN EDIT")
    task = Task.query.get(id)
    print("TASK", task)
    data = request.get_json()
    print("DATRIRRRR", data)
    if 'title' in data:
        task.title=data["title"]
    if 'due_by' in data:
        task.due_by= data["due_by"]
    if 'list_id' in data:
        task.list_id = data["list_id"]
    if 'complete' in data:
        task.complete = data["complete"]
    db.session.commit()
    return task.to_dict()

@tasks_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteTask(id):
    print("ID", id)
    task = Task.query.get(id)
    print("BEFORE@", task)
    db.session.delete(task)
    db.session.commit()
    print("DELETED")
    return {
        "id": id
    }

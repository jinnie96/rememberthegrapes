from datetime import date
from flask import Blueprint, request
from app.models import db, Task, List
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
    tasks = Task.query.filter(id == Task.user_id).all()
    return {
        "tasks": [task.to_dict() for task in tasks]
    }

@tasks_routes.route('/<int:id>')
@login_required
def getSingleTask(id):
    task = Task.query.filter(id == Task.id).first()
    return {"task": task.to_dict()}

@tasks_routes.route('/', methods=["POST"])
@login_required
def postTask():
    # data = json.loads(request.data.decode("utf-8"))
    # data = request.json()
    data = request.get_json()
    form = AddTaskForm()
    # if len(request.get_json()["due_by"][0].split("-")[1]) is 1:
    lists = List.query.all()
    # year = request.get_json()["due_by"][0].split("-")[0]
    # month = request.get_json()["due_by"][0].split("-")[1]
    # day = request.get_json()["due_by"][0].split("-")[2]
    # for list in lists:
    #     print(list.to_dict()["title"])
    #     form.lists.choices.push(list.to_dict()["title"])
    # form.lists.choices = [list.to_dict["title"] for list in lists]
    # print("FORM CHOICES", form.lists.choices)
    # print("YEARRRRRRRRRR", int(year))
    # print("YEARRRRRRRRRR", type(int((f"{int(month):02d}"))))
    # print("YEARRRRRRRRRR", int(day))
# date(int(year), int((f"{int(month):02d}")
    form['csrf_token'].data = request.cookies['csrf_token']
    # form['title'].data = "test"
    if form.validate_on_submit():
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
    task = Task.query.get(id)
    data = request.get_json()
    if 'title' in data:
        task.title=data["title"]
    if 'due_by' in data:
        task.due_by= data["due_by"]
    if 'list_id' in data:
        task.list_id = data["list_id"]
    if not data:
        task.list_id = None

    if 'complete' in data:
        task.complete = data["complete"]
    db.session.commit()
    return task.to_dict()

@tasks_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteTask(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {
        "id": id
    }

@tasks_routes.route('/search/<int:id>/<str>')
@login_required
def searchedTasks(id, str):
    print("IN API",id, str )
    term = request.get_json()
    print("eight" in (str))
    tasks = Task.query.filter(Task.title.contains(str)).filter(Task.user_id == id)
    for task in tasks:
        print(task.to_dict())
    # print("!@@@@@@@@@@@@@@", tasks.to_dict())
    return {
        "tasks": [task.to_dict() for task in tasks]
    }

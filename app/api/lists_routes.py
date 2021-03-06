from flask import Blueprint, request
from app.models import db, List, Task
from flask_login import current_user, login_required
# from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.add_list_form import AddListForm
from app.forms.edit_list_form import EditListForm

lists_routes = Blueprint("lists", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@lists_routes.route('/user/<int:id>')
@login_required
def getUserLists(id):
    lists = List.query.filter(id == List.user_id).all()
    return {
        "lists": [list.to_dict() for list in lists]
    }


@lists_routes.route('/<int:id>')
@login_required
def getSingleList(id):
    list = List.query.get(id)
    return {
        "id": list.id,
        "title": list.title
    }

@lists_routes.route('/', methods=["POST"])
@login_required
def postList():
    data = request.get_json()
    form = AddListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        lists = List(user_id=current_user.id, title=form.data["title"])
        db.session.add(lists)
        db.session.commit()
        return lists.to_dict()
    else:
        print(form.errors, "ERRORS")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@lists_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editList(id):
    list = List.query.get(id)
    data = request.get_json()
    form = EditListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print ("FORMEDITTT", form.data)
        if data["title"]:
            list.title=data["title"]
        db.session.commit()
        return list.to_dict()
    else:
        print(form.errors, "EDITERRORS")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@lists_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteList(id):
    list = List.query.get(id)
    tasks = Task.query.filter(id == Task.list_id).all()
    db.session.delete(list)
    db.session.commit()
    return {
        "id": id,
        "tasks": [task.to_dict() for task in tasks]
    }

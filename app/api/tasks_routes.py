from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user, login_required
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

tasks_routes = Blueprint("tasks", __name__)

@tasks_routes.route('/')
@login_required
def getAllTasks():
    return

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

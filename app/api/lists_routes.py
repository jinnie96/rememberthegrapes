from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user, login_required
# from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

lists_routes = Blueprint("lists", __name__)

@lists_routes.route('/')
@login_required
def getAllLists():
    return

@lists_routes.route('/<int:id>')
@login_required
def getSingleList(id):
    return

@lists_routes.route('/', methods=["POST"])
@login_required
def postList(postId):
    return

@lists_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editList(id):
    return

@lists_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteList(id):
    return

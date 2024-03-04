from flask import Blueprint,  jsonify
from flask_login import login_required
from .. import db
from ..models import User

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the API"})


@main.route('/dashboard')
@login_required
def dashboard():
    return jsonify({"message": "Welcome to the dashboard"})

from flask import Blueprint, render_template, redirect, url_for, request, current_app, jsonify, session
from flask import jsonify, send_from_directory
from .auth import login_required

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

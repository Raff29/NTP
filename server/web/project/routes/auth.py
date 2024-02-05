from flask import Blueprint, render_template, redirect, url_for, request, flash, session
from functools import wraps
from ..models import User
from ..services.user_service import create_user, authenticate_user
from .. import db

auth = Blueprint('auth', __name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('auth.login_post', next=request.url))
        return f(*args, **kwargs)
    return decorated_function


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        _, error = create_user(email, password)
        if error:
            flash(error)
            return redirect(url_for('auth.register'))

        return redirect(url_for('auth.login_post'))

    return "Signup page"


@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')

    user, error = authenticate_user(email, password)
    if error:
        flash(error)
        return redirect(url_for('auth.login'))

    session['user_id'] = user.id

    return redirect(url_for('main.dashboard'))

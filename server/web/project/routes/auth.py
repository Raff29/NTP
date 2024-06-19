from flask import Blueprint, request, flash, jsonify
from flask_login import login_user, current_user, logout_user
from ..services.form_service import RegistrationForm, LoginForm
from .. import db
from ..models import User

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    form = RegistrationForm()

    if form.validate():
        if form.password.data != form.confirm_password.data:
            return jsonify({'message': 'Passwords do not match'}), 400

        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'Email address already exists'}), 400

        new_user = User(email=email, password=password)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)

        return jsonify({'message': 'Registration successful'}), 200
    else:
        return jsonify({'errors': form.errors}), 400

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return jsonify({'message': 'Already logged in'}), 200
    
    data = request.get_json()
    form = LoginForm(data=data)

    if form.validate():
        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    return jsonify({'errors': form.errors}), 400


@auth.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

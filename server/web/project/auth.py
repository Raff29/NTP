from flask import Blueprint, render_template,current_app, redirect, url_for, request, Flask, session
from .models import User
from . import db

auth = Blueprint('auth', __name__)

app = Flask(__name__)

@auth.route('/register')
def register():
  return "Signup page"

@auth.route('/register', methods=['POST'])
def register_post():
  email = request.form.get('email')
  password = request.form.get('password')
  
  new_user = User(email=email, password=password)
  new_user.set_password(password)
  
  db.session.add(new_user)
  db.session.commit()
  
  return redirect(url_for('dashboard'))


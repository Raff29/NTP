from flask import Blueprint, render_template,current_app, redirect, url_for, request, Flask, flash, session
from .models import User
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/register')
def register():
  return "Signup page"

@auth.route('/register', methods=['POST'])
def register_post():
  email = request.form.get('email')
  password = request.form.get('password')
  
  user = db.session.query(User).filter_by(email=email).first()
  
  if user:
    flash('Email address already exists')
    return redirect(url_for('auth.register'))
  
  
  new_user = User(email=email, password=password)
  new_user.set_password(password)
  
  db.session.add(new_user)
  db.session.commit()
  
  return redirect(url_for('main.dashboard'))

@auth.route('/login', methods=['POST'])
def login_post():
  email = request.form.get('email')
  password = request.form.get('password')
  
  user = db.session.query(User).filter_by(email=email).first()
  
  if not user or not user.check_password(password):
    flash('Invalid email or password')
    return redirect(url_for('auth.login'))
  
  session['user_id'] = user.id
  
  return redirect(url_for('main.dashboard'))
# auth.py
from flask_login import LoginManager
from .models import User  # Import User model

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
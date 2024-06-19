from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from .config import DevConfig,ProdConfig
import os

db = SQLAlchemy()
session = Session()


def create_app():
    app = Flask(__name__)
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    config=os.environ.get('FLASK_ENV')
    app.config.from_object(DevConfig)
    app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
    if config=="production":
        app.config.from_object(ProdConfig())
    elif config=="development":
        app.config.from_object(DevConfig())
    else:
        app.logger.info("FLASK_ENV is NUL!!!");
        
    db.init_app(app)
    session.init_app(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    
    from .models import User
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    csrf = CSRFProtect(app)
    csrf.init_app(app)


    # blueprint for non-auth routes of app
    from .routes.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # blueprint for auth routes in our app
    from .routes.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    
    # blueprint for data_table routes in our app
    from .routes.data_table import instruction_logs as instruction_logs_blueprint
    app.register_blueprint(instruction_logs_blueprint)
    
    #blueprint for profile route in our app
    from .routes.profile import profile as profile_blueprint
    app.register_blueprint(profile_blueprint)
    
    return app
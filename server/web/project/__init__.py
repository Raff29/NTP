from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from .config import DevConfig,ProdConfig
import os

db = SQLAlchemy()
session = Session()

def create_app():
    app = Flask(__name__)
    config=os.environ.get('FLASK_ENV')
    app.config.from_object(DevConfig)
    if config=="production":
        app.config.from_object(ProdConfig())
    elif config=="development":
        app.config.from_object(DevConfig())
    else:
        app.logger.info("FLASK_ENV is NUL!!!");
        
    db.init_app(app)
    session.init_app(app)
    
    # blueprint for non-auth routes of app
    from .routes.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # blueprint for auth routes in our app
    from .routes.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    
    # blueprint for upload routes in our app
    from .routes.upload import upload as upload_blueprint
    app.register_blueprint(upload_blueprint)
    
    from .routes.data_table import instruction_logs as instruction_logs_blueprint
    app.register_blueprint(instruction_logs_blueprint)
    
    return app
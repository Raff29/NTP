import os
import redis
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    ROOT_PATH = basedir
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE='redis'
    SESSION_KEY_PREFIX = "flask_"
    PERMANENT_SESSION_LIFETIME= timedelta(days=1)
    SESSION_PERMANENT=False
    SESSION_USE_SIGNER=True
    SESSION_REDIS = redis.from_url(f"{os.environ.get('REDIS_URL')}")
    UPLOAD_FOLDER = os.path.join(basedir,'./..', 'uploads')
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'musicxml', 'mlx'}
    
class ProdConfig(Config):
    DEBUG = False
    TESTING = False
    LOGIN_DISABLED = False
class DevConfig(Config):
    DEBUG = True
    TESTING = True
    LOGIN_DISABLED = False 
    
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test.db')
    SESSION_TYPE = 'filesystem'
    WTF_CSRF_ENABLED = False
    LOGIN_DISABLED = True
    SERVER_NAME = 'localhost:5000'  # Add this line
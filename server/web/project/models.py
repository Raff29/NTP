from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from . import db

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def set_password(self, password):
        self.password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=20)
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
      
    def __repr__(self):
        return f"<User {self.email}>"

    class InstructionLog(db.Model):
        __tablename__ = 'instruction_logs'
        id = db.Column(db.Integer, primary_key=True)
        instructions = db.Column(db.String(100), nullable=False)
        user_email = db.Column(db.String(100), db.ForeignKey('users.email'), nullable=False)
        timestamp = db.Column(db.DateTime, default=datetime.utcnow)

        def __repr__(self):
            return f"<InstructionLog {self.id}>"
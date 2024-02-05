from ..models import User, InstructionLog
from .. import db

def create_user(email, password):
    user = db.session.query(User).filter_by(email=email).first()
    if user:
        return None, 'Email address already exists'
    
    new_user = User(email=email, password=password)
    new_user.set_password(password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return new_user, None
  
def authenticate_user(email, password):
  user = db.session.query(User).filter_by(email=email).first()
  
  if not user or not user.check_password(password):
    return None, 'Invalid email or password'
  
  return user, None
from flask import Blueprint,  jsonify, request
from flask_login import login_required, current_user
from ..models import User
from .. import db

profile = Blueprint('profile', __name__)

@profile.route('/profile', methods=['GET'])
@login_required
def get_profile():
  user = User.query.filter_by(id=current_user.id).first()
  if not user:
    return jsonify({'error': 'Profile not found'}), 404
  
  return jsonify(user.to_dict()), 200

@profile.route('/profile/update/<int:id>', methods=['PATCH'])
@login_required
def update_profile(id):
  data = request.get_json()
  
  user = User.query.get(id)
  if not user:
    return jsonify({'error': 'Profile not found'}), 404

  user.name = data.get('name', user.name)
  user.email = data.get('email', user.email)
  user.password = data.get('password', user.password)
  
  db.session.commit()

  return jsonify(user.to_dict()), 200
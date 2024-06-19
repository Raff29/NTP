from flask import Blueprint,  jsonify
from flask_login import login_required, current_user
from ..models import User

profile = Blueprint('profile', __name__)

@profile.route('/profile', methods=['GET'])
@login_required
def get_profile():
  user = User.query.filter_by(id=current_user.id).first()
  if not user:
    return jsonify({'error': 'Profile not found'}), 404
  
  return jsonify(user.to_dict()), 200

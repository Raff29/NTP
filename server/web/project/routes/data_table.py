from flask import Blueprint, jsonify, request
from ..models import InstructionLog
from .auth import login_required
from .. import db

instruction_logs = Blueprint('instruction_logs', __name__)


@instruction_logs.route('/instruction_logs/user/<int:user_id>', methods=['GET'])
@login_required
def get_instruction_logs(user_id):
    instruction_logs = InstructionLog.query.filter_by(user_id=user_id).all()
    if not instruction_logs:
        return jsonify({'error': 'Instruction logs not found'}), 404
    return jsonify([instruction_log.to_dict() for instruction_log in instruction_logs]), 200


@instruction_logs.route('/instruction_logs', methods=['POST'])
@login_required
def create_instruction_logs():
    data = request.get_json()

    required_fields = ['user_id', 'filename', 'instruction']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    if not isinstance(data['user_id'], int) or not isinstance(data['filename'], str) or not isinstance(data['instruction'], str):
        return jsonify({'error': 'Invalid data type'}), 400

    new_instruction_log = InstructionLog(
        user_id=data['user_id'],
        filename=data['filename'],
        instruction=data['instruction'],
        is_archived=False
    )

    db.session.add(new_instruction_log)
    db.session.commit()

    return jsonify(new_instruction_log.to_dict()), 201


@instruction_logs.route('/instruction_logs/<int:id>', methods=['PUT'])
@login_required
def update_instruction_logs(id):
    data = request.get_json()

    updated_instruction_log = InstructionLog.query.get(id)
    if not updated_instruction_log:
        return jsonify({'error': 'Instruction log not found'}), 404

    if data['filename'] == update_instruction_logs.filename and data['instruction'] == update_instruction_logs.instruction:
        return jsonify({'messange': 'No changes detected'}), 200

    updated_instruction_log.filename = data['filename']
    updated_instruction_log.instruction = data['instruction']

    db.session.commit()

    return jsonify(updated_instruction_log.to_dict()), 200


@instruction_logs.route('/instruction_logs/<int:id>/archive', methods=['POST'])
@login_required
def archive_instruction_logs(id):
    instruction_log = InstructionLog.query.get(id)
    if instruction_log is None:
        return jsonify({'error': 'Instruction log not found'}), 404

    instruction_log.is_archived = True
    db.session.commit()

    return jsonify(instruction_log.to_dict()), 200

# DELETE operation (admin only)


@instruction_logs.route('/instruction_logs/<user:id>/<int:id>', methods=['DELETE'])
@login_required
def delete_instruction_logs(user_id, id):
    data = request.get_json()
    if not data['is_admin']:
        return jsonify({'error': 'Unauthorized Unauthorized'}), 401

    instruction_log = InstructionLog.query.filter_by(
        user_id=user_id, id=id).first()

    db.session.delete(instruction_log)
    db.session.commit()

    return jsonify({'message': 'InstructionLog deleted'}), 200

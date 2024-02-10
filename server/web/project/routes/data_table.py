import os
from flask import Blueprint, jsonify, request, current_app, current_user
from project.services.instruction_service import sheet_music_to_instructions, allowed_file
from werkzeug.utils import secure_filename
from ..models import InstructionLog
from .auth import login_required
from .. import db

instruction_logs = Blueprint('instruction_logs', __name__)


def admin_required(f):
    def decorated_function(*args, **kwards):
        if not current_user.isadmin:
            return jsonify({'message': 'Admin privileges required'}), 403
        return f(*args, **kwards)
    return decorated_function


@instruction_logs.route('/instruction_logs/<int:user_id>', methods=['GET'])
@login_required
def get_instruction_logs(user_id):
    instruction_logs = InstructionLog.query.filter_by(user_id=user_id).all()
    if not instruction_logs:
        return jsonify({'error': 'Instruction logs not found'}), 404
    return jsonify([instruction_log.to_dict() for instruction_log in instruction_logs]), 200


@instruction_logs.route('/instruction_logs/<int:user_id', methods=['POST'])
@login_required
def create_instruction_logs():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        instructions = sheet_music_to_instructions(filepath)

        new_instruction_log = InstructionLog(
            user_id=request.form['user_id'],
            filename=filename,
            instructions=instructions,
            is_archived=False
        )

        db.session.add(new_instruction_log)
        db.session.commit()

        return jsonify(new_instruction_log.to_dict()), 201

    return jsonify({'error': 'Invalid file type'}), 400


@instruction_logs.route('/instruction_logs/update/<int:id>', methods=['PUT'])
@login_required
def update_instruction_logs(id):
    data = request.get_json()

    updated_instruction_log = db.session.get(InstructionLog, id)
    if not updated_instruction_log:
        return jsonify({'error': 'Instruction log not found'}), 404

    if data['filename'] == updated_instruction_log.filename and data['instructions'] == updated_instruction_log.instructions:
        return jsonify({'messange': 'No changes detected'}), 200

    updated_instruction_log.filename = data['filename']
    updated_instruction_log.instructions = data['instructions']

    db.session.commit()

    return jsonify(updated_instruction_log.to_dict()), 200


@instruction_logs.route('/instruction_logs/archive/<int:id>', methods=['POST'])
@login_required
def archive_instruction_logs(id):
    instruction_log = db.session.get(InstructionLog, id)
    if instruction_log is None:
        return jsonify({'error': 'Instruction log not found'}), 404

    instruction_log.is_archived = True
    db.session.commit()

    return jsonify(instruction_log.to_dict()), 200

# DELETE operation (admin only)


@instruction_logs.route('/instruction_logs/delete/<int:user_id>/<int:id>', methods=['DELETE'])
@login_required
@admin_required
def delete_instruction_logs(user_id, id):
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized Unauthorized'}), 401

    instruction_log = InstructionLog.query.get(id)

    if instruction_log is None or instruction_log.user_id != user_id:
        return jsonify({'message': 'Instruction log not found'}), 404

    db.session.delete(instruction_log)
    db.session.commit()

    return jsonify({'message': 'InstructionLog deleted'}), 200

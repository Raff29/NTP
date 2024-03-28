import os
from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from project.services.instruction_service import sheet_music_to_instructions, allowed_file
from werkzeug.utils import secure_filename
from ..models import InstructionLog
from .. import db

instruction_logs = Blueprint('instruction_logs', __name__)


@instruction_logs.route('/instruction_logs', methods=['GET'])
@login_required
def get_instruction_logs():
    instruction_logs = InstructionLog.query.filter_by(user_id=current_user.id).all()
    if not instruction_logs:
        return jsonify({'error': 'Instruction logs not found'}), 404
    return jsonify([instruction_log.to_dict() for instruction_log in instruction_logs]), 200


@instruction_logs.route('/instruction_logs', methods=['POST'])
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
            user_id=current_user.id,
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
@instruction_logs.route('/instruction_logs/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_instruction_logs(id):
    if not current_user.is_authenticated:
        return jsonify({'error': 'Unauthorized Unauthorized'}), 401
    
    data = request.get_json()
    if not data['is_admin']:
        return jsonify({'error': 'Unauthorized Unauthorized'}), 401

    instruction_log = InstructionLog.query.filter_by(
        user_id=current_user.id, id=id).first()

    db.session.delete(instruction_log)
    db.session.commit()

    return jsonify({'message': 'InstructionLog deleted'}), 200

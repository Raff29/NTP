import pytest
from flask import url_for
from project.models import InstructionLog


class TestDataTableRoutes:
    def test_get_instruction_logs(self, test_client, test_database):
        user_id = 1
        instruction_log = InstructionLog(
            user_id=user_id,
            filename="test.txt",
            instructions="Test instruction",
            is_archived=False,
        )
        test_database.session.add(instruction_log)
        test_database.session.commit()

        response = test_client.get(
            url_for("instruction_logs.get_instruction_logs", user_id=user_id)
        )

        assert response.status_code == 200
        assert len(response.get_json()) == 1

    def test_create_instruction_logs(self, test_client):
        data = {
            "filename": "test.txt",
            "instructions": "Test instruction",
            "user_id": 1,
            "is_archived": False,
        }

        response = test_client.post(
            url_for("instruction_logs.create_instruction_logs"), json=data
        )

        assert response.status_code == 201
        assert response.json["filename"] == "test.txt"
        assert response.json["instructions"] == "Test instruction"
        assert response.json["user_id"] == 1
        assert response.json["is_archived"] == False

    def test_update_instruction_logs(self, test_client, test_database):
        original_instruction_log = InstructionLog(
            filename="test.txt",
            instructions="Test instruction",
            user_id=1,
            is_archived=False,
        )
        test_database.session.add(original_instruction_log)
        test_database.session.commit()

        updated_data = {
            "filename": "updated.txt",
            "instructions": "Updated instruction",
        }

        response = test_client.put(
            url_for(
                "instruction_logs.update_instruction_logs",
                id=original_instruction_log.id,
            ),
            json=updated_data,
        )

        assert response.status_code == 200

        updated_instruction_log = test_database.session.get(
            InstructionLog, original_instruction_log.id
        )
        assert updated_instruction_log.filename == updated_data["filename"]
        assert updated_instruction_log.instructions == updated_data["instructions"]

    def test_archive_instruction_logs(self, test_client, test_database):
        instruction_log = InstructionLog(
            user_id=1,
            filename="test.txt",
            instructions="Test instruction",
            is_archived=False,
        )
        test_database.session.add(instruction_log)
        test_database.session.commit()

        response = test_client.post(
            url_for("instruction_logs.archive_instruction_logs",
                    id=instruction_log.id)
        )

        assert response.status_code == 200
        assert response.get_json()["is_archived"] == True

    def test_delete_instruction_logs(self, test_client, test_database):
        instruction_log = InstructionLog(
            user_id=1,
            filename="test.txt",
            instructions="Test instruction",
            is_archived=False,
        )
        test_database.session.add(instruction_log)
        test_database.session.commit()

        response = test_client.delete(
            url_for(
                "instruction_logs.delete_instruction_logs",
                user_id=1,
                id=instruction_log.id,
            ),
            json={"is_admin": True},
        )

        assert response.status_code == 200

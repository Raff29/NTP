from flask import url_for
from project.models import User


class TestAuth:
    def test_register_get(self, test_client):
        response = test_client.get(url_for('auth.register'))
        assert response.status_code == 200

    def test_register_post(self, test_client, test_db_session):
        response = test_client.post(url_for('auth.register'), data={
            'email': 'test@example.com',
            'password': 'password123',
            'confirm_password': 'password123'
        })
        assert response.status_code == 302

    def test_login_post(self, test_client, test_db_session):
        user = User(email='test@example.com', password='password123')
        test_db_session.add(user)
        test_db_session.commit()

        response = test_client.post(url_for('auth.login'), data={
            'email': 'test@example.com',
            'password': 'password123'
        })
        assert response.status_code == 302
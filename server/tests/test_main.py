import pytest
from flask import url_for
from project.models import User


class TestMainRoutes:
    def test_index(self, test_client):
        response = test_client.get(url_for('main.index'))
        assert response.status_code == 200

    def test_dashboard(self, test_client, test_db_session):
        user = User(email='test@example.com', password='password123')
        test_db_session.add(user)
        test_db_session.commit()

        response = test_client.post(url_for('auth.login'), data={
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 302

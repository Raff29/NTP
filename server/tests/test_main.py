import pytest
from flask import url_for

class TestMainRoutes:
    def test_index(self, test_client):
        response = test_client.get(url_for('main.index'))
        assert response.status_code == 200

    def test_dashboard(self, test_client):
        response = test_client.get(url_for('main.dashboard'))
        assert response.status_code == 200
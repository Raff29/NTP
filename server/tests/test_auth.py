from flask import url_for

class TestAuth:
  def test_register_get(self, test_client):
    response = test_client.get(url_for('auth.register'))
    assert response.status_code == 200

  def test_register_post(self, test_client):
    response = test_client.post(url_for('auth.register_post'), data={
      'email': 'test@example.com',
      'password': 'password123'
    })
    assert response.status_code == 302

  def test_login_post(self, test_client):
    response = test_client.post(url_for('auth.login_post'), data={
      'email': 'test@example.com',
      'password': 'password123'
    })
    assert response.status_code == 302
    
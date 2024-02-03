import pytest
from flask import url_for
import io

class TestUploadRoutes:
    def test_upload_file(self, test_client):
        data = {
            'file': (io.BytesIO(b"abcdef"), 'test.jpg')
        }
        response = test_client.post(url_for('upload.upload_file'), data=data, content_type='multipart/form-data')
        assert response.status_code == 200
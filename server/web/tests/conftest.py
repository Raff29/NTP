import pytest
from project import create_app, db
from project.config import TestingConfig

@pytest.fixture(scope='module')
def test_app():
    app = create_app()
    app.config.from_object(TestingConfig)
    with app.app_context():
        yield app  # testing happens here

@pytest.fixture(scope='module')
def test_database(test_app):
    db.create_all()
    yield db  # testing happens here
    db.session.remove()
    db.drop_all()

@pytest.fixture(scope='module')
def test_client(test_app):
    return test_app.test_client()
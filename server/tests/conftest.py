import pytest
from project import create_app, db
from project.config import TestingConfig
from project.models import User



@pytest.fixture(scope='module')
def test_app():
    app = create_app()
    app.config.from_object(TestingConfig)
    with app.app_context():
        yield app

@pytest.fixture(scope='function')
def test_db(test_app):
    with test_app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()

@pytest.fixture(scope='function')
def test_db_session(test_db):
    db.session.begin_nested()
    yield db.session
    db.session.rollback()
    
@pytest.fixture(scope='function')
def test_client(test_app, test_db_session):
    with test_app.test_client() as test_client:
        with test_app.app_context():
            yield test_client
            
@pytest.fixture(scope='function')
def admin_user(test_db_session):
    admin_user = User(email='admin@example.com', password='password123', is_admin=True)
    test_db_session.add(admin_user)
    test_db_session.commit()
    return admin_user

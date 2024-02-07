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


@pytest.fixture(scope='module')
def test_database(test_app):
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()


@pytest.fixture(scope='module')
def test_client(test_app, test_database):
    with test_app.test_client() as test_client:
        with test_app.app_context():
            user = User(email='test@test.com', password='test', is_admin=True)
            test_database.session.add(user)
            test_database.session.commit()
            with test_client.session_transaction() as session:
                session['user_id'] = user.id
                session['_fresh'] = True
            yield test_client
    return test_app.test_client()

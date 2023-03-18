from flask import Flask
from flask_cors import CORS

from db import db
from routes import routes

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.register_blueprint(routes)
CORS(app)

# initialize the app with the extension
db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run()

import mimetypes
from datetime import datetime

import uuid as uuid

import filetype
from dotenv import dotenv_values
from flask import jsonify, make_response, request, Blueprint

import s3_upload
from db import db
from models import Event

routes = Blueprint('', __name__)
config = dotenv_values('.env')


@routes.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@routes.route('/about')
def about():
    about_json = {"Language": "Python", "Framework": "Flask", "Database": "Postgres", "Cloud": "AWS"}
    response = make_response(jsonify(about_json), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@routes.route('/events')
def events():
    events_models = db.session.execute(db.select(Event).order_by(Event.date)).scalars().all()
    return jsonify(events_models)


@routes.route('/events/', methods=["POST"])
def add_event():
    event_id = uuid.uuid4()
    if 'picture' in request.files:
        picture = request.files['picture']
        file_name = "" + str(event_id) + "." + filetype.get_type(picture.mimetype).extension
        s3_upload.upload_file_to_s3(picture, config["S3_BUCKET"], file_name, picture.mimetype)
    event = Event(
        id=str(event_id),
        name=request.form["name"],
        full_day=bool(request.form["fullDay"]),
        date=datetime.fromisoformat(request.form["date"]),
    )
    print(event)
    db.session.add(event)
    db.session.commit()

    return '200'

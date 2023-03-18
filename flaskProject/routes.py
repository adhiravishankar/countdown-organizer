from datetime import datetime

import uuid as uuid

import filetype
from dotenv import dotenv_values
from flask import jsonify, make_response, request, Blueprint

import s3_upload
from db import db
from models import Event
from route_helpers import add_event_to_db, patch_event_to_db

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
    json_event_models = []
    for event in events_models:
        json_event_models.append(event.to_dict())
    return json_event_models


@routes.route('/events/', methods=["POST"])
def add_event():
    event_id = uuid.uuid4()
    if 'picture' in request.files:
        picture = request.files['picture']
        file_name = "" + str(event_id) + "." + filetype.get_type(picture.mimetype).extension
        s3_upload.upload_file_to_s3(picture, config["S3_BUCKET"], file_name, picture.mimetype)
        picture_url = config['S3_BUCKET_URL'] + file_name + ""
        add_event_to_db(event_id, request, picture_url, db)
    else:
        add_event_to_db(event_id, request, '', db)
    return str(event_id)


@routes.route('/events/<event>')
def get_event(event: str):
    event_model = Event.query.get(event)
    return jsonify(event_model.to_dict())


@routes.route('/events/<event>', methods=["PATCH"])
def patch_event(event: str):
    event_model = Event.query.get_or_404(event)
    if 'picture' in request.files:
        picture = request.files['picture']
        file_name = "" + str(event) + "." + filetype.get_type(picture.mimetype).extension
        s3_upload.upload_file_to_s3(picture, config["S3_BUCKET"], file_name, picture.mimetype)
        picture_url = config['S3_BUCKET_URL'] + file_name + ""
        patch_event_to_db(event_model, request, db, True, picture_url)
    else:
        patch_event_to_db(event_model, request, db, False, '')
    return 'success'


@routes.route('/events/<event>', methods=["DELETE"])
def delete_event(event: str):
    event_model = Event.query.get_or_404(event)
    db.session.delete(event_model)
    db.session.commit()
    return str(True)

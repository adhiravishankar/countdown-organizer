from datetime import datetime

from models import Event


def add_event_to_db(event_id, request_body, picture_url, db):
    event = Event(
        id=str(event_id),
        name=request_body.form["name"],
        full_day=bool(request_body.form["fullDay"]),
        date=datetime.fromisoformat(request_body.form["date"]),
        picture=picture_url,
    )
    db.session.add(event)
    db.session.commit()


def patch_event_to_db(event_model, request_body, db, should_patch_picture, picture_url):
    event_model.name = request_body.form["name"]
    event_model.full_day = bool(request_body.form["fullDay"])
    event_model.date = datetime.fromisoformat(request_body.form["date"])
    if should_patch_picture:
        event_model.picture = picture_url

    db.session.add(event_model)
    db.session.commit()

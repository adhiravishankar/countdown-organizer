from datetime import datetime

import uuid
import json

from db import db


class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.String, primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    name = db.Column(db.String)
    date = db.Column(db.DateTime)
    picture = db.Column(db.String)
    full_day = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': datetime.isoformat(self.date),
            'picture': str(self.picture or ''),
            'fullDay': str(self.full_day)
        }

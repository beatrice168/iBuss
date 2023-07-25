import pickle
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PickleType
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Bus(db.Model,SerializerMixin):
    __tablename__ = 'buses'

    serialize_rules = ('-bookings.buses',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    seats = db.Column(db.Integer)
    route = db.Column(db.String)
    availability = db.Column(db.String)
    departure = db.Column(db.String)
    cost = db.Column(db.Integer)
    bookings = db.relationship('Booking', backref='bus')


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-bookings.users',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    password = db.Column(db.PickleType)
    role = db.Column(db.String)
    bookings = db.relationship('Booking', backref='user')
    
class Booking(db.Model,SerializerMixin):
    __tablename__ = 'bookings'
    serialize_rules = ('-buses.bookings', '-users.bookings',)

    id = db.Column(db.Integer, primary_key=True)
    seatnumber = db.Column(db.Integer)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))



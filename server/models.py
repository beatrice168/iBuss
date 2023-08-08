import pickle
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PickleType
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import MetaData
from flask import Flask
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


# from app import app
convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy( metadata=metadata)

# db = SQLAlchemy()
ma = Marshmallow()


class Bus(db.Model,SerializerMixin):
    __tablename__ = 'buses'

    serialize_rules = ('-bookings.buses',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    seats = db.Column(db.Integer)
    From = db.Column(db.String)
    To = db.Column(db.String)
    availability = db.Column(db.String)
    departure = db.Column(db.String)
    cost = db.Column(db.Integer)
    bookings = db.relationship('Booking', backref='bus')
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))
    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "seats":self.seats,
            "From":self.From,
            "To":self.To,
            "availability":self.availability,
            "departure":self.departure,
            "cost":self.cost,
            # "image":self.image,
        }

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-bookings.users',)

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    _password_hash = db.Column(db.String)
    company=db.Column(db.String)
    role = db.Column(db.String)
    bookings = db.relationship('Booking', backref='user')
    def to_dict(self):
        return {
            "id":self.id,
            "email":self.email,
            "_password_hash":self._password_hash,
            "role":self.role,
        }
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
   
    
class Booking(db.Model,SerializerMixin):
    __tablename__ = 'bookings'
    serialize_rules = ('-buses.bookings', '-users.bookings',)

    id = db.Column(db.Integer, primary_key=True)
    seatnumber = db.Column(db.Integer)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    payments=db.relationship('Payments',backref='booking',uselist=False)

    def to_dict(self):
        return {
            "id":self.id,
            "seatnumber":self.seatnumber,
            "bus_id":self.bus_id,
            "user_id":self.user_id,
        }

class Payments(db.Model,SerializerMixin):
    __tablename__ = 'payments'
    
    id=db.Column(db.Integer,primary_key=True)
    total_amount=db.Column(db.Integer)
    id_number=db.Column(db.Integer)
    full_name=db.Column(db.String)
    nationality=db.Column(db.String)
    phoneNumber=db.Column(db.Integer)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    booking_id=db.Column(db.Integer,db.ForeignKey('bookings.id'))

class Uploads(db.Model,SerializerMixin):
    __tablename__ = 'uploads'
    
    id=db.Column(db.Integer,primary_key=True)
    image = db.Column(db.Text)
    visits = db.Column(db.Integer) 
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.id'))

class Company(db.Model, SerializerMixin):
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    password_hash = db.Column(db.String)
    buses = db.relationship('Bus', backref='company')
   
    
    # Set the password using a method
    def set_password(self, password):
        self.password = password  # Store the plain password
        self.password_hash = bcrypt.generate_password_hash(password.encode("utf-8")).decode("utf-8")

    # Check the password using a method
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode("utf-8"))
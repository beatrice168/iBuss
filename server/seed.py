import random
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Booking, Bus, Payments, Uploads

fake = Faker()

with app.app_context():
    User.query.delete()
    Bus.query.delete()
    Booking.query.delete()

    
    availability = ['True', 'False']
    From = ['nrb', 'nrb', 'eld', 'entebbe', 'kigali']
    To=['msa','ksm','msa',"dar",'kampala']
    buses = []
    for n in range(30):
        b = Bus(name=fake.name(),
                seats=random.randint(1,40),
                cost=random.randint(1000,2000),
                From=rc(From),
                To=rc(To),
                departure=fake.time(),
                availability=rc(availability))
        buses.append(b)
    db.session.add_all(buses)

    roles = ['admin', 'customer']
    company = ['mash', 'ena']

    users = []
    for n in range(30):
        u = User(email=fake.email(),
                 _password_hash=fake.password(),
                 company=rc(company),
                 role=rc(roles))
        users.append(u)

    db.session.add_all(users)
    id_number = [12333544, 2324234242,13522525,1354552,5552652452,535375566]
    phone_number = [254706314418, 254721642249,254717200264]

    payments = []
    for n in range(30):
        p = Payments(total_amount=random.randint(1500,2000),
                  id_number=rc(id_number),
                  phone_number=rc(phone_number),
                  user_id=random.randint(1,30),
                  booking_id=random.randint(1,30))
        payments.append(p)

    db.session.add_all(payments)

    bookings = []
    for n in range(30):
        bk = Booking(seatnumber=random.randint(1,40),
                    bus_id=random.randint(1,30),
                    user_id=random.randint(1,30))
        bookings.append(bk)
    db.session.add_all(bookings)

    upload = []
    for n in range(30):
        u = Uploads(image=random.randint(1, 10), 
                    visits=random.randint(1,30),
                    bus_id=random.randint(1, 30),)
        upload.append(u)
    db.session.add_all(upload)
    db.session.commit()



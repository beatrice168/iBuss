import random
from werkzeug.security import generate_password_hash
from faker import Faker
from app import app
from models import db, User, Booking, Bus, Payments, Uploads, Company

fake = Faker()

with app.app_context():
    User.query.delete()
    Bus.query.delete()
    Booking.query.delete()
    Company.query.delete()

    availability = ['True', 'False']
    From = ["Bumala", "Kericho", "Homabay", "Bungoma", "Nairobi", "Sirare", "Bondo", "Malaba", "Bomet", "Awendo", "Kapsabet", "Kisumu", "Kaimosi", "Mbita", "Eldoret", "Ndori", "Kitale", "Kisii", "Kampala", "Mumias", "Webuye", "Usenge", "Ugunja", "Kakamega", "Madrid", "Kimill", "Siaya", "Moisbridge", "Nakuru", "Keroka", "Migori", "Mbale", "Narok", "Kendubay", "Maseno", "Oyugis", "Rongo", "Busia"]
    To = ["Bumala", "Kericho", "Homabay", "Bungoma", "Nairobi", "Sirare", "Bondo", "Malaba", "Bomet", "Awendo", "Kapsabet", "Kisumu", "Kaimosi", "Mbita", "Eldoret", "Ndori", "Kitale", "Kisii", "Kampala", "Mumias", "Webuye", "Usenge", "Ugunja", "Kakamega", "Madrid", "Kimill", "Siaya", "Moisbridge", "Nakuru", "Keroka", "Migori", "Mbale", "Narok", "Kendubay", "Maseno", "Oyugis", "Rongo", "Busia"]
    buses = []
    for n in range(30):
        b = Bus(name=fake.name(),
                seats=random.randint(1, 40),
                cost=random.randint(1000, 2000),
                From=random.choice(From),
                To=random.choice(To),
                departure=fake.time(),
                availability=random.choice(availability),
                company_id=random.randint(1, 5))

        buses.append(b)
    db.session.add_all(buses)

    roles = ['admin', 'customer']

    users = []
    for n in range(30):
        password = fake.password(length=random.randint(7, 8))
        u = User(email=fake.email(),
                 password=password,
                 _password_hash=generate_password_hash(password),
                 role=random.choice(roles))
        users.append(u)

    db.session.add_all(users)
    id_number = [12333544, 2324234242, 13522525, 1354552, 5552652452, 535375566]
    phoneNumber = [254706314418, 254721642249, 254717200264]
    national = ['kenya', 'tanzania', 'Uganda']

    payments = []
    for n in range(30):
        p = Payments(total_amount=random.randint(1500, 2000),
                     id_number=random.choice(id_number),
                     phoneNumber=random.choice(phoneNumber),
                     nationality=random.choice(national),
                     full_name=fake.name(),
                     user_id=random.randint(1, 30),
                     booking_id=random.randint(1, 30))
        payments.append(p)

    db.session.add_all(payments)

    bookings = []
    for n in range(30):
        bk = Booking(seatnumber=random.randint(1, 40),
                     bus_id=random.randint(1, 30),
                     user_id=random.randint(1, 30))
        bookings.append(bk)
    db.session.add_all(bookings)

    upload = []
    for n in range(30):
        u = Uploads(image=random.randint(1, 10),
                    visits=random.randint(1, 30),
                    bus_id=random.randint(1, 30))
        upload.append(u)
    db.session.add_all(upload)
    db.session.commit()

    names = ['Tahmeed','Ena', 'Guardian', 'Easycoach','Mbukinya']
    companies = []
    for i in range(1, 5):
        password = fake.password(length=random.randint(7, 8))
        c = Company(email=fake.email(),
                    name=random.choice(names),
                    password=password,
                    password_hash=generate_password_hash(password),)
        companies.append(c)
    db.session.add_all(companies)
    db.session.commit()

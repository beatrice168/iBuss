import os
from flask import Flask, jsonify, request, make_response, render_template,request
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
from models import db, Bus, User, Booking, Uploads,Payments, Company
import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
import jwt
from PIL import Image
import cloudinary
import cloudinary.uploader
from flask_mail import Mail, Message
from requests.auth import HTTPBasicAuth
import base64
import requests
from datetime import datetime
import smtplib
# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

CORS(app)
load_dotenv()

migrate = Migrate(app, db)
secret=app.config["SECRET_KEY"] =b"b\xfe5'\x02\xc5\x9c\xa7\x8d\x96\xcf\xf0)\x05h\t"
app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///buses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

db.init_app(app)
api= Api(app)

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

cloudinary.config(
    cloud_name=('buscommute'),
    api_key=('776315843379566'),
    api_secret=('JgpHnxKpPzhQohA-VqDoDR8v2sg')
)




app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'helgapaul389@gmail.com'
app.config['MAIL_PASSWORD'] = 'eocectdkjtieaasu'
app.config['MAIL_USE_SSL'] = False


mail = Mail(app)

def send_welcome_email(recipient_email):
    try:
        msg = Message(subject='Welcome to our Bus Booking Website', sender='noreply@demo.com', recipients=[recipient_email])
        msg.body = 'Dear user, welcome to our bus booking website! We are excited to have you on board.'

        mail.send(msg)
    except Exception as e:
        print('Error sending welcome email:', str(e))


class EmailResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('recipient', type=str, required=True)
        parser.add_argument('subject', type=str, required=True)
        parser.add_argument('message', type=str, required=True)
        args = parser.parse_args()

        recipient = args['recipient']
        subject = args['subject']
        message = args['message']

        try:
            msg = Message(subject=subject, sender='noreply@demo.com', recipients=[recipient])
            msg.body = message

            mail.send(msg)
            return {'message': 'Email sent successfully'}, 200
        except smtplib.SMTPException as e:
            return {'error': 'Failed to send email: {}'.format(str(e))}, 500
        except Exception as e:
            return {'error': 'An unexpected error occurred: {}'.format(str(e))}, 500

api.add_resource(EmailResource, '/email')

# class Index(Resource):
#     def get(self):
#         response_dict={
#             "index":
#             "Welcome to I-Bus API"
#         }
#         response = make_response(
#            jsonify(response_dict),
#            200,
#         )
#         return response
# api.add_resource(Index, '/')
# users = {
#     "user1": ("password1", 1),
#     "user2": ("password2", 2),
# }     
class SignUp(Resource):
    def post(self):
        data = request.get_json()

        password = data.get("password")
        email = data.get("email")
        company = data.get("company")
        role = data.get("role")

        user = User(
            email=email,
            company=company,
            role=role
        )
        user.password_hash = password
        
        print("first")

        try:
            print("here")
            db.session.add(user)
            db.session.commit()


            print(user.to_dict())
            send_welcome_email(user.email)
            return make_response(jsonify(user.to_dict()), 201)
        except IntegrityError:
            print("no, here!")
            return {"error": "422 Unprocessable request"}, 422
api.add_resource(SignUp, "/signup")

class Signin(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter(User.email == email).first()
        if user:
            # return "user exist"
            if user.authenticate(password):
                payload = {
                    "user_id": user.id,
                    "email": user.email,
                    # "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # Token expiration time
                }
                token = jwt.encode(payload,secret, algorithm="HS256")
                print({"token":token})
                return {"token": token}
        return {"error": "Invalid details"}, 401

api.add_resource(Signin, "/signin")

my_endpoint = 'https://ab92-102-213-93-55.ngrok-free.app'
# @app.route('/')
# def index():
#     getAccessToken()
#     return 'hello its bitu'

@app.route('/pay',methods=['POST'])
def MpesaExpress():
    if request.method == 'POST':
        data = request.get_json()
        amount = data.get('amount')
        phoneNumber = data.get('phoneNumber')
        print(phoneNumber)

        # Safaricom M-Pesa API request
        endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        access_token = getAccessToken()  # Assuming you have this function implemented to get the access token
        headers = {"Authorization": "Bearer %s" % access_token}
        Timestamp = datetime.now()
        times = Timestamp.strftime("%Y%m%d%H%M%S")
        password_str = "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + times
        password_bytes = password_str.encode('utf-8')
        password = base64.b64encode(password_bytes).decode('utf-8')
        # password = hashlib.sha1(password_bytes).hexdigest()

    data = {
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": times,
        "TransactionType": "CustomerPayBillOnline",
        "PartyA": phoneNumber,
        "PartyB": "174379",
        "PhoneNumber":phoneNumber,
        "CallBackURL": my_endpoint + '/lnmo-callback',
        "AccountReference": "TestPay",
        "TransactionDesc": "HelloTest",
        "Amount": amount
    }
    res = requests.post(endpoint, json=data, headers=headers)
    print(res)
    response_json = res.json()

        # Store the payment details in the database
    full_name = data.get('full_Name')
    id_number = data.get('id_Number')
    nationality = data.get('nationality')
    payment = Payments(full_name=full_name, phoneNumber=phoneNumber, id_number=id_number, nationality=nationality)
    db.session.add(payment)
    db.session.commit()

    return jsonify(response_json), res.status_code
@app.route('/lnmo-callback', methods=['POST'])
def incoming():
    data = request.get_json()
    print(data)
    return 'ok'

def getAccessToken():
    consumer_key = "k32F8H8rh9CHOxGhuQCqqKALJRF1aAz0"
    consumer_secret = "FwyAyldHKLpzdKnH"
    endpoint = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    r = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    data = r.json()
    return data['access_token']



# class Protected(Resource):
#     @jwt_required()
#     def get(self):
#             # Retrieve the current user's ID from the token
#         current_user_id = get_jwt_identity()

#         # Implement the logic for the protected route here
#         # For example, you can access a specific user's data using the user ID
#         if current_user_id in [1, 2]:
#             # Dummy user data for demonstration
#             user_data = {
#                 "id": current_user_id,
#                 "username": f"user{current_user_id}",
#                 "email": f"user{current_user_id}@example.com",
#             }
#             return jsonify(user_data), 200
#         else:
#             return jsonify({"error": "Unauthorized"}), 403
        
# api.add_resource(Protected, '/Protected')



# @app.route("/upload", methods=['POST', 'OPTIONS'])
class Uploads(Resource):
    @cross_origin()
    def post(self):
        file_to_upload = request.files['file']
        app.logger.info('%s file_to_upload', file_to_upload)
        
        if file_to_upload:
            upload_result = cloudinary.uploader.upload(file_to_upload)
            app.logger.info(upload_result)
            return jsonify(upload_result)

api.add_resource(Uploads, "/upload")


class Buses(Resource):
    def get(self):
        buses_dict_list = [bus.to_dict() for bus in Bus.query.all()]
        response = make_response(
            jsonify(buses_dict_list),
                    200,
        )
        return response
    
    def post(self):
        form=request.get_json()
        new_bus = Bus(
            name=form["name"],
            seats=form["seats"],
            route=form["route"],
            availability=form["availability"],
            departure=form["departure"],
            cost=form["cost"],
        )
        db.session.add(new_bus)
        db.session.commit()

        return make_response(
            jsonify(new_bus.to_dict()),
            201,
        )
    
api.add_resource(Buses, '/buses')
class BusesByID(Resource):
    def get (self, id):
        response_dict = Bus.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
    
    def patch (self,id):
        bus= Bus.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(bus, attr, request.form[attr])

        db.session.add(bus)
        db.session.commit()

        response_dict = bus.to_dict()
        response = make_response(
            jsonify(response_dict),
            200
        )
        return response 
    def delete(self, id):
        bus = Bus.query.filter_by(id=id).first()
        db.session.delete(bus)
        db.session.commit()
        response_dict = "Bus deleted Successfull"
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

api.add_resource(BusesByID,"/buses/<int:id>")

class Users(Resource):
    def get (self):
        user_dict_list = [user.to_dict() for user in User.query.all()]
        response = make_response(
            jsonify(user_dict_list),
            200,
        )
        return response
    
    def post (self):
        form=request.get_json()
        new_user = User (
            name = form["name"],
            password = form["password"],
            role = form["role"],
        ) 
        db.session.add(new_user)
        db.session.commit()
        return make_response(
            jsonify(new_user.to_dict()),
            201,
        )     
api.add_resource(Users, '/users')

class UsersByID(Resource):
    def get (self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(user),
            200,
        )
        return response

    def patch (self, id):
        person = User.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(person, attr, request.form[attr])

        db.session.add(person)
        db.session.commit()
        person_dict = person.to_dict()
        response= make_response(
            jsonify(person_dict),
            200
        )
        return response
    
    def delete (self, id):
        users = User.query.filter_by(id=id).first()
        db.session.delete(users)
        db.session.commit()
        response_dict = "User deleted successfull"

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
api.add_resource(UsersByID, '/users/<int:id>')

class Bookings(Resource):
    def get(self):
        booking_dict_list = [booking.to_dict() for booking in Booking.query.all()]
        response = make_response(
            jsonify(booking_dict_list),
                    200,
        )
        return response
    
    def post(self):
        form=request.get_json()
        new_booking = Booking(
            seatnumber=form["seatnumber"],
            bus_id=form["bus_id"],
            user_id=form["user_id"],
        )
        db.session.add(new_booking)
        db.session.commit()

        return make_response(
            jsonify(new_booking.to_dict()),
            201,
        )
    
api.add_resource(Bookings, '/bookings')

class BookingsByID(Resource):
    def get (self, id):
        response_dict = Booking.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
    
    def patch (self,id):
        booking= Booking.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(booking, attr, request.form[attr])

        db.session.add(booking)
        db.session.commit()

        response_dict = booking.to_dict()
        response = make_response(
            jsonify(response_dict),
            200
        )
        return response 
    def delete(self, id):
        booking = Booking.query.filter_by(id=id).first()
        db.session.delete(booking)
        db.session.commit()
        response_dict = "Booking deleted Successfull"
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

api.add_resource(BookingsByID,"/bookings/<int:id>")


@app.route('/buses/company/<int:company_id>', methods=['GET'])
def get_buses_by_company_id(company_id):
    buses = Bus.query.filter_by(company_id=company_id).all()
    
    if not buses:
        return jsonify({'message': 'No buses for the specified company ID'}), 404
    
    buses_dict = [bus.to_dict() for bus in buses]
    return jsonify(buses_dict), 200



if __name__ == '__main__':
    app.run(port=5555,debug=True)
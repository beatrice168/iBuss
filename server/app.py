import os
from flask import Flask, jsonify, request, make_response, render_template,request
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
from models import db, Bus, User, Booking
import datetime
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
import jwt
from flask_mail import Mail, Message
from requests.auth import HTTPBasicAuth
import base64
import requests
from datetime import datetime
import smtplib




app = Flask(__name__)
CORS(app)
migrate = Migrate(app, db)
secret=app.config["SECRET_KEY"] =b"b\xfe5'\x02\xc5\x9c\xa7\x8d\x96\xcf\xf0)\x05h\t"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///buses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
db.init_app(app)
api= Api(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'helgapaul389@gmail.com'
app.config['MAIL_PASSWORD'] = 'eocectdkjtieaasu'
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)



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

class Index(Resource):
    def get(self):
        response_dict={
            "index":
            "Welcome to I-Bus API"
        }
        response = make_response(
           jsonify(response_dict),
           200,
        )
        return response
api.add_resource(Index, '/')
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
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # Token expiration time
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

@app.route('/pay')
def MpesaExpress():
    amount = request.args.get('amount')
    phoneNumber = request.args.get('phoneNumber')
    print(phoneNumber)
    endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    access_token = getAccessToken()
    headers = { "Authorization": "Bearer %s" % access_token }
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
    return res.json()

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


    



if __name__ == '__main__':
    app.run(port=5555,debug=True)
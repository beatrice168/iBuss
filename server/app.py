import os
from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Bus, User, Booking, Uploads
import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
import jwt

from PIL import Image
import cloudinary
import cloudinary.uploader



app = Flask(__name__)
CORS(app)
migrate = Migrate(app, db)
secret=app.config["SECRET_KEY"] =b"b\xfe5'\x02\xc5\x9c\xa7\x8d\x96\xcf\xf0)\x05h\t"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///buses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

db.init_app(app)
api= Api(app)

cloudinary.config(
    cloud_name=('buscommute'),
    api_key=('776315843379566'),
    api_secret=('JgpHnxKpPzhQohA-VqDoDR8v2sg')
)




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
        # the setter will encrypt this
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
class Upload(Resource):
    @cross_origin()
    def post(self):
        file_to_upload = request.files['file']
        app.logger.info('%s file_to_upload', file_to_upload)
        
        if file_to_upload:
            upload_result = cloudinary.uploader.upload(file_to_upload)
            app.logger.info(upload_result)
            return jsonify(upload_result)

api.add_resource(Upload, "/upload")


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
    app.run(port=5555)
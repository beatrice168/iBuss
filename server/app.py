import os
from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Bus, User, Booking
# from dotenv import load_dotenv
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
# import sendgrid
# from sendgrid.helpers.mail import Mail, Email, To, Content
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///buses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# app.config["JWT_SECRET_KEY"] = "em6k7SXz44ei3wbiQDMcMs1sKaq_dxeg_DghP_ZjAkk"
# jwt = JWTManager(app)
db.init_app(app)
api= Api(app)

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


    



if __name__ == '__main__':
    app.run(port=5555)
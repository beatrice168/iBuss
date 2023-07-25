import os
from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
# from flask_restful import Api, Resource
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



if __name__ == '__main__':
    app.run(port=5555)
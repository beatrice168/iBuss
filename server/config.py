from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
app = Flask(__name__)
app.config["SECRET_KEY"] =b"b\xfe5'\x02\xc5\x9c\xa7\x8d\x96\xcf\xf0)\x05h\t"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///buses.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
app.json.compact = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
db = SQLAlchemy()
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
db.init_app(app)
CORS(app)

api = Api(app)
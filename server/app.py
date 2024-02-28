#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
#I don't know if we need serializer mixin
from sqlalchemy_serializer import SerializerMixin

from models.models import *
from resources.resources import *




# Local imports
from config import app, db, api
# Add your model imports




@app.route('/')
def index():
    return '<h1>Project Server</h1>'




    



if __name__ == '__main__':
    app.run(port=5555, debug=True)


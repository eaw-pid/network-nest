#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
#I don't know if we need serializer mixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.exc import IntegrityError


# Local imports
from config import app, db, api
# Add your model imports

from models import *

# Views go here!

class CheckSession(Resource):
    def get(self):
        #grab the current user if session user_id exists
        id = session.get("user_id")
        if id:
            user = User.query.filter_by(id=id).first()
            return user.to_dict(), 200
        #return the current user if it exists
        #else return an empty response
        return {}, 200
        
class Signup(Resource):
    def post(self):
        #grab form data(json)
        data = request.get_json()
        username = data.get("username")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        #instantiate a new user object
        try:
            user = User(username=username, 
                        first_name=first_name, 
                        last_name=last_name, 
                        email=email)
            #encrypt user password
            user.password_hash=password
            #Set the session to the user id ** - front end needs to know the user data- need cookies to add state to an otherwise stateless browser
            #have to do this after commit b/c won't have user.id until after User has been created
            #for session to work you have to have a secret_key
            session["user_id"] = user.id
            #store user in db and set user_id
            db.session.add(user)
            db.session.commit()
   
    #Set the session to the user id **
        
    #return the user dictionary with a status of created
            return user.to_dict(), 201
        except IntegrityError:
            return {"error": "Username must be unique"}, 422
        except ValueError as err:
            return {"error": str(err)}, 422


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            del session["user_id"]
            return {"message": "You are not logged in"}, 200
        else:
            return {"error": "You are already logged out"}, 401

class Login(Resource):
    def post(self):
        #get json data
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        #first check if an account exists by username
        user = User.query.filter_by(username=username).first()
        #check if the user's password matches user acct
        #authenticate is process of validating the password - defined in User Model
        if user and user.authenticate(password):
        #login user if yes
            session["user_id"] = user.id
            #return user dictionary
            return user.to_dict(), 200
        #otherwise return an error saying Username and pw doesn't match
        else:
            return {"error": "username or password did not match"}, 422
        
api.add_resource(Signup, '/signup')
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/checksession')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/users', methods=["GET", "POST"])
def users():

    users = []
    for user in User.query.all():
        user_dict = user.to_dict()
        users.append(user_dict)
    
    response = make_response(users, 200)
    return response

@app.route('/users/<int:id>')
def user(id):
    user = User.query.filter_by(id=id).first()
    response = user.to_dict(), 200
    return response

@app.route('/employees')
def employees():

    employees = []
    for emp in Employee.query.all():
        emp_dict = emp.to_dict()
        employees.append(emp_dict)
    
    response = make_response(employees, 200)
    return response

@app.route('/companies')
def companies():

    companies = []
    for c in Company.query.all():
        c_dict = c.to_dict()
        companies.append(c_dict)
    
    response = make_response(companies, 200)
    return response

@app.route('/connections')
def connections():

    connections = []
    for c in Connection.query.all():
        c_dict = c.to_dict()
        connections.append(c_dict)
    
    response = make_response(connections, 200)
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)


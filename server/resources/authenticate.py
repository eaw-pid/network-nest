from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.user import User


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
            return {"error": "Invalid username and/or password"}, 422
        

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
        except IntegrityError:
            return {"error": "Email is invalid"}, 422
        except ValueError as err:
            return {"error": str(err)}, 422


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            del session["user_id"]
            return {"message": "You are not logged in"}, 200
        else:
            return {"error": "You are already logged out"}, 401


        
api.add_resource(Signup, '/signup')
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/checksession')
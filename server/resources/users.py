from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.user import User


class UsersResource(Resource):
    def get(self):

        users = []

        for user in User.query.all():
            user_dict = user.to_dict()
            users.append(user_dict)
    
        response = make_response(users, 200)
        return response

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        print(user)
        if user:
            response = user.to_dict(), 200
            return response
        return {"error": "User not found."}, 404
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
           form_data = request.get_json()
           for attr in form_data:
               setattr(user, attr, form_data.get(attr))

           db.session.add(user)
           db.session.commit()
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
        
            return {"message": "User deleted successfully"}, 200
        return {"message": "User not found"}, 404
        

api.add_resource(UsersResource, '/users')
api.add_resource(UserById, '/users/<int:id>')
from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.connection import Connection

class ConnectionsResource(Resource):
    def get(self):

        connections = []

        for connect in Connection.query.all():
            connect_dict = connect.to_dict()
            connections.append(connect_dict)
    
        response = make_response(connections, 200)
        return response

class ConnectionsById(Resource):
    def get(self, id):
        connection = Connection.query.filter_by(id=id).first()
        if connection:
            response = connection.to_dict(), 200
            return response
        return {"error": "Connection not found."}, 404
    
    def patch(self, id):
        connection = Connection.query.filter_by(id=id).first()
        if connection:
           form_data = request.get_json()
           for attr in form_data:
               setattr(connection, attr, form_data.get(attr))

           db.session.add(connections)
           db.session.commit()
    
    def delete(self, id):
        connection = Connection.query.filter_by(id=id).first()
        if connection:
            db.session.delete(connection)
            db.session.commit()
        
            return {"message": "User deleted successfully"}, 200
        return {"message": "User not found"}, 404
        

api.add_resource(ConnectionsResource, '/connections')
api.add_resource(ConnectionsById, '/connections/<int:id>')
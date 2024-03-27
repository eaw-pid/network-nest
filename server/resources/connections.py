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
    
    def post(self):

        data = request.get_json()
        user_id = data.get("user_id")
        employee_id = data.get("employee_id")
        action = data.get("action")
        notes=data.get("notes")

        try:
            newConnection = Connection(
                            user_id=user_id,
                            employee_id=employee_id,
                            action=action,
                            notes=notes
                            )

            db.session.add(newConnection)
            db.session.commit()

            return newConnection.to_dict(), 201
        except ValueError as err:
            return {"error": str(err)}, 422

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
           
            try: 
                form_data = request.get_json()
                for attr in form_data:
                    setattr(connection, attr, form_data.get(attr))

                db.session.add(connection)
                db.session.commit()

                return connection.to_dict(), 200
            
            except ValueError as err:
                return {"error": str(err)}, 422
        else:
            return {"message": "Connection not found"}, 200
    
    def delete(self, id):
        connection = Connection.query.filter_by(id=id).first()
        if connection:
            db.session.delete(connection)
            db.session.commit()
        
            return {"message": "Connection deleted successfully"}, 200
        return {"message": "Connection not found"}, 404
        

api.add_resource(ConnectionsResource, '/connections', endpoint="connections")
api.add_resource(ConnectionsById, '/connections/<int:id>', endpoint="connection")
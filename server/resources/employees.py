from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api

from models.employee import Employee

class EmployeeResource(Resource):

    def get(self):

        employees = []

        for employee in Employee.query.all():
            employee_dict = employee.to_dict()
            employees.append(employee_dict)
    
        response = make_response(employees, 200)
        return response
    
    def post(self):

        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        website = data.get("website")
        company_id=data.get("company_id")

        try:
            newEmployee = Employee(
                            name=name,
                            email=email,
                            website=website,
                            contacted=True,
                            company_id=company_id
                            )

            db.session.add(newEmployee)
            db.session.commit()

            return newEmployee.to_dict(), 201
        except ValueError as err:
            return {"error": str(err)}, 422
    
class EmployeeById(Resource):

    def get(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if employee:
            response = employee.to_dict(), 200
            return response
        return {"error": "Employee not found."}, 404
    
    def patch(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if employee:
           try: 
                form_data = request.get_json()
                for attr in form_data:
                    setattr(employee, attr, form_data.get(attr))

                db.session.add(employee)
                db.session.commit()

                return employee.to_dict(), 200
           except ValueError as err:
               return {"error": str(err)}, 422
        else:
            return {"message": "Employee not found"}, 400
    
    def delete(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if employee:
            db.session.delete(employee)
            db.session.commit()
        
            return {"message": "Employee deleted successfully"}, 200
        
        return {"message": "Employee not found"}, 404
        



api.add_resource(EmployeeResource, '/employees', endpoint="employees")
api.add_resource(EmployeeById, '/employees/<int:id>', endpoint="employee")
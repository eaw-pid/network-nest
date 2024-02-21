#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import *

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/users')
def users():

    users = []
    for user in User.query.all():
        user_dict = user.to_dict()
        users.append(user_dict)
    
    response = make_response(users, 200)
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



if __name__ == '__main__':
    app.run(port=5555, debug=True)


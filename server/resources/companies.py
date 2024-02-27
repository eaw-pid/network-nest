from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.company import Company

class CompanyResource(Resource):
    def get(self):

        companies = []

        for companies in Company.query.all():
            company_dict = company.to_dict()
            companies.append(company_dict)
    
        response = make_response(companies, 200)
        return response

class CompanyById(Resource):
    def get(self, id):
        company = Company.query.filter_by(id=id).first()
        if company:
            response = company.to_dict(), 200
            return response
        return {"error": "Company not found."}, 404
    
    def patch(self, id):
        company = Company.query.filter_by(id=id).first()
        if company:
           form_data = request.get_json()
           for attr in form_data:
               setattr(company, attr, form_data.get(attr))

           db.session.add(company)
           db.session.commit()
    
    def delete(self, id):
        company = Company.query.filter_by(id=id).first()
        if company:
            db.session.delete(company)
            db.session.commit()
        
            return {"message": "Company deleted successfully"}, 200
        
        return {"message": "Company not found"}, 404
        

api.add_resource(CompanyResource, '/companies')
api.add_resource(CompanyById, '/companies/<int:id>')
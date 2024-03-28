from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models.company import Company

class CompanyResource(Resource):
    def get(self):

        companies = []

        for company in Company.query.all():
            company_dict = company.to_dict()
            companies.append(company_dict)
    
        response = make_response(companies, 200)
        return response
    
    def post(self):

        data = request.get_json()
        name = data.get("name")
        address = data.get("address")
        website_url = data.get("website_url")

        try:
            newCompany = Company(
                            name=name,
                            address=address,
                            website_url=website_url,
                            )

            db.session.add(newCompany)
            db.session.commit()

            return newCompany.to_dict(), 201
        except IntegrityError:
            return {"error": "Company Name Already Exists"}, 422
        except ValueError as err:
            return {"error": str(err)}, 422


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
           try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(company, attr, form_data.get(attr))

                db.session.add(company)
                db.session.commit()

                return company.to_dict(), 200
           except ValueError as err:
                return {"error": str(err)}, 422
        else:
            return {"message": "Connection not found"}, 200
        
    def delete(self, id):
        company = Company.query.filter_by(id=id).first()
        if company:
            db.session.delete(company)
            db.session.commit()
            return {"message": "Company deleted successfully"}, 200
        
        return {"message": "Company not found"}, 404
        

api.add_resource(CompanyResource, '/companies', endpoint="companies")
api.add_resource(CompanyById, '/companies/<int:id>', endpoint="company")
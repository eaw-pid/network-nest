from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    # _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<{self.name}>'


class Company(db.Model, SerializerMixin):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    website_url = db.Column(db.String, nullable=False)

    #relationship mapping to view employees in the company
    employees = db.relationship('Employee', back_populates="company")
    
    def __repr__(self):
        return f'<{self.name}>'

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    contacted = db.Column(db.Boolean, nullable=False)
    #foreign key to store the Company id
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

    #relationship mapping to review the related company:
    company = db.relationship('Company', back_populates="employees")

    def __repr__(self):
        return f'<{self.name}>'
##add validations, including password_hash validations and bcrypt


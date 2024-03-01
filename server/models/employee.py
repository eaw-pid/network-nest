from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from .connection import *


from config import db, bcrypt

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"

    serialize_rules = (
                    #    '-company.employees',
                    #    '-company.address',
                    #    '-company.website_url',
                       '-company',
                       '-connections',
                       '-company.employees.connections',
                       '-users',)
##set contacted to False for default?
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    contacted = db.Column(db.Boolean, default=False, server_default="0", nullable=False)
    #foreign key to store the Company id
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

    #relationship mapping to review the related company:
    company = db.relationship('Company', back_populates="employees")
    connections = db.relationship('Connection', back_populates='employee')

    users = association_proxy('connections', 'user',
                                  creator=lambda user_obj: Connection(user=user_obj))
    
    #users - association proxy that goes through connections
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email not valid")
        return email
    
    def __repr__(self):
        return f'<{self.name}>'
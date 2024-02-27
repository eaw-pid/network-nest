from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


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
                       )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    contacted = db.Column(db.Boolean, nullable=False)
    #foreign key to store the Company id
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

    #relationship mapping to review the related company:
    company = db.relationship('Company', back_populates="employees")
    connections = db.relationship('Connection', back_populates='employee')
    
    def __repr__(self):
        return f'<{self.name}>'
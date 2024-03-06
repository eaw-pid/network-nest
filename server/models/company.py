from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

class Company(db.Model, SerializerMixin):
    __tablename__ = "companies"

    serialize_rules = ('-employees.company', 
                       '-employees.company_id', 
                       '-employees.connections',
                       '-employees.website',
                       )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False)
    website_url = db.Column(db.String, nullable=False)

    #relationship mapping to view employees in the company
    employees = db.relationship('Employee', back_populates="company")
    
    def __repr__(self):
        return f'<{self.name}>'
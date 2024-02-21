from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
##A User has many Connections
##A Connection belongs to a User
##Connections can belong to many Users
##A Company has many Employees
##An Employee belongs to a Company

##add validations, including password_hash validations and bcrypt

# connections = db.Table(
#     'connections',
#     metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     db.Column('connection_id', db.Integer, db.ForeignKey('connections.id'), primary_key=True)
# )
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

class Connection(db.Model, SerializerMixin):
    __tablename__ = 'connections'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    connection_date = db.Column(db.DateTime, server_default=db.func.now())
    action = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)


    # @validates("email")
    # def check_email(self, key, email):
    #     if '@' not in email:
    #         raise ValueError("Invalid email format.Email must contain '@' symbol.")
    #     return email
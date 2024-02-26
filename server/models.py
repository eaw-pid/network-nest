from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

# Models go here!
##A User has many Connections
##A Connection belongs to a User
##Connections can belong to many Users
##A Company has many Employees
##An Employee belongs to a Company


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-connections.user',
                       '-connections.employee.company.employees',
                       '-connections.employee.connections',
                       '-connections.employee.contacted',
                       '-connections.employee.email',
                       '-connections.employee_id',
                       '-connections.user_id')


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    #Had to add nullable=True for flask db upgrade to run - otherwise getting and error
    #Will probably have to change that at some point - columns were created without password before adding it
    #probably have to clear the table first?
    _password_hash = db.Column(db.String, nullable=False)

    connections = db.relationship('Connection', back_populates='user')

    #need hybrid property to define password_hash.setter
    @hybrid_property
    def password_hash(self):
        return AttributeError("Password hashes may not be viewed")

    #giving ability to say user.password_hash = "value"
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        #gives us a string of bytes
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8') #decoded to a string of characters for storing in db

    #returns True of False
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Failed email validation")
        return email

    def __repr__(self):
        return f'<{self.username}>'


class Company(db.Model, SerializerMixin):
    __tablename__ = "companies"

    serialize_rules = ('-employees.company', 
                       '-employees.company_id', 
                       '-employees.connections',
                       '-employees.website',
                       '-employees.contacted',
                       '-employees.email',)

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

    serialize_rules = ('-company.employees',
                       '-company.address',
                       '-company.website_url',
                       
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

class Connection(db.Model, SerializerMixin):
    __tablename__ = 'connections'

    serialize_rules = ('-user.connections',
                       '-user.first_name',
                       '-user.last_name', 
                       '-user.email'
                       '-employee_id',
                       '-user_id',
                       '-employee.connections',
                       '-employee.company',
                       '-employee.company_id',
                       '-employee.website',
                       
                       )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    connection_date = db.Column(db.DateTime, server_default=db.func.now())
    action = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)

    user = db.relationship('User', back_populates='connections')
    employee = db.relationship('Employee', back_populates='connections')

    #
    def __repr__(self):
        return f'<User ID: {self.user_id}, Employee ID: {self.employee_id}>'
    # @validates("email")
    # def check_email(self, key, email):
    #     if '@' not in email:
    #         raise ValueError("Invalid email format.Email must contain '@' symbol.")
    #     return email
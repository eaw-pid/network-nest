from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from .connection import *



from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-connections.user',
                       
                       '-connections.user_id'
                       '-employees',)
    


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
    #Association proxy to get employees for this user through Connections
    employees = association_proxy('connections', 'employee',
                                  creator=lambda employee_obj: Connection(employee=employee_obj))
    
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

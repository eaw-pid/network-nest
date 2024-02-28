from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

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
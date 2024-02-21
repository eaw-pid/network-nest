#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User, Company, Employee, Connection

if __name__ == "__main__":
    with app.app_context():
        ##Clear Existing Data
        db.session.query(User).delete()
        db.session.query(Company).delete()
        db.session.query(Employee).delete()
        db.session.query(Connection).delete()

    #Create users
        user1 = User(username = "Tester", first_name = "Bill", last_name = "Murray", email = "tester123@gmail.com")

        db.session.add(user1)
        db.session.commit()
    
    #Create companies
        apple = Company(name="Apple", address="One Apple Park Way, Cupertino, CA 95014", website_url="https://www.apple.com/careers/us/")
        oracle = Company(name="Oracle", address="2300 Oracle Way, Austin, TX 78741", website_url="https://www.oracle.com/careers/" )
        db.session.add_all([apple, oracle])
        db.session.commit()
    
    #Create employees
        jenny = Employee(name="Jenny", email="jenny@oracle.com", website="linkedin.com/in/jenny", contacted=True, company_id=2)
        tom = Employee(name="Tom", email="tom@oracle.com", website="linkedin.com/in/tom", contacted=True, company_id=2)
        db.session.add_all([jenny, tom])
        db.session.commit()

    #Create Connections
        c1 = Connection(user_id=1, employee_id=1, action="Email", notes="Sent email")
        db.session.add(c1)
        db.session.commit()

       
# fake = Faker

# def make_users():
#     User.query.delete()

#     users = []
#     for i in range(10):
#         u = User(username = fake.name(), email = fake.email())
#         users.append(u)
    
#     db.session.add_all(users)
#     db.session.commit()

# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         make_users()
#         # Seed code goes here!

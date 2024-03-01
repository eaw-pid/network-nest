#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models.models import *

if __name__ == "__main__":
    with app.app_context():
        ##Clear Existing Data
        db.session.query(User).delete()
        db.session.query(Company).delete()
        db.session.query(Employee).delete()
        db.session.query(Connection).delete()
        db.session.commit()
        # fake = Faker
    #Create users
        
        user1 = User(username = "BMurph", first_name = "Bill", last_name = "Murray", email = "tester123@gmail.com")
        user2 = User(username = "VCall", first_name = "Vincent", last_name = "Callahan", email = "vcallahan@gmail.com")
        user3  = User(username = "JBeck", first_name = "John", last_name = "Beck", email = "jbeck@gmail.com")
        user4 = User(username = "CStark", first_name = "Carmine", last_name = "Stark", email = "cstark@gmail.com")
        user1.password_hash = "Pass1"
        user2.password_hash = "Pass2"
        user3.password_hash = "Pass3"
        user4.password_hash = "Pass4"
        db.session.add_all([user1, user2, user3, user4])
        db.session.commit()
    
    #Create companies
        apple = Company(name="Apple", address="One Apple Park Way, Cupertino, CA 95014", website_url="https://www.apple.com/careers/us/")
        oracle = Company(name="Oracle", address="2300 Oracle Way, Austin, TX 78741", website_url="https://www.oracle.com/careers/" )
        car_gurus = Company(name="Car Gurus", address="Boston, MA", website_url="	https://careers.cargurus.com/")
        task_rabbit = Company(name="Task Rabbit", address="San Francisco, CA", website_url="https://www.taskrabbit.com/careers")
        fresh_direct = Company(name="Fresh Direct", address="New York, NY", website_url="https://www.freshdirect.com/browse?id=about_careers")
        db.session.add_all([apple, oracle, car_gurus, task_rabbit, fresh_direct])
        db.session.commit()
    
    #Create employees
        jenny = Employee(name="Jenny", email="jenny@oracle.com", website="linkedin.com/in/jenny", contacted=True, company_id=2)
        tom = Employee(name="Tom", email="tom@oracle.com", website="linkedin.com/in/tom", contacted=True, company_id=2)
        greg = Employee(name="Greg", email="greg@apple.com", website="linkedin.com/in/greg", contacted=True, company_id=1)
        syed = Employee(name="Syed", email="syed@cargurus.com", website="linkedin.com/in/greg", company_id=3)
        emma = Employee(name="Emma", email="emma@taskrabbit.com", website="linkedin.com/in/emma", company_id=4)
        karen = Employee(name="Karen", email="karen@fresh-direct.com", website="linkedin.com/in/karen", company_id=5)
        db.session.add_all([jenny, tom, greg, syed, emma, karen])
        db.session.commit()

    #Create Connections
        c1 = Connection(user_id=1, employee_id=1, action="Email", notes="Sent email")
        c2 = Connection(user_id=1, employee_id=2, action="Email", notes="Sent email")
        c3 = Connection(user_id=1, employee_id=5, action="Email", notes="Sent Email")
        c4 = Connection(user_id=2, employee_id=1, action="Phone Call", notes="Scheduled phone call")
        c5 = Connection(user_id=2, employee_id=4, action="Email", notes="Sent Email")
        c6 = Connection(user_id=2, employee_id=3, action="Email", notes="Sent Email")
        c7 = Connection(user_id=3, employee_id=5, action="Phone Call", notes="Had phone call. Need to follow up")
        c8 = Connection(user_id=3, employee_id=2, action="Email", notes="Sent Email")
        c9 = Connection(user_id=3, employee_id=1, action="Email", notes="Sent Email")
        c10 = Connection(user_id=4, employee_id=5, action="Email", notes="Sent Email")
        c11= Connection(user_id=4, employee_id=2, action="LinkedIn Message", notes="Send LinkedIn request")
        db.session.add_all([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11])
        db.session.commit()

       

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

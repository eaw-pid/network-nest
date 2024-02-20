#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User

if __name__ == "__main__":
    with app.app_context():
        ##Clear Existing Data
        db.session.query(User).delete()

    #Create users
        user1 = User(username = "Tester", first_name = "Bill", last_name = "Murray", email = "tester123@gmail.com")

        db.session.add(user1)
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

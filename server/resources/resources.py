from .authenticate import *
from .users import *
from .connections import *
from .companies import *
from .employees import *


# @app.before_request
# def check_logged_in():
#     if request.endpoint not in [
#         "users",
#         "login",
#         "signup",
#         "checksession"
#     ]:
#         print("checking logged in")
#         if not session["user_id"]:
#             return {"error": "unathorized"}, 401
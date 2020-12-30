"""
    :author: Sam Parker
"""

from flask import Flask, render_template, request

import json
import passworduniverse
import validators
from urllib.parse import urlparse

import sys

import pickle
import codecs
import random

tsne = None
reg = None

app = Flask(__name__,
    static_url_path='/static', )


# https://google.github.io/styleguide/pyguide.html

@app.route("/")
def index():
    """Return the index.html page of the Password Universe website."""

    return render_template("index.html"), 200


# @app.route("/points")
# def points():
#     global tsne, reg
#     password_amount = int(request.args.get("amount", 50))
#     tsne = passworduniverse.PasswordUniverse().getPoints(password_amount)

#     return {"points": tsne, "response": "received"}


@app.route("/position/<string:new_password>")
def position(new_password=None):
    """Predicts the position of a new password in an existing password universe.
    ---
    parameters:
        - name: new_password
          in: path
          type: string
          required: true
          description: the new password to predict its position
    responses:
        400:
            description: Bad request
        200:
            description: The position of the new password
    """

    if new_password == None:
        return "Bad request: no password given", 400
    if tsne == None:
        return "Bad request: no universe created", 400
    if reg == None:
        return "Bad request: linear regression not done for this universe", 400

    star = passworduniverse.PasswordUniverse() \
                           .predict(reg, tsne, new_password)

    star["annot_weight"] = random.uniform(0, 1)

    return star, 200


@app.route("/load", methods=["POST"])
def load():
    """Load a password universe from a file.
    ---
    post:
        parameters:
            - name: file
              in: ???
              type: file
              required: true
              description: File containing universe.
    """

    #: the file passed by the user in the post request
    file = request.files["file"]

    if file == None:
        return "Bad request: No file", 400

    #: json object of points
    file = json.loads(file.read())
    points = file["points"]

    for i in range(0, len(points)):
        if points[i].get("annot_weight") == None:
            points[i]["annot_weight"] = random.uniform(0, 1)

    global reg
    global tsne
    
    # https://stackoverflow.com/questions/30469575/how-to-pickle-and-unpickle-to-portable-string-in-python-3
    reg(pickle.loads(codecs.decode(file["reg"].encode(), "base64")))
    tsne = points
    
    return {"points": points}


@app.route("/generate", methods=["POST"])
def generate():
    """Generate a universe using the given parameters and return the points.
    ---
    post:
        parameters:
            - name: amount
              in: POST
            - name: password_db
              in: POST
            - name: dr_method
              in: POST
            - name: linear_regression
              in: POST
            - name: extra_passwords
              in: POST

    """
    amount = request.form["amount"]

    try:
        amount = int(amount)
    except ValueError:
        return "Bad request: a number has not been given for amount"

    password_db = request.form["password_db"]
    dr_method = request.form["dr_method"]

    linear_regression = request.form["linear_regression"]

    if linear_regression == "true":
        linear_regression = True
    else:
        linear_regression = False

    extra_passwords = request.form["extra_passwords"].split("\n")

    # Remove all empty strings
    extra_passwords = list(filter(None, extra_passwords))

    # Strip whitespace from passwords
    for i in reversed(range(0, len(extra_passwords))):
        extra_passwords[i] = extra_passwords[i].strip()

    # if password_db is empty then set it to default password database
    if password_db == "":
        password_db = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt"
    else:
        # check if the user-given password_db is valid
        if not validators.url(password_db):
            return "bad request, password_db is not a valid URL", 400

    if amount <= 0:
        return "Bad request: amount must be more than 0", 400

    global tsne, reg

    tsne, reg = passworduniverse.PasswordUniverse().generate(
        amount=amount,
        password_db=password_db,
        dr_method=dr_method,
        linear_regression=linear_regression,
        extra_passwords=extra_passwords
        )

    #: pickled version of reg
    # https://stackoverflow.com/questions/30469575/how-to-pickle-and-unpickle-to-portable-string-in-python-3
    pickled = codecs.encode(pickle.dumps(reg), "base64").decode()
    
    

    return {"points": tsne, "reg": pickled} 


# TODO : get from config.json instead
app.run(host="localhost", port=1000)
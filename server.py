"""
    :author: Sam Parker
"""

from flask import Flask, render_template, request, send_file

import json
import passworduniverse
import validators
from urllib.parse import urlparse

import sys

import jsonpickle
import shutil

import pickle
import codecs
import random

tsne = None
reg = None
no_dimensions = None

app = Flask(__name__,
    static_url_path='/static', )

@app.route("/")
def index():
    """Return the index.html page of the Password Universe website."""

    return render_template("index.html"), 200

def BadRequest(message):
    """Respond with a Bad Request with a message.
    ---
    parameters:
        - name: message
          type: string
          description: message to send bad request with 
    """
    return f"Bad Request: {message}", 400


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
    
    global tsne
    global reg
    global no_dimensions

    if new_password == None:
        return BadRequest("No password given")
    if tsne == None:
        return BadRequest("No universe yet")
    if reg == None:
        return BadRequest("Regression is not support for this universe")
    if no_dimensions == None:
        return BadRequest("No dimension amount given")

    #: star with predicted value
    star = passworduniverse.PasswordUniverse() \
                           .predict(reg, tsne, new_password, no_dimensions)

    # add annotation weight to star
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

    # ensure that file exists
    if file == None:
        return BadRequest("No file given")

    # ensure that file is readable
    try:
        file = json.loads(file.read())
    except UnicodeDecodeError:
        return BadRequest("Invalid file")
    
    # ensure that the file can be indexed
    try:
        points = file["points"]
        reg_json = file["reg"]
    except TypeError:
        return BadRequest("Invalid file")

    global no_dimensions
    #: number of dimensions
    no_dimensions = file["no_dimensions"]


    # give each point an annotation weight if it does not already have one
    for i in range(0, len(points)):
        if points[i].get("annot_weight") == None:
            points[i]["annot_weight"] = random.uniform(0, 1)

    global reg 
    # regression model loaded from file
    if not reg_json:
        reg = jsonpickle.loads(reg_json)

    global tsne 
    tsne = points
    
    return {"points": points, "reg": reg != None, "no_dimensions": no_dimensions}


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
    #: number of passwords to include in the universe
    amount = request.form["amount"]

    # ensure that `amount` is an int type, error if not
    try:
        amount = int(amount)
    except ValueError:
        return BadRequest("No amount provided")
    
    # ensure that `amount` is greater than 0, error if not
    if amount <= 0:
        return BadRequest("Amount must be more than 0")

    #: url to password database
    # TODO: give option for the user to upload a file
    password_db = request.form["password_db"]

    #: dimensionality reduction method, currently only tSNE (as of 01 Jan 2021)
    dr_method = request.form["dr_method"]

    #: include linear regression
    linear_regression = request.form["linear_regression"]
    linear_regression = linear_regression == "true"

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
            return BadRequest("Expected valid URL but received " + password_db)

    #: number of dimensions, change to integer in range [2, 3]
    global no_dimensions
    no_dimensions = request.form["no_dimensions"]
    if no_dimensions == "2":
        no_dimensions = 2
    elif no_dimensions == "3":
        no_dimensions = 3
    else:
        return BadRequest("Number of dimensions is not valid")




    global tsne, reg

    tsne, reg = passworduniverse.PasswordUniverse().generate(
        amount=amount,
        password_db=password_db,
        dr_method=dr_method,
        linear_regression=linear_regression,
        extra_passwords=extra_passwords,
        no_dimensions=no_dimensions
        )

    #: pickled version of `reg`
    pickled = jsonpickle.dumps(reg)

    return {
        "points": tsne,
        "reg": pickled,
        "no_dimensions": no_dimensions
    }


# TODO : get from config.json instead
app.run(host="localhost", port=1000)
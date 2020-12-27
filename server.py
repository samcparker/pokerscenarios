from flask import Flask, render_template, request

import json
import passworduniverse

import random

tsne = None
clf = None

app = Flask(__name__,
    static_url_path='/static', )

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/points")
def points():
    global tsne, clf
    password_amount = int(request.args.get("amount", 50))
    tsne = passworduniverse.PasswordUniverse().getPoints(password_amount)

    return {"points": tsne, "response": "received"}

@app.route("/position/<string:new_password>")
def position(new_password=None):
    return passworduniverse.PasswordUniverse().predict(clf, tsne, new_password)

@app.route("/loadUniverse", methods=["POST"])
def loadUniverse():
    # make sure it's a json file
    # make sure it has the right structure
    points = json.loads(request.files["file"].read())
    for i in range(0, len(points)):
        if points[i].get("annot_weight") == None:
            points[i]["annot_weight"] = random.uniform(0, 1)
    return {"points": points}

@app.route("/generate", methods=["POST"])
def generate():

    name = request.form["name"]
    amount = request.form["amount"]
    print("generating " + amount)
    try:
        amount = int(amount)
    except ValueError:
        amount = 50

    password_db = request.form["password_db"]
    dr_method = request.form["dr_method"]
    linear_regression = request.form["linear_regression"]
    extra_passwords = request.form["extra_passwords"].split("\n")



    # remove all items that are empty strings
    extra_passwords = list(filter(None, extra_passwords))
    print(extra_passwords)
    for i in reversed(range(0, len(extra_passwords))):
        extra_passwords[i] = extra_passwords[i].strip()


    # TODO: ensure password_db is a valid URL
    if password_db == "":
        password_db = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt"

    global tsne, clf

    tsne, clf = passworduniverse.PasswordUniverse().generate(name, amount, password_db, dr_method, linear_regression, extra_passwords)

    return {"points": tsne} 


app.run(host="localhost", port=1000)
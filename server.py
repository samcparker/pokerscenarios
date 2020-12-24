from flask import Flask, render_template, request


import passworduniverse

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
    tsne, clf = passworduniverse.PasswordUniverse().getPoints(password_amount)

    return {"points": tsne, "response": "received"}

@app.route("/position/<string:new_password>")
def position(new_password=None):
    return passworduniverse.PasswordUniverse().predict(clf, tsne, new_password)

@app.route("/generate")
def generate():
    name = request.args.get("name", "ndwioqndinwqd")
    amount = int(request.args.get("amount", 50))
    password_db = request.args.get("password_db", "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt")
    dr_method = request.args.get("dr_method", "tsne")
    linear_regression = request.args.get("linear_regression", False)
    extra_passwords = request.args.get("extra_passwords", "")

    # TODO: ensure password_db is a valid URL
    if password_db == "":
        password_db = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt"

    print(name)
    print(amount)
    print(password_db)
    print(dr_method)
    print(linear_regression)
    print(extra_passwords)

    global tsne, clf
    tsne, clf = passworduniverse.PasswordUniverse().generate(name, amount, password_db, dr_method, linear_regression, extra_passwords)

    return {"points": tsne} 

app.run(host="localhost", port=1000)
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


app.run(host="localhost", port=1000)
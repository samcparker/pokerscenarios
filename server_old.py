from flask import Flask, render_template, request
import sys
import json
import textdistance
import time
import os
import json 
import urllib
from sklearn.linear_model import Ridge
from sklearn.manifold import TSNE
import numpy as np
import random
import pickle

from password_strength import PasswordStats

defaultConfig = {
    "host": "localhost",
    "port": "8000",
    "stars_folder": "stars"
}

# function to get the value of the key in the config, otherwise return the default config
def getConfig(key):
    with open("config.json") as json_data_file:
        data = json.load(json_data_file)
    if data.get(key):
        return data[key]
    return defaultConfig[key]

HOST = getConfig("host")
PORT = getConfig("port")
STARS_FOLDER = getConfig("stars_folder")

app = Flask(__name__,
    static_url_path='/static', )

# global object for Ridge prediction
clf = None
password_list = None
password_amount = None

@app.route("/")
def index():
    return render_template("index.html", host=HOST, port=PORT)

@app.route("/position/<string:new_password>")
def position(new_password=None):
    global clf
    global password_list

    print(new_password)

    if not clf or not password_list:
        return {"error": "prediction not started yet"}

    # create a distance vector from new_password to all other passwords

    D = []
    for i in range(0, len(password_list)):
        D.append(textdistance.levenshtein(new_password, password_list[i]))


    p = clf.predict([D])[0]
    return {"name": new_password, "ox": p[0], "oy": p[1], "strength": getStrength(new_password)}

def getStrength(password):
    return PasswordStats(password).strength()



@app.route("/points")
def points():
    global clf
    global password_list

    password_amount = int(request.args.get("amount", 50))

    file_exists = True

    if not os.path.exists(STARS_FOLDER):
        os.makedirs(STARS_FOLDER)

    try:
        f = open(".\\" + STARS_FOLDER + "\\tsne-" + str(password_amount) + ".json")
    except IOError:
        # file does not exist, carry on
        file_exists = False

    if file_exists:
        stars = json.loads(f.read())        
        f.close()

        clf = generateCLF(stars)

        return {"points": stars, "received": "ok"}

    with urllib.request.urlopen('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt') as f:
        # print(f.read())
        password_list = f.read().decode('utf-8').split('\n')
        i = random.randint(0, len(password_list) - password_amount)
        password_list = password_list[i:i+password_amount]

        lev_distance_matrix = []

        for i in range(0, len(password_list)):
            lev_distance_matrix.append([])
            for j in range(0, len(password_list)):
                lev = textdistance.levenshtein(password_list[i], password_list[j])
                lev_distance_matrix[i].append(lev)

        X = np.array(lev_distance_matrix)

        tsne = TSNE(n_components=2,n_jobs=8)
        X_embedded = tsne.fit_transform(X)

        #X_normed = (X_embedded - X_embedded.min(0)) / X_embedded.ptp(0)

        # use linear regression        
        Y = np.array(X_embedded)

        # Using Ridge because LinearRegression does not penalise extremely large weights
        


        # normalise Y
        Y = 2 * ((Y - Y.min(0)) / Y.ptp(0)) - 1

        stars = []

        for i in range(0, len(password_list)):
            stars.append({})
            stars[i]["name"] = password_list[i]
            stars[i]["ox"] = Y[i][0].item()
            stars[i]["oy"] = Y[i][1].item()

            stars[i]["strength"] = getStrength(password_list[i])



        clf = generateCLF(stars)

        f = open(".\\" + STARS_FOLDER + "\\tsne-" + str(password_amount) + ".json", "w")
        f.write(json.dumps(stars, indent=4))
        f.close()
        print("AAAAAAAAAAAAAAAAAA")
        return {"points": stars, "received": "ok"}

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)


# app.run()
# from http.server import BaseHTTPRequestHandler, HTTPServer
# from urllib import parse, request
# import textdistance 
# import time
# import json

# from sklearn.linear_model import Ridge
# from sklearn.manifold import TSNE
# import numpy as np
# # from MulticoreTSNE import MulticoreTSNE as TSNE

# import matplotlib.pyplot as plt

# hostName = "localhost"
# serverPort = 8080

# class Server(BaseHTTPRequestHandler):
#     def _set_headers(self):
#         self.send_response(200)
#         self.send_header("Content-type", "text/html")
#         self.end_headers()

#     def do_GET(self):
        
     
#         params = dict(parse.parse_qs(parse.urlsplit(self.path).query))
        
#         user_password = params.get("password", ["password"])[0]
#         password_amount = params.get("amount", 50)

#         with request.urlopen('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt') as f:
#             password_list = f.read().decode('utf-8').split('\n')[:password_amount]

#             lev_distance_matrix = []

#             for i in range(0, len(password_list)):
#                 lev_distance_matrix.append([])
#                 for j in range(0, len(password_list)):
#                     lev = textdistance.levenshtein(password_list[i], password_list[j])
#                     lev_distance_matrix[i].append(lev)

#             X = np.array(lev_distance_matrix)

#             tsne = TSNE(n_components=2,n_jobs=8)
#             X_embedded = tsne.fit_transform(X)

#             #X_normed = (X_embedded - X_embedded.min(0)) / X_embedded.ptp(0)

#             # use linear regression        
#             Y = np.array(X_embedded)

#             # Using Ridge because LinearRegression does not penalise extremely large weights
#             clf = Ridge(alpha=1.0).fit(X, Y)

#             D = []
#             for i in range(0, len(password_list)):
#                 D.append(textdistance.levenshtein(user_password, password_list[j]))


#             D = []
#             for i in range(0, len(lev_distance_matrix)):
#                 D.append(textdistance.levenshtein(user_password, password_list[i]))


#             for i in range(0, len(Y)):
#                 c = Y[i]
#                 plt.scatter(c[0], c[1], color="blue")
#                 plt.annotate(password_list[i], (c[0], c[1]))

#             ca = clf.predict([D])[0]
#             plt.scatter(ca[0], ca[1], color="red")
#             plt.annotate(user_password, (ca[0], ca[1]))

#             # plt.show()


        
#         self._set_headers()
#         self.wfile.write(json.dumps({"hello": "world", "received": "ok"}).encode("utf-8"))

#         self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
#         self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
#         self.wfile.write(bytes("<p>Password: %s</p>" % user_password, "utf-8"))
#         self.wfile.write(bytes("<p>Password: %s</p>" % lev_distance_matrix, "utf-8"))
#         self.wfile.write(bytes("<p>2D: %s</p>" % password_list, "utf-8"))
#         self.wfile.write(bytes("<body>", "utf-8"))
#         self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
#         self.wfile.write(bytes("</body></html>", "utf-8"))

# if __name__ == "__main__":        
#     webServer = HTTPServer((hostName, serverPort), Server)
#     print("Server started http://%s:%s" % (hostName, serverPort))

#     try:
#         webServer.serve_forever()
#     except KeyboardInterrupt:
#         pass

#     webServer.server_close()
#     print("Server stopped.")
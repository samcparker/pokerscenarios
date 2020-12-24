import os

import json

import urllib
import random
import numpy as np
import textdistance 

from password_strength import PasswordStats

from sklearn.linear_model import Ridge
from sklearn.manifold import TSNE

import pickle

STARS_FOLDER = ".\\stars"

class PasswordUniverse():

    def predict(self, clf, stars, password):
        # generate distance vector from `password` to all stars
        D = []
        for i in range(0, len(stars)):
            D.append(textdistance.levenshtein(stars[i]["name"], password))

        prediction = clf.predict([D])[0]

        return {
            "name": password,
            "ox": prediction[0],
            "oy": prediction[1],
            "strength": self._getStrength(password)
        }


    def getPoints(self, amount):
        if self._fileExists("tsne-{}.json".format(amount), "stars"):
            # get file and return
            with open("{}\\tsne-{}.json".format(STARS_FOLDER, amount), "r") as f:
                tsne = json.loads(f.read())
        else:
            tsne = self._generateTSNE(amount, "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt")
            # write tsne to file called tsne-{amount}.json
            with open("{}\\tsne-{}.json".format(STARS_FOLDER, amount), "w") as f:
                f.write(json.dumps(tsne, indent=4))

        # file does not exist, generate tSNE with provided parameters
        if self._fileExists("tsne-{}.pickle".format(amount), "stars"):
            clf = pickle.load(open("{}\\tsne-{}.pickle".format(STARS_FOLDER, amount), "rb"))
        else:
            clf = self._generateCLF(tsne)
            pickle.dump(clf, open("{}\\tsne-{}.pickle".format(STARS_FOLDER, amount), "wb"))

        return tsne, clf

    def generate(self, name, amount, password_db, dr_method, linear_regression, extra_passwords):
        tsne = self._generateTSNE(amount, password_db)
        # write tsne to file called {name}.json
        with open("{}\\{}.json".format(STARS_FOLDER, name), "w") as f:
            f.write(json.dumps(tsne, indent=4))

        clf = None

        if linear_regression:
            clf = self._generateCLF(tsne)
            pickle.dump(clf, open("{}\\{}.pickle".format(STARS_FOLDER, name), "wb"))

        return tsne, clf

    # check if a file exists with folder name and file name
    def _fileExists(self, file_name, folder_name):
        # ensure folder_name folder exists
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)

        # check if file exists
        file_exists = True
        try:
            f = open("{}\\{}".format(folder_name, file_name))
        except IOError:
            # IOError so file does not exist
            file_exists = False

        return file_exists
        

    def _getStrength(self, password):
        return PasswordStats(password).strength()

    def _getCLF(self, stars):
        # using stars which are is a list of dictionaries with attributes
        # - name
        # - ox
        # - oy
        # - strength
        #
        # figure out the Ridge linear thing

        # check if it exists as a file
        pass
        
    
    def _generateCLF(self, stars):
        # generate a distance matrix
        X = []
        Y = []

        for i in range(0, len(stars)):
            X.append([])
            Y.append([stars[i]["ox"], stars[i]["oy"]])
            for j in range(0, len(stars)):
                lev = textdistance.levenshtein(stars[i]["name"], stars[j]["name"])
                X[i].append(lev)

        X = np.array(X)
        Y = np.array(Y)

        return Ridge(alpha=1.0).fit(X, Y)

    def _generateTSNE(self, amount, password_db):
        with urllib.request.urlopen(password_db) as f:
            # get amount of these
            password_list = f.read().decode('utf-8').split('\n')
            i = random.randint(0, len(password_list) - amount) # choose a random index to start at
            password_list = password_list[i:i + amount]

            lev_distance_matrix = []

            for i in range(0, len(password_list)):
                lev_distance_matrix.append([])
                for j in range(0, len(password_list)):
                    lev = textdistance.levenshtein(password_list[i], password_list[j])
                    lev_distance_matrix[i].append(lev)

            X = np.array(lev_distance_matrix)

            tsne = TSNE(n_components=2,n_jobs=8)
            X_embedded = tsne.fit_transform(X)

            # use linear regression        
            Y = np.array(X_embedded)

            # Using Ridge because LinearRegression does not penalise extremely large weights
            


            # normalise Y
            Y = 2 * ((Y - Y.min(0)) / Y.ptp(0)) - 1

            stars = []

            # Create a new star and add to list
            for i in range(0, len(password_list)):
                stars.append({
                    "name": password_list[i],
                    "ox": Y[i][0].item(),
                    "oy": Y[i][1].item(),
                    "strength": self._getStrength(password_list[i])
                })
            return stars
        pass
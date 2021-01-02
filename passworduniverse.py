import os

import json

import urllib
import random
import numpy as np
import textdistance 

from password_strength import PasswordStats

from sklearn.linear_model import Ridge
from sklearn.manifold import TSNE
from sklearn.neighbors import KNeighborsRegressor
from sklearn.kernel_ridge import KernelRidge

import pickle

STARS_FOLDER = ".\\stars"

class PasswordUniverse():
    """Example"""

    def predict(self, reg, stars, password, no_dimensions):
        # generate distance vector from `password` to all stars
        D = []
        for i in range(0, len(stars)):
            lev = textdistance.levenshtein(stars[i]["name"], password)
            D.append(lev)

        prediction = reg.predict([D])[0]

        if no_dimensions == 2:
            return {
                "name": password,
                "ox": prediction[0],
                "oy": prediction[1],
                "strength": self._getStrength(password)
            }
        return {
            "name": password,
            "ox": prediction[0],
            "oy": prediction[1],
            "oz": prediction[2],
            "strength": self._getStrength(password)
        }

    # def getPoints(self, amount):
    #     if self._fileExists("tsne-{}.json".format(amount), "stars"):
    #         # get file and return
    #         with open("{}\\tsne-{}.json".format(STARS_FOLDER, amount), "r") as f:
    #             tsne = json.loads(f.read())
    #     else:
    #         tsne = self._generateTSNE(amount, "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt", [], 2)
    #         # write tsne to file called tsne-{amount}.json
    #         with open("{}\\tsne-{}.json".format(STARS_FOLDER, amount), "w") as f:
    #             f.write(json.dumps(tsne, indent=4))

    #     # file does not exist, generate tSNE with provided parameters
        
    #     if self._fileExists("tsne-{}.pickle".format(amount), "stars"):
    #         reg = pickle.load(open("{}\\tsne-{}.pickle".format(STARS_FOLDER, amount), "rb"))
    #     else:
    #         # reg = self._generateREG(tsne)
    #         # pickle.dump(reg, open("{}\\tsne-{}.pickle".format(STARS_FOLDER, amount), "wb"))
    #         pass
    #     return tsne #, reg

    def generate(self, *, amount: int, dr_method: str, password_db:str=None, linear_regression:bool=False, extra_passwords: str=None, no_dimensions: int):
        """Generate a list of passwords with their x position and y position using the given dimensionality reduction method.

        Args:
            amount: Number of passwords to take from database
            dr_method: Dimensionality reduction method to use
            password_db: Password database URL
            linear_regression: Use linear regression
            extra_passwords: List of extra passwords to use
            no_dimensions: Number of dimensions needed
        Returns:
            Points generated,
            Linear regression model if required
        """
        assert amount > 0, (
            f'Amount must be more than 0 but amount is {amount}'
        )

        assert amount != None, (
            f'amount is required but no amount was given.'
        )

        assert dr_method != None, (
            f'dr_method is required but no dr_method was given.'
        )

        assert no_dimensions in [2, 3], (
            f'expected value in range 2,3 but received {no_dimensions} instead'
        )
        
        tsne = self._generateTSNE(amount, password_db, extra_passwords, no_dimensions)
        reg = None

        print("LINEAR REGRESSION")
        print(linear_regression)
        if linear_regression == True:
            reg = self._generateReg(tsne, no_dimensions)

        return tsne, reg

    # check if a file exists with folder name and file name
    def _fileExists(self, file_name, folder_name):
        # ensure folder_name folder exists
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)

        # check if file exists
        file_exists = True
        try:
            open("{}\\{}".format(folder_name, file_name))
        except IOError:
            # IOError so file does not exist
            file_exists = False

        return file_exists
        

    def _getStrength(self, password):
        return PasswordStats(password).strength()

    def _getReg(self, stars):
        # using stars which are is a list of dictionaries with attributes
        # - name
        # - ox
        # - oy
        # - strength
        #
        # figure out the Ridge linear thing

        # check if it exists as a file
        pass
        
    
    def _generateReg(self, stars, no_dimensions):
        # generate a distance matrix
        X = []
        Y = []

        for i in range(0, len(stars)):
            X.append([])
            if no_dimensions == 2:
                Y.append([stars[i]["ox"], stars[i]["oy"]])
            else:
                Y.append([stars[i]["ox"], stars[i]["oy"], stars[i]["oz"]])

            for j in range(0, len(stars)):
                lev = textdistance.levenshtein(stars[i]["name"], stars[j]["name"])
                X[i].append(lev)

        X = np.array(X)
        Y = np.array(Y)


        # reg = Ridge(alpha=30)
        reg = KNeighborsRegressor(weights="distance", n_neighbors=5)
        print(reg)
        reg.fit(X, Y)
        print(reg.get_params(True))
        return reg

    def _generateTSNE(self, amount, password_db, extra_passwords, no_dimensions):
        with urllib.request.urlopen(password_db) as f:
            # get amount of these
            password_list = f.read().decode('utf-8').split('\n')
            i = random.randint(0, len(password_list) - amount) # choose a random index to start at
            password_list = password_list[i: i + amount]
            if len(extra_passwords) > 0:
                password_list.extend(extra_passwords)
            lev_distance_matrix = []

            for i in range(0, len(password_list)):
                lev_distance_matrix.append([])
                for j in range(0, len(password_list)):
                    lev = textdistance.levenshtein(password_list[i], password_list[j])
                    lev_distance_matrix[i].append(lev)

            X = np.array(lev_distance_matrix)

            tsne = TSNE(n_components=no_dimensions, n_jobs=8, verbose=1)
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
                    # "oz": Y[i][2].item(),
                    "strength": self._getStrength(password_list[i]),
                    "annot_weight": random.uniform(0, 1)
                })

                if no_dimensions == 3:
                    stars[i]["oz"] = Y[i][2].item()


            return stars
        pass
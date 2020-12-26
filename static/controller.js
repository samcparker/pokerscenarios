/**
 * Controller class to handle the Password Universe.
 * @class
 */
export default class Controller {

    constructor() {
        this.points = null;
    }

    /**
     * Run a callback function on the new set of points.
     * 
     * @param {number} amount The amount of stars required.
     * @param {function} callback Callback function to apply to response 
     */

    getPoints(amount, callback) {
        $.get(`/points?amount=${amount}`, response => {
            callback(response.points);
            this.points = response.points;
        });
    }

    generateUniverse(params, callback) {

        // $.post(`/generate?name=${params.name}&amount=${params.amount}&password_db=${params.password_db}&dr_method=${params.dr_method}&linear_regression=${params.linear_regression}&extra_passwords=${params.extra_passwords}`, 



        $.post("/generate",
        {
            "name": params.name,
            "amount": params.amount,
            "password_db": params.password_db,
            "dr_method": params.dr_method,
            "linear_regression": params.linear_regression,
            "extra_passwords": params.extra_passwords
        })
        .success(response => {
            console.log(response);
            this.points = response.points;
            callback(response.points);
        });
    }

    /**
     * Take a screenshot of the universe.
     */
    screenshot() {
        saveSvgAsPng(document.getElementById("universe"), "universe.png", {scale: 2});
    }

    /**
     * 
     * @param {string} name 
     * @param {function} callback 
     */
    addStar(name, callback) {
        // check if star is already in universe
        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i].name == name) {
                this.centreStar(this.points[i], function(points) {
                    callback(points);
                });
                return;
            }
        }
        
        $.get(`/position/${name}`, response => {
            this.points.push(response);
            // Centre the new star.
            // This could be changed to recenter the currently centered star.
            this.centreStar(response, function (points) {
                callback(points);
            });
        });
    }

    /**
     * 
     * Centre all stars around another star.
     * 
     * @param {object} star 
     * @param {function} callback 
     */
    centreStar(star, callback) {
        // find out modified positions of stars

        // `star` is null so remove origin
        if (!star) {
            // remove origin for each point
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].hasOrigin = false;
            }
            callback(this.points);
            return;
        }

        // there are no points so do nothing, return an error
        if (!this.points) {
            return null;
        }

        // center around star.name

        // get distance from point a to point b
        function distance(a, b) {
            // a^2 + b^2 = c^2
            return Math.sqrt(Math.abs((a.ox - b.ox) * (a.ox - b.ox) + (a.oy - b.oy) * (a.oy - b.oy)));
        }

        // get angle from point a to point b
        function angle(a, b) {
            let dx = a.ox - b.ox;
            let dy = b.oy - a.oy;
            return Math.atan2(dx, dy);
        }

        // calculate angle and distance from `star` for every star
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].angle = angle(star, this.points[i]);
            this.points[i].distance = distance(star, this.points[i]);
        }

        this.points.sort((a, b) => ((a.angle) > (b.angle)) ? 1 : -1);

        // set modified position of each star
        for (var i = 0; i < this.points.length; i++) {
            // set modified x & y
            this.points[i].mx = this.points[i].distance * Math.sin((i * 2 * Math.PI) / this.points.length);
            this.points[i].my = this.points[i].distance * Math.cos((i * 2 * Math.PI) / this.points.length);

            this.points[i].hasOrigin = true;
        }

        callback(this.points);

    }
}
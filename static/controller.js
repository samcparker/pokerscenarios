export default class Controller {

    constructor() {
        this.points = null;
    }

    /**
     * Get the positions of the points.
     * 
     * @param {function} callback Callback function to apply to response 
     */

    getPoints(amount, callback) {
        $.get(`/points?amount=${amount}`, (response) => {
            callback(response.points);
            this.points = response.points;
        });

    }

    /**
     * 
     * @param {string} name 
     * @param {function} callback 
     */
    addStar(name, callback) {
        $.get(`/position/${name}`, response => {
            this.points.push(response);
            // centre the new star
            this.centreStar(response, function(points) {
                callback(points);
            });
        });
    }

    /**
     * 
     * Centre all stars around another star.
     * 
     * Doesn't seem to work effectively.
     * 
     * @param {object} star 
     * @param {function} callback 
     */
    centreStar(star, callback) {
        // find out modified positions of stars

        if (!star) {
            // remove origin for each point
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].hasOrigin = false;
            }
            callback(this.points);
            return;
        }
        
        if (!this.points) {
            // getPoints has not been called
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
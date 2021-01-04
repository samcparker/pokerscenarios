import Universe from "/static/universe.js";

/**
 * Controller class to handle the Password Universe.
 * @class
 */

export default class Controller {

    constructor() {
        this.points = null;
        this.regex = null;
        this.loading = false;
        this.no_dimensions = null;

    }

    clone(universe) {
        var universe_container = d3.select("#universe-container");

        var universe_div = universe_container.append("div")
            .classed("col", true)
            .classed("no-gutters", true)
            .classed("px-0", true)
            .classed("universe", true);

        new Universe(universe_div, universe.points, universe.no_dimensions);

    }

    isLoading() {
        return this.loading;
    }

    setRegex(regex) {
        this.regex = new RegExp(regex);
    }

    test(password) {
        if (this.regex == null || this.regex.test(password)) {
            return true;
        }
        return false;
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

    load(callback) {
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);
        this.loading = true;
        $.ajax({
            url: "/load",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: response => {
                this.no_dimensions = response.no_dimensions;
                this.loading = false;
                this.points = response.points;
                callback(response.points);
            }
        });
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:json;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Chooese where to download the universe to
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download
    generateUniverse(params, callback) {

        this.loading = true;
        // TODO : change to ajax expression
        $.post("/generate", {
                "amount": params.amount,
                "password_db": params.password_db,
                "dr_method": params.dr_method,
                "linear_regression": params.linear_regression,
                "no_dimensions": params.no_dimensions,
                "extra_passwords": params.extra_passwords
            })
            .done(response => {
                // console.log(response);

                // this.points = response.points;
                // this.no_dimensions = response.no_dimensions;
                // this.download(`${params.name}.pu`, JSON.stringify(response, null, 1));
                // this.loading = false;
                // callback(response.points);
                console.log("hi");
                this.addUniverse(response);
            });
    }

    addUniverse(response) {
        // check if panel is taken, add if not
        var universe_container = d3.select("#universe-container");

        var universe_div = universe_container.append("div")
            .classed("col", true)
            .classed("no-gutters", true)
            .classed("px-0", true)
            .classed("universe", true);

        var universe = new Universe(universe_div, response.points, response.no_dimensions);

    }


    /**
     * Take a screenshot of the universe.
     */
    screenshot() {
        saveSvgAsPng(document.getElementById("universe"), "universe.png", {
            scale: 2
        });
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
                this.centreStar(this.points[i], function (points) {
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
                this.points[i].isEarth = false;
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
            this.points[i].isEarth = false;
            this.points[i].angle = angle(star, this.points[i]);
            this.points[i].distance = distance(star, this.points[i]);
        }

        star.isEarth = true;

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
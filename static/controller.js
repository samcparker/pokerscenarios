import Model from "./model.js";


export default class Controller {

    constructor() {
        this.model = new Model();
    }

    getPoints(amount, callback) {
        this.model.getPoints(amount, function(points) {
            // Use these points to do something
            callback(points);
        });
    }

    addStar(name, callback) {
        this.model.addStar(name, function(points) {
            callback(points);
        });
    }

    centreStar(star, callback) {
        this.model.centreStar(star, function(points) {
            callback(points);
        });
    }

    changeDimensions(width, height) {

    }

    changeRadius(radius) {

    }

    changeTextOpacity(opacity) {

    }

}
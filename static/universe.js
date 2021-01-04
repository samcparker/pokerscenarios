import Controller from "./controller.js";

export default class Universe {

    constructor(universe_div, points, no_dimensions) {
        this.no_dimensions = no_dimensions;
        this.points = points;
        this.regexp = null;
        this.universe_div = universe_div;
        this.svg = null;

        this.view_parameters = {
            width: 1,
            height: 1,
            star_size: 1,
            text_opacity: 1,
            max_star_size: 2,
            annot_weight: 1
        };

        this.view_modifiers = {
            width: function (d) {
                return (d - 100) * window.innerWidth * 0.01;
            },
            height: function (d) {
                return (d - 100) * window.innerHeight * 0.01;
            },
            star_size: function (d) {
                return d * 0.01 * 20;
            },
            text_opacity: function (d) {
                return d * 0.01;
            },
            annot_weight: function(d) {
                return d * 0.002;
            }

        }

        this.init();

    }

    test(value) {
        if (this.regexp == null) return true;

        return this.regexp.test(value);
    }

    centreStar(star) {
        if (!star) {
            // remove origin for each point
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].hasOrigin = false;
                this.points[i].isEarth = false;
            }
            this.update2d(this.points, true);
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

        this.update2d(this.points, true);
    }

    update2d(points, transition) {

        if (points) {
            this.svg.selectAll(".star").data(points, function (d) {
                    return d.name;
                })
                .enter().append("circle")
                .classed("star", true)
                .attr("fill", function (d) {
                    return `hsl(${d.strength * 100}, 100%, 50%)`;
                })
                .on("click", (d) => {
                    this.centreStar(d);
                });

            this.svg.selectAll(".star").data(points, function (d) {
                return d.name;
            }).exit().remove();
        }

        this.svg.selectAll(".star")
            .transition()
            .duration(transition ? 1000 : 0)
            .attr("cx", (d) => {
                if (d.hasOrigin) {
                    return d.mx * this.view_parameters.width;
                }
                return d.ox * this.view_parameters.width;
                })
            .attr("cy", (d) => {
                if (d.hasOrigin) {
                    return d.my * this.view_parameters.height;
                }
                return d.oy * this.view_parameters.height;
            })
            .attr("r", () => {
                console.log(this.view_parameters.star_size * this.view_parameters.max_star_size);
                return this.view_parameters.star_size * this.view_parameters.max_star_size;
            })
            .style("opacity", (d) => {
                if (this.test(d.name)) {
                    return "1";
                }
                return "0.1";
            });



        // --- annotations ---

        if (points) {
            this.svg.selectAll(".annot").data(points, function (d) {
                    return d.name;
                })
                .enter().append("text")
                .classed("annot", true)
                .text(function (d) {
                    return d.name;
                })
                .attr("fill", "white");

            this.svg.selectAll(".annot").data(points, function (d) {
                    return d.name;
                })
                .exit()
                .remove();
        }

        this.svg.selectAll(".annot")
            .transition()
            .duration(transition ? 1000 : 0)
            .attr("x", (d) => {
                if (d.hasOrigin) {
                    return d.mx * this.view_parameters.width;
                }
                return d.ox * this.view_parameters.width;
            })
            .attr("y", (d) => {
                if (d.hasOrigin) {
                    return d.my * this.view_parameters.height;
                }
                return d.oy * this.view_parameters.height;
            })
            .style("visibility", (d) => {
                if (
                    d.isEarth 
                    || (d.annot_weight < this.view_parameters.annot_weight
                    && this.test(d.name))) {
                    return "visible";
                }
                return "hidden";
            });


    }


    init() {
        // Add view controls
        var x = d3.select("#controls-template").html();
        // set HTML before adding svg, otherwise it will override svg
        this.universe_div.html(x);


        if (this.no_dimensions == 2) {
            this.init2d();
        } else {
            this.init3d();
        }

        var _this = this;
        this.universe_div.select("#controls").select("#radius_range")
            .on("input", function () {
                _this.view_parameters.star_size = _this.view_modifiers.star_size(this.value);
                _this.update2d();
            });

        this.universe_div.select("#controls").select("#width_range")
        .on("input", function () {
            console.log("width");
            _this.view_parameters.width = _this.view_modifiers.width(this.value);
            _this.update2d();
        });
        
        this.universe_div.select("#controls").select("#height_range")
        .on("input", function () {
            console.log("height");
            _this.view_parameters.height = _this.view_modifiers.height(this.value);
            _this.update2d();
        });

        this.universe_div.select("#controls").select("#annotation-range")
        .on("input", function () {
            console.log(this.value);
            _this.view_parameters.annot_weight = _this.view_modifiers.annot_weight(this.value);
            console.log(_this.view_parameters.annot_weight);
            _this.update2d();
        });


        

        this.universe_div.select("#controls").select("#search-button")
        .on("click", () => {
            // get regex
            this.setRegexp(this.universe_div.select("#search-field").node().value);
            this.update2d(null, true);
        });
        
        this.universe_div.select("#controls").select("#clone-universe")
        .on("click", () => {
            // create a new universe
            new Controller().clone(this);
        });

        this.universe_div.select("#controls").select("#destroy-universe")
        .on("click", () => {
            // get regex
            // show confirmation message
            var destroy = confirm("Are you sure you want to destroy this universe?")
            if (destroy) {
                this.universe_div.remove();
            }
        });
    }

    init2d() {


        this.svg = this.universe_div.append("svg").call(d3.zoom().on("zoom", () => {
                this.svg.attr("transform", d3.event.transform)
            }))
            .append("g");





        this.update2d(this.points);

        this.universe_div.select("#controls").select("#reset-view")
        .on("click", () => {
            this.centreStar();
        });

    }

    init3d() {

    }

    setRegexp(regexp) {
        this.regexp = new RegExp(regexp);
    }
}
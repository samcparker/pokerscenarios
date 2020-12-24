import Controller from "./controller.js";

var controller = new Controller();
var parameters = {};

let params = (new URL(document.location)).searchParams;
const PASSWORD_AMOUNT = params.get("amount") || 50;

$(document).ready(function () {

  let svg = d3.select("#universe")
    .attr("background-color", "#000")
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    }))
    .append("g");

    for (var i = 0; i < 100; i++) {
      svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", i * 20)
      .attr("fill", "rgba(0, 0, 0, 0)")
      .style("stroke", `rgb(255, 255, 255, ${0.2 * (1 - (i * 0.01))})`);

    }


  function update(points) {
    // Add stars that have been added to list
    if (points) {
      svg.selectAll(".star")
        .data(points, function(d) { return d.name; } )
        .enter()
        .append("circle")
        .attr("class", "star")
        .attr("fill", function(d) {
          return `hsl(${d.strength * 100}, 100%, 50%)`;
        })
        .on("click", function (d) {
          controller.centreStar(d, function (points) {
            // set screenx of points
            update(points);
          });
        });

      svg.selectAll("text")
        .data(points, function(d) { return d.name; } )
        .enter()
        .append("text")
        .text(function (d) {
          return d.name;
        });
    }

    // Update all stars
    svg.selectAll(".star")
      .transition()
      .duration(1000)
      .attr("r", parameters.radius)
      .attr("cx", function (d) {
        if (d.hasOrigin) {
          return d.mx * parameters.width;
        }
        return d.ox * parameters.width;
      })
      .attr("cy", function (d) {
        if (d.hasOrigin) {
          return d.my * parameters.height;
        }
        return d.oy * parameters.height;
      });

    svg.selectAll("text")
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        if (d.hasOrigin) {
          return 10 + d.mx * parameters.width;
        }
        return 10 + d.ox * parameters.width;

      })
      .attr("y", function (d) {
        if (d.hasOrigin) {
          return 10 + d.my * parameters.height;
        }
        return 10 + d.oy * parameters.height;
      })
      .attr("fill", `rgba(255, 255, 255, ${parameters.text_opacity})`);

    // Remove stars that have been removed from the list
    svg.selectAll(".star")
      .data(points, function(d) { return d.name; } )
      .exit()
      .remove();

    svg.selectAll("text")
    .data(points, function(d) { return d.name; } )
      .exit()
      .remove();
  }

  // Get initial points and display on canvas
  controller.getPoints(PASSWORD_AMOUNT, function (points) {
    update(points);
  });

  /**
   * Generate universe listener
   * 
   * TODO: Disable this button until response has been made!
   */
  var receivedResponse = true;
  d3.select("#generate_universe").on("click", function() {
    // Prevent making any new requests until old one has finished
    if (!receivedResponse) {
      return;
    }

    var btn = d3.select(this);
    btn.attr("disabled", true);

    var params = {
      name: document.getElementById("universe_name").value,
      amount: document.getElementById("number_of_stars").value,
      password_db: document.getElementById("password_db").value,
      dr_method: document.getElementById("dimensionality_reduction_method").value,
      linear_regression: document.getElementById("linear_regression").checked,
      extra_passwords: document.getElementById("extra_passwords").value
    };


    controller.generateUniverse(params, function(points) {
      receivedResponse = true;
      btn.attr("disabled", null);
      update(points);
    });
  });

  /**
   * Click listener on Reset View button to reset stars back to default positions
   */
  d3.select("#reset_view_button").on("click", function () {
    controller.centreStar(null, function (points) {
      console.log("hello");
      update(points);
    });
  });

  /**
   * Click listener on Add Star/Centre Star
   */
  d3.select("#add_star_button").on("click", function () {
    controller.addStar(document.getElementById("add_star").value, function (points) {
      console.log(points);
      update(points);
    });
  });

  let modifiers = {
    radius: function(d) {
      return d * 0.01 * 30;
    },
    width: function(d) {
      return window.innerWidth * (d - 100) * 0.005;
    },
    height: function(d) {
      return window.innerWidth * (d - 100) * 0.005;
    },
    text_opacity: function(d) {
      return d * 0.01;
    },
  };

  d3.select("#radius_range").on("input", function() {
    parameters.radius = modifiers.radius(this.value);
    update();
    console.log(parameters);
  });
  parameters.radius = modifiers.radius(document.getElementById("radius_range").value);

  d3.select("#width_range").on("input", function() {
    parameters.width = modifiers.width(this.value);
    update();
  });
  parameters.width = modifiers.width(document.getElementById("width_range").value);

  d3.select("#height_range").on("input", function() {
    parameters.height = modifiers.height(this.value);
    update();
  });
  parameters.height = modifiers.height(document.getElementById("height_range").value);
  
  d3.select("#text_opacity_range").on("input", function() {
    parameters.text_opacity = modifiers.text_opacity(this.value);
    console.log(parameters);
    update();
  });
  parameters.text_opacity = modifiers.text_opacity(document.getElementById("text_opacity_range").value);


});

// const ADDRESS = "http://{{host}}:{{port}}";

// class Vector2 {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   /**
//    * Get the angle between two vectors.
//    * @param Vector2 b
//    */
//   angle(b) {
//     let dx = b.x - this.x;
//     let dy = this.y - b.y;
//     return Math.atan2(dx, dy);
//   }

//   /**
//    * Get the magnitude between two vectors.
//    * @param Vector2 b 
//    */
//   magnitude(b) {
//     return Math.sqrt(Math.abs((this.x - b.x) * (this.x - b.x) - (this.y - b.y) * (this.y - b.y)));
//   }
// }

// class Star {
//   constructor(name, position) {
//     this.name = name;
//     this.position = position;
//   }

//   getScreenPosition() {
//     if (this.hasOrigin) {
//       return new Vector2(this.modified.x * 500, this.modified.y * 500);
//     }
//     return new Vector2(this.position.x * 500, this.position.y * 500);
//   }

//   /**
//    * Set origin around a star
//    * @param {} star 
//    */
//   setOrigin(star) {
//     if (!star) {
//       this.hasOrigin = false;
//       return;
//     }

//     this.hasOrigin = true;

//     this.angle = this.position.angle(star.position);
//     this.distance = this.position.magnitude(star.position);



//   }
// }

// $(document).ready(function () {
//   let points = [];
//   /**
//    * Initialise SVG
//    */
//   let svg = d3.select("#universe")
//     .attr("background-color", "#000")
//     .call(d3.zoom().on("zoom", function () {
//       svg.attr("transform", d3.event.transform)
//     }))
//     .append("g");

//   /**
//    * Run a callback function on the points received from the server.
//    * @param {*} amount 
//    * @param {*} callback 
//    */
//   function getPoints(amount, callback) {
//     $.get(`/points?amount=${amount}`, function (response) {
//       callback(response);
//     });
//   }

//   /**
//    * Update the points inside the SVG.
//    */
//   function update() {

//     svg
//       .selectAll("circle")
//       .data(points, function (d) {
//         return d.name;
//       })
//       .enter()
//       .append("circle")
//       .attr("fill", "white")
//       .attr("r", 5)
//       .on("click", function (d) {
//         centreStar(d);
//       });

//     svg
//       .selectAll("text")
//       .data(points, function (d) {
//         return d.name;
//       })
//       .enter()
//       .append("text")
//       .attr("fill", "white")
//       .text(function (d) {
//         return d.name;
//       });

//     svg
//       .selectAll("circle")
//       .transition()
//       .duration(1000)
//       .attr("cx", function (d) {
//         return d.getScreenPosition().x;
//       })
//       .attr("cy", function (d) {
//         return d.getScreenPosition().y;
//       });

//     svg
//       .selectAll("text")
//       .transition()
//       .duration(1000)
//       .attr("x", function (d) {
//         return d.getScreenPosition().x;
//       })
//       .attr("y", function (d) {
//         return d.getScreenPosition().y;
//       });

//     svg.exit().remove();

//   }

//   getPoints(50, function (response) {
//     // turn response into list of Point objects
//     for (var i = 0; i < response.points.length; i++) {
//       let d = response.points[i];
//       points.push(new Star(d.name, new Vector2(d.ox, d.oy)));
//     }




//     update();
//   });

//   function centreStar(star) {

//     for (var i = 0; i < points.length; i++) {
//       points[i].setOrigin(star);

//     }

//     if (!star) return update();

//     points.sort((a, b) => ((a.angle) > (b.angle)) ? 1 : -1);

//         // points[j].x = window.innerWidth * (d.x + points2[i].distanceFromOrigin * Math.sin((i * 2 * Math
//       //             .PI) / points.length))

//     for (var i = 0; i < points.length; i++) {
//       points[i].modified = new Vector2(
//         points[i].distance * Math.sin((i * 2 * Math.PI) / points.length),
//         points[i].distance * Math.cos((i * 2 * Math.PI) / points.length)
//       );
//     }

//     console.log(points);

//     update();
//     // retain order of list but change the new x and y positions
//     // let points2 = [...points]; // clone points

//     // console.log(points2);

//     // points2.sort((a, b) => ((a.angle) > (b.angle)) ? 1 : -1);

//     // star.modified = new Vector2(0, 0);

//     // // Position each point at its index in points2
//     // for (var i = 0; i < points.length; i++) {
//     //   var index = -1;
//     //   for (var j = 0; j < points2.length; j++) {
//     //     if (points2[i].name == points[j].name) {
//     //       index = i;
//     //       break;
//     //     }
//     //   }

//     //   if (points[i].name == star.name) {
//     //     points[i].modified = new Vector2(0, 0);
//     //   }
//     //   points[i].modified = new Vector2(
//     //     0 + points2[index].distance * Math.sin((index * 2 * Math.PI) / points2.length),
//     //     0 + points2[index].distance * Math.cos((index * 2 * Math.PI) / points2.length)
//     //   );


//   }
//   update();

// // Button Listeners

// $("#reset_view_button").on("click", function () {
//   centreStar();
// });

// });


// // const ADDRESS = "http://{{host}}:{{port}}";
// // let params = (new URL(document.location)).searchParams;
// // const PASSWORD_AMOUNT = params.get("amount") || 50;

// // function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
// //   var color1 = rgbColor1;
// //   var color2 = rgbColor2;
// //   var fade = fadeFraction;

// //   // Do we have 3 colors for the gradient? Need to adjust the params.
// //   if (rgbColor3) {
// //     fade = fade * 2;

// //     // Find which interval to use and adjust the fade percentage
// //     if (fade >= 1) {
// //       fade -= 1;
// //       color1 = rgbColor2;
// //       color2 = rgbColor3;
// //     }
// //   }

// //   var diffRed = color2.red - color1.red;
// //   var diffGreen = color2.green - color1.green;
// //   var diffBlue = color2.blue - color1.blue;

// //   var gradient = {
// //     red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
// //     green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
// //     blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
// //   };

// //   var rgb = 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';

// //   return rgb;
// // }

// // function getColor(password) {
// //   var strength = password.strength;
// //   return colorGradient(strength, {
// //     red: 255,
// //     green: 0,
// //     blue: 0
// //   }, {
// //     red: 0,
// //     green: 255,
// //     blue: 0
// //   }, {
// //     red: 200,
// //     green: 247,
// //     blue: 200
// //   });


// // }

// // function getFontWeight(password) {
// //   return password["isEarth"] ? "bold" : "normal";
// // }

// // function getFontSize(password) {
// //   return password["isEarth"] ? "30px" : "20px";
// // }

// // function getDropShadow(password) {
// //   return password["isEarth"] ? "url(#red-glow)" : "";
// // }



// // $(document).ready(function () {
// //   let points = [];

// //   function update() {
// //     var rr = document.getElementById("radius_range");
// //     var wr = document.getElementById("width_range");
// //     var hr = document.getElementById("height_range");
// //     var tor = document.getElementById("text_opacity_range");

// //     svg.selectAll("circle").data(points).enter()
// //       .append("circle")
// //       .on("mouseover", function (d, i) {
// //         d3.select(this).attr("fill", "white");
// //       })
// //       .on("mouseout", function (d) {
// //         return d3.select(this).attr("fill", getColor(d));
// //       })
// //       .on("click", function (d, i) {
// //         setCentre(d);
// //       });




// //     svg.selectAll("text")
// //       .data(points)
// //       .enter()
// //       .append("text")
// //       .attr("fill", "white")
// //       .text(function (d) {
// //         return d.name;
// //       })
// //       .on("mouseover", function (d, i) {
// //         console.log(d.name);
// //       })
// //       .style("mix-blend-mode", "exclusion")
// //       .style("font-weight", function (d) {
// //         return getFontWeight(d);
// //       })
// //       .style("font-size", function (d) {
// //         return getFontSize(d);
// //       });
// //     // modify width of universe from width slider
// //     var position_x = 0.01 * (wr.value - 100);
// //     var text_offset_x = 20;
// //     // modify height of universe from slider
// //     var position_y = 0.01 * (hr.value - 100);
// //     var text_offset_y = 0;

// //     d3.selectAll("circle")
// //       .transition().duration(1000)
// //       .style("filter", function (d) {
// //         return getDropShadow(d)
// //       })
// //       .attr("cx", function (d) {
// //         d["posx"] = position_x * d.x;
// //         return position_x * d.x;
// //       })
// //       .attr("cy", function (d) {
// //         d["posy"] = position_y * d.y;
// //         return position_y * d.y;
// //       })
// //       .attr("r", rr.value * 0.2)
// //       .attr("fill", function (d) {
// //         return getColor(d);
// //       });

// //     d3.selectAll("text")
// //       .style("font-weight", function (d) {
// //         return getFontWeight(d);
// //       })
// //       .transition().duration(1000)
// //       .attr("x", function (d) {
// //         return d.x * position_x + text_offset_x;
// //       })
// //       .attr("y", function (d) {
// //         return d.y * position_y + text_offset_y;
// //       })
// //       .text(function (d) {
// //         return d.name;
// //       })
// //       .style("font-size", function (d) {
// //         return getFontSize(d);
// //       });



// //     // modify text opacity from slider


// //     d3.selectAll("text").attr("fill", "rgb(255, 255, 255, " + tor.value / 100 + ")");

// //   }



// //   var svg = d3.select("#universe").attr("background-color", "#000")
// //     .call(d3.zoom().on("zoom", function () {
// //       svg.attr("transform", d3.event.transform)
// //     }))
// //     .append("g");


// //   /** 
// //    * Convert a point to a new point with screen coordinates.
// //    */
// //   function toScreenCoordinates(point) {
// //     let p = point;
// //     p.x = point.ox * window.innerWidth;
// //     p.y = point.oy * window.innerWidth;

// //     return p;
// //   }

// //   function finishedLoading() {
// //     d3.select("#loading").remove();
// //   }

// //   /**
// //          Get json object of points.

// //          Example:
// //          points = {
// //            password: {
// //              x: 0.4,
// //              y: 0.3
// //             },
// //             ...
// //           }
// //           */

// //   $.get(`${ADDRESS}/points&amount=${PASSWORD_AMOUNT}`, function (response) {
// //     // Plot these points using d3.js
// //     finishedLoading();

// //     points = response.points;

// //     // transform stars from ox,oy to x,y

// //     for (var i = 0; i < points.length; i++) {
// //       points[i] = toScreenCoordinates(points[i]);
// //     }
// //     update();

// //   });

// //   function setCentre(d) {
// //     // move this star to center
// //     // position all other stars around it

// //     // we only need to change d.x and d.y for each star but use d.ox and d.oy to get there
// //     function angle(b) {
// //       let dx = b.ox - d.ox;
// //       let dy = d.oy - b.oy;
// //       let angle = Math.atan2(dx, dy);
// //       return angle;
// //     }

// //     function magnitude(b) {
// //       let m = Math.sqrt(Math.abs((d.ox - b.ox) * (d.ox - b.ox) - (d.oy - b.oy) * (d.oy - b.oy)));
// //       return m;
// //     }

// //     for (var i = 0; i < points.length; i++) {
// //       points[i]["distanceFromOrigin"] = magnitude(points[i]);
// //       points[i]["angleFromOrigin"] = angle(points[i]);
// //       points[i]["isEarth"] = false;
// //     }

// //     // clone points list
// //     var points2 = [];
// //     for (var i = 0; i < points.length; i++) {
// //       points2[i] = points[i];
// //     }

// //     points2.sort((a, b) => ((a.angleFromOrigin) > (b.angleFromOrigin)) ? 1 : -1);
// //     // points.sort((a, b) => ((a.angleFromOrigin) > (b.angleFromOrigin)) ? 1 : -1);
// //     d.x = 0;
// //     d.y = 0;
// //     d["isEarth"] = true;


// //     // Preserve the ordering of the original `points` list otherwise they are mixed up on canvas
// //     // TODO: Figure out a ID or key system where the original points list can be mixed around without affecting the canvas
// //     for (var i = 0; i < points.length; i++) {
// //       for (var j = 0; j < points.length; j++) {
// //         if (points[j].name == points2[i].name) {
// //           points[j].x = window.innerWidth * (d.x + points2[i].distanceFromOrigin * Math.sin((i * 2 * Math
// //             .PI) / points.length));
// //           points[j].y = window.innerWidth * (d.y + points2[i].distanceFromOrigin * Math.cos((i * 2 * Math
// //             .PI) / points.length));
// //         }
// //       }
// //     }

// //     update();
// //   }

// //   $("#radius_range").on("input", update);
// //   $("#width_range").on("input", update);
// //   $("#height_range").on("input", update);
// //   $("#text_opacity_range").on("input", update);

// //   $("#reset_view_button").on("click", function () {
// //     for (var i = 0; i < points.length; i++) {
// //       points[i] = toScreenCoordinates(points[i]);
// //       points[i]["isEarth"] = false;

// //     }
// //     update();
// //   });

// //   $("#add_star_button").on("click", function () {
// //     var add = document.getElementById("add_star");
// //     var new_password = add.value;

// //     $.get(`${ADDRESS}/position/${new_password}`, function (response) {
// //       var alreadyIn = false;
// //       for (var i = 0; i < points.length; i++) {
// //         if (points[i].name == new_password) {
// //           alreadyIn = true;
// //           break;
// //         }
// //       }


// //       if (!alreadyIn) {
// //         response = toScreenCoordinates(response);

// //         points.push(response);
// //         setCentre(points[points.length - 1]);
// //       } else {
// //         for (var i = 0; i < points.length; i++) {
// //           if (points[i].name == new_password) {
// //             return setCentre(points[i]);
// //           }
// //         }
// //       }

// //     });
// //   });
// // });
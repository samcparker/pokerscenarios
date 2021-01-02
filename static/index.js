import Controller from "./controller.js";

var controller = new Controller();
var parameters = {};

let params = (new URL(document.location)).searchParams;

const origin_x = window.innerWidth / 2;
const origin_y = window.innerHeight / 2;


let svg = d3.select("#universe")
  .attr("background-color", "#000")
  // .call(d3.zoom().on("zoom", function () {
  //   svg.attr("transform", d3.event.transform);
  // }))

  .append("g");

for (var i = 0; i < 100; i++) {
  svg.append("circle")
    .attr("cx", origin_x)
    .attr("cy", origin_y)
    .attr("r", i * 20)
    .attr("fill", "rgba(0, 0, 0, 0)")
    .style("stroke", `rgb(255, 255, 255, ${0.2 * (1 - (i * 0.01))})`);
}

svg.append("text")
  .attr("id", "universe-not-exist-message")
  .attr("x", origin_x)
  .attr("y", origin_y)
  .attr("text-anchor", "middle")
  .attr("fill", "rgb(200, 200, 200)")
  .style("font", "bold 40px sans-serif")
  .style("vertical-align", "middle")
  .text("GENERATE OR LOAD A UNIVERSE");

svg.append("text")
  .attr("id", "universe-is-loading")
  .attr("x", origin_x)
  .attr("y", origin_y)
  .attr("text-anchor", "middle")
  .attr("fill", "rgb(200, 200, 200)")
  .style("font", "bold 40px sans-serif")
  .style("vertical-align", "middle")
  .text("UNIVERSE IS LOADING...")
  .style("visibility", "hidden");


var data = null;

var scale = 1;

var _3d = d3._3d()
  .origin([0, 0])
  .scale(scale)
  .shape("POINT")
  .x(function (d) {
    return d.ox;
  })
  .y(function (d) {
    return d.oy;
  })
  .z(function (d) {
    return d.oz || "0";
  });


var mx, mouseX, my, mouseY;
var alpha = 0,
  beta = 0;

function dragStart() {
  mx = d3.event.x;
  my = d3.event.y;


}

function dragged() {
  // if no data, do nothing or it will error
  if (!data) return;

  mouseX = mouseX || 0;
  mouseY = mouseY || 0;
  beta = (d3.event.x - mx + mouseX) * Math.PI / 360;
  alpha = (d3.event.y - my + mouseY) * Math.PI / 720 * (-1);

  update(_3d.rotateY(beta).rotateX(alpha)(data));


}

function dragEnd() {
  mouseX = d3.event.x - mx + mouseX;
  mouseY = d3.event.y - my + mouseY;
}



function update(points) {
  if (points) {

    console.log(controller.no_dimensions);
    if (controller.no_dimensions == 3) {
      svg.call(d3.drag().on("drag", dragged).on("start", dragStart).on("end", dragEnd));
    } else if (controller.no_dimensions == 2) {
      d3.select("#universe").call(d3.zoom().on("zoom", function () {
        d3.select("g").attr("transform", d3.event.transform)
      }))
    }


    data = points;
    d3.select("#universe-not-exist-message").remove();

    var projectedData = _3d(points);
    const stars = svg.selectAll(".star").data(projectedData, function (d) {
      return d.name;
    });



    stars.exit()
      .remove();
    stars.enter()
      .append("circle").attr("class", "star")
      .attr("fill", function (d) {
        return `hsl(${d.strength * 100}, 100%, 50%)`;
      })
      .on("click", function (d) {
        if (controller.no_dimensions == 2) {
          controller.centreStar(d, function (points) {
            console.log("centering star");
            update(points);
          });

        }
      });
    stars.on("mouseover", function (d) {
      return `hsl(${d.strength * 100}, 100%, 70%)`;
    });
    stars.on("mouseleave", function (d) {
      return `hsl(${d.strength * 100}, 100%, 50%)`;
    });

    const annotations = svg.selectAll(".annot").data(points, function (d) {
      return d.name;
    });

    annotations.exit()
      .remove();
    annotations.enter()
      .append("text").attr("class", "annot")
      .text(function (d) {
        return d.name;
      });
  }

  // sort the stars based on their centroid's z
  svg.selectAll(".star").sort(function (a, b) {
    var _a = a.centroid.z,
      _b = b.centroid.z;
    return _a > _b ? -1 : _a < _b ? 1 : _a >= _b ? 0 : NaN;
  });

  svg.selectAll(".star")
    .transition()
    .duration(function () {
      if (controller.no_dimensions == 3) {
        return 0;
      }
      return 1000;
    })
    .attr("r", function (d) {
      var brightness = d.brightness || 0;
      console.log(brightness);
      return brightness * 0.01 * parameters.radius + 1;
    })
    .attr("cx", function (d) {
      if (controller.no_dimensions == 3) {
        return d.projected.x * parameters.width + origin_x;
      }
      if (d.hasOrigin) {
        return origin_x + d.mx * parameters.width;
      }
      return d.ox * parameters.width + origin_x;
    })
    .attr("cy", function (d) {
      if (controller.no_dimensions == 3) {
        return d.projected.y * parameters.height + origin_y;
      }
      if (d.hasOrigin) {
        return origin_y + d.my * parameters.height;
      }
      return d.oy * parameters.height + origin_y;
    })
    .style("opacity", function (d) {
      if (controller.test(d.name)) {
        return 1;
      }
      return 0.04;
    });

  svg.selectAll(".annot")
    .transition()
    .duration(function () {
      if (controller.no_dimensions == 3) {
        return 0;
      }
      return 1000;
    })
    .attr("x", function (d) {
      if (controller.no_dimensions == 3) {
        return d.projected.x * parameters.width + origin_x;
      }
      if (d.hasOrigin) {
        return origin_x + d.mx * parameters.width;
      }
      return d.ox * parameters.width + origin_x;
    })
    .attr("y", function (d) {
      if (controller.no_dimensions == 3) {
        return d.projected.y * parameters.height + origin_y;
      }
      if (d.hasOrigin) {
        return origin_y + d.my * parameters.height;
      }
      return d.oy * parameters.height + origin_y;
    })
    .attr("fill", `rgba(255, 255, 255, ${parameters.text_opacity})`)
    .style("font-weight", function (d) {
      if (d.isEarth) {
        return "bold";
      }
      return "normal";
    })
    .style("visibility", function (d) {
      // show annotation if its annotation weight exceeds the user-given one and if it applies to the given search
      if (d.isEarth || (d.annot_weight < parameters.annotation_range && controller.test(d.name))) {
        return "visible";
      }
      return "hidden";
    });


  //   var stars = svg.selectAll(".star");

  //   data = points;

  //   var projectedData = _3d(points);
  //   stars.data(projectedData, function(d) { return d.name; });

  //   stars.enter()
  //   .append("circle")
  //   .attr("class", "star")
  //   .attr("fill", function (d) {
  //             return `hsl(${d.strength * 100}, 100%, 50%)`;
  //           });

  //   // transform points in 3D


  //   // stars
  //   // .attr("cx", function(d) { return ; })
  //   // .attr("cy", function(d) { return d.projected.y; })
  //   // .attr("r", 5);

  // console.log("R: ", parameters.radius);
  //     // Update all stars
  //   svg.selectAll(".star")
  //     .attr("r", parameters.radius)
  //     .attr("cx", function (d) {
  //       // if (d.hasOrigin) {
  //       //   return origin_x + d.mx * parameters.width;
  //       // }
  //       console.log(parameters.width);
  //       return d.projected.x;// * parameters.width;
  //     })
  //     .attr("cy", function (d) {
  //       // if (d.hasOrigin) {
  //       //   return origin_y + d.my * parameters.height;
  //       // }
  //       return d.projected.y ;//* parameters.height;
  //     })
  //     .style("opacity", function (d) {
  //       if (controller.test(d.name)) {
  //         return 1;
  //       }
  //       return 0.04;
  //     });

}

// function update(points) {
//   // Add stars that have been added to list

//   if (controller.isLoading()) {
//     // add loading message
//     d3.select("#universe-is-loading")
//       .style("visibility", "visible");
//     d3.select("#universe-not-exist-message").remove();
//   } else {
//     d3.select("#universe-is-loading")
//       .style("visibility", "hidden");
//   }


//   if (points) {

//     d3.select("#universe-not-exist-message").remove();

//     const stars = svg.selectAll(".star").data(points, function (d) {
//       return d.name;
//     });

//     stars.exit()
//       .remove();
//     stars.enter()
//       .append("circle").attr("class", "star")
//       .attr("fill", function (d) {
//         return `hsl(${d.strength * 100}, 100%, 50%)`;
//       })
//       .on("click", function (d) {
//         controller.centreStar(d, function (points) {
//           update(points);
//         });
//       });

//     const annotations = svg.selectAll(".annot").data(points, function (d) {
//       return d.name;
//     });

//     annotations.exit()
//       .remove();
//     annotations.enter()
//       .append("text").attr("class", "annot")
//       .text(function (d) {
//         return d.name;
//       });
//   }



//   svg.selectAll(".annot")
//     .transition()
//     .duration(1000)
//     .attr("x", function (d) {
//       if (d.hasOrigin) {
//         return origin_x + 10 + d.mx * parameters.width;
//       }
//       return origin_x + 10 + d.ox * parameters.width;

//     })
//     .attr("y", function (d) {
//       if (d.hasOrigin) {
//         return origin_y + 10 + d.my * parameters.height;
//       }
//       return origin_y + 10 + d.oy * parameters.height;
//     })
//     .attr("fill", `rgba(255, 255, 255, ${parameters.text_opacity})`)
//     .style("font-weight", function (d) {
//       if (d.isEarth) {
//         return "bold";
//       }
//       return "normal";
//     })
//     .style("visibility", function (d) {
//       // show annotation if its annotation weight exceeds the user-given one and if it applies to the given search
//       if (d.isEarth || (d.annot_weight < parameters.annotation_range && controller.test(d.name))) {
//         return "visible";
//       }
//       return "hidden";
//     });
// }

// Get initial points and display on canvas
// controller.getPoints(PASSWORD_AMOUNT, function (points) {
//   update(points);
// });

/**
 * Generate universe listener
 * 
 * TODO: Disable this button until response has been made!
 */
var receivedResponse = true;
d3.select("#generate_universe").on("click", function () {
  // Prevent making any new requests until old one has finished
  if (!receivedResponse) {
    return;
  }

  var btn = d3.select(this);
  btn.attr("disabled", true);

  var params = {
    amount: document.getElementById("number_of_stars").value,
    password_db: document.getElementById("password_db").value,
    dr_method: document.getElementById("dimensionality_reduction_method").value,
    linear_regression: document.getElementById("linear_regression").checked,
    no_dimensions: document.getElementById("no_dimensions").value,
    extra_passwords: document.getElementById("extra_passwords").value
  };


  controller.generateUniverse(params, function (points) {
    receivedResponse = true;
    btn.attr("disabled", null);
    update(points);
  });
  // update with a list of empty points to hide old universe
  update([]);
});

/**
 * Click listener on Reset View button to reset stars back to default positions
 */
d3.select("#reset_view_button").on("click", function () {
  controller.centreStar(null, function (points) {
    update(points);
  });

  // svg.transition()
  //   .duration(750)
  //   .call(zoom.transform, d3.zoomIdentity);
});

d3.select("#screenshot_button").on("click", function () {
  // save-svg-as-png(document.getElementById("#universe"), "universe.png");
  controller.screenshot();
});

d3.select("#load_file_button").on("click", function () {
  // update with a list of empty points to hide old universe
  controller.load(function (points) {
    update(points);
  });
  update([]);
});

d3.select("#search_button").on("click", function () {
  controller.setRegex(document.getElementById("search").value);
  update();
});

/**
 * Click listener on Add Star/Centre Star
 */
d3.select("#add_star_button").on("click", function () {
  controller.addStar(document.getElementById("add_star").value, function (points) {
    update(points);
  });
});

let modifiers = {
  radius: function (d) {
    return d * 0.01 * 30;
  },
  width: function (d) {
    return window.innerWidth * (d - 100) * 0.005;
  },
  height: function (d) {
    return window.innerWidth * (d - 100) * 0.005;
  },
  text_opacity: function (d) {
    return d * 0.01;
  },
  annotation_range: function (d) {
    return d * 0.002;
  }
};

d3.select("#radius_range").on("input", function () {
  parameters.radius = modifiers.radius(this.value);
  update();
});
parameters.radius = modifiers.radius(document.getElementById("radius_range").value);

d3.select("#width_range").on("input", function () {
  parameters.width = modifiers.width(this.value);
  update();
});
parameters.width = modifiers.width(document.getElementById("width_range").value);

d3.select("#height_range").on("input", function () {
  parameters.height = modifiers.height(this.value);
  update();
});
parameters.height = modifiers.height(document.getElementById("height_range").value);

d3.select("#text_opacity_range").on("input", function () {
  parameters.text_opacity = modifiers.text_opacity(this.value);
  update();
});
parameters.text_opacity = modifiers.text_opacity(document.getElementById("text_opacity_range").value);

d3.select("#annotation_range").on("input", function () {
  parameters.annotation_range = modifiers.annotation_range(this.value);
  update();
});
parameters.annotation_range = modifiers.annotation_range(document.getElementById("annotation_range").value);
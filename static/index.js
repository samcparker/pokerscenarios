import Controller from "./controller.js";

var controller = new Controller();
var parameters = {};

let params = (new URL(document.location)).searchParams;
const PASSWORD_AMOUNT = params.get("amount") || 50;


const origin_x = window.innerWidth / 2;
const origin_y = window.innerHeight / 2;

let svg = d3.select("#universe")
  .attr("background-color", "#000")
  .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform);
  }))
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

function update(points) {
  // Add stars that have been added to list

  if (controller.isLoading()) {
    // add loading message
    d3.select("#universe-is-loading")
      .style("visibility", "visible");
    d3.select("#universe-not-exist-message").remove();
  } else {
    d3.select("#universe-is-loading")
      .style("visibility", "hidden");
  }


  if (points) {

    d3.select("#universe-not-exist-message").remove();

    const stars = svg.selectAll(".star").data(points, function (d) {
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
        controller.centreStar(d, function (points) {
          update(points);
        });
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

  // Update all stars
  svg.selectAll(".star")
    .transition()
    .duration(1000)
    .attr("r", parameters.radius)
    .attr("cx", function (d) {
      if (d.hasOrigin) {
        return origin_x + d.mx * parameters.width;
      }
      return origin_x + d.ox * parameters.width;
    })
    .attr("cy", function (d) {
      if (d.hasOrigin) {
        return origin_y + d.my * parameters.height;
      }
      return origin_y + d.oy * parameters.height;
    })
    .style("opacity", function (d) {
      if (controller.test(d.name)) {
        return 1;
      }
      return 0.04;
    });

  svg.selectAll(".annot")
    .transition()
    .duration(1000)
    .attr("x", function (d) {
      if (d.hasOrigin) {
        return origin_x + 10 + d.mx * parameters.width;
      }
      return origin_x + 10 + d.ox * parameters.width;

    })
    .attr("y", function (d) {
      if (d.hasOrigin) {
        return origin_y + 10 + d.my * parameters.height;
      }
      return origin_y + 10 + d.oy * parameters.height;
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

}

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
    name: document.getElementById("universe_name").value,
    amount: document.getElementById("number_of_stars").value,
    password_db: document.getElementById("password_db").value,
    dr_method: document.getElementById("dimensionality_reduction_method").value,
    linear_regression: document.getElementById("linear_regression").checked,
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
});

d3.select("#screenshot_button").on("click", function () {
  // save-svg-as-png(document.getElementById("#universe"), "universe.png");
  controller.screenshot();
});

d3.select("#load_file_button").on("click", function () {
  // update with a list of empty points to hide old universe
  controller.loadUniverse(function (points) {
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
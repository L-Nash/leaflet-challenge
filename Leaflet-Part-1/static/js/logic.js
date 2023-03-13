//set up initial map coordianates
var QuakeMap = L.map("map", {
  center: [8.86763, 8.042843],
  zoom: 3
});

//add layer to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(QuakeMap);

//establish where data is stored
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

//get data
d3.json(link).then(function(data) {
  // Plot all earthquakes
layer1 =   L.geoJson(data, {
    pointToLayer: formatMarkers,
    }).addTo(QuakeMap);
 

/// Add function to creat markers size = magnitude
function formatMarkers (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: feature.properties.mag *1.5,
        fillColor: setColor(feature.geometry.coordinates[2]),
        color: "#006d2c",
        weight: 1,
        opacity: 1,
        fillOpacity: .8
            }).bindPopup(`<h3>${feature.properties.place}</h3> <hr> <h3>Magnitude: ${feature.properties.mag} </h3> <h3>Depth: ${feature.geometry.coordinates[2]}</h3>`);
        };


console.log(data.features);  

// function to set color
function setColor(depth) {
    if (depth > 90) return "#bd0026";
    else if (depth> 70) return "#f03b20";
    else if (depth > 50) return "#fd8d3c";
    else if (depth > 30) return "#feb24c";
    else if (depth > 10) return "#fed976";
    else return "#ffffb2";
};

// // add legend
var legend = L.control({ position: "bottomright" });



legend.onAdd = function(QuakeMap) {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0, 10, 30, 50, 70, 90]
    
    var labels = [];

    var legendInfo = "<h1>Earthquake Depth</h1>" 

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<div style=\"background-color: " + setColor(limits[index]) + "\">" + limits[index] + (limits[index + 1] ? "&ndash;" + limits[index + 1] + "<br>" : "+</div>"))
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
    };


// // Adding the legend to the map
    legend.addTo(QuakeMap);

});


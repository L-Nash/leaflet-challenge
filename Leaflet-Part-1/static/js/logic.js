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
data = d3.json(link).then(function(data) {
  // Plot all earthquakes
  L.geoJson(data, {
    pointToLayer: formatMarkers,
    }).addTo(QuakeMap).bindPopup();
 

/// Add function to creat markers size = magnitude
function formatMarkers (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: feature.properties.mag,
        fillColor: setColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
            });
        };


console.log(data.features);  

// function to set color
function setColor(depth) {
    if (depth > 90) return "red";
    else if (depth> 70) return "orange";
    else if (depth > 50) return "yellow";
    else if (depth > 30) return "green";
    else if (depth > 10) return "pink";
    else return "blue";
}
//add popups
function popUpWording(latlng)) {
    return (`<h1>${feature.properties.place}</h1> <hr> <h3>Magnitude ${feature.properties.mag}</h3> <h3>Depth ${feature.geometry.coordinates[2]}</h3>`)
}


// add legend

});
var accessToken = API_KEY;
const map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    id: 'mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoom: 14,
    zoomOffset: -1
}).addTo(map);

L.geoJson(statesData).addTo(map);


// add color function: red = #8B0000, blue = #0000FF, hover = #D3D3D3

// *TODO: fill data here 

// function getColor(candidate) {
//     return '#8B0000'
// }

function style(feature) {
    return {
        fillColor: '#8B0000',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 1
    };
}

L.geoJson(statesData, {style: style}).addTo(map);


// INTERACTIVE ELEMENT

// mouseover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: '#D3D3D3',
        weight: 5,
        color: 'white',
        dashArray: '1',
        fillOpacity: 1
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    console.log(e)
    
    var link = $('<a href="#" class="speciallink">'+e.target.feature.properties.name+'</a>').click(function() {
        alert("test");
    })[0];
    


    layer.bindPopup(link);
    this.openPopup();

    
};


// mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

// make geoJSON layer accessible through variable by defining it and assigning layer to it
var geojson;
geojson = L.geoJson(statesData, {style: style});

// create hover function that calls functions for mouseover and mouseout
function hover (feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

L.geoJson(statesData, {
    style: style,
    onEachFeature: hover
}).addTo(map);

//add event handler onclick 


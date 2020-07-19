var accessToken = API_KEY;
var map = L.map('map').setView([37.8, -96], 4);

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
// var pctData = "REP.json"
// var pctjson; 
// var pct = [];

// // grab data
// // console.log(pctData);


// console.log(pct)


// function getColor() {
//     d3.json(pctData).then(function(data){
//         data.forEach(i => pct.push(i[3]))
//         console.log(pct)
//         for (var d = 0; d < pct.length; d++) {
//             if (d >= 45) {
//                 console.log("#8B0000")
//                 return "#8B0000"
//             } else if (d >= 40) {
//                 console.log("#F5F5DC")
//                 return "#F5F5DC"
//             } else if (d < 40) {
//                 console.log("#0000FF")
//                 return "#0000FF"
//             }
//         }
//     })
// }

function getColor(d){
    return d > 50 ? "#8B0000":
                    "#0000FF"
}



// function getColor(array) {
//     for (var d = 0; d < pct.length; d++) {
//         if (d > 50) {
//             console.log("#8B0000")
//         } else {
//             console.log("#0000FF")
//         }
//     }
// }

// getColor(pct)

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
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
    
    var link = $('<a href="../static_state_page/project2_index.html" class="speciallink">'+e.target.feature.properties.name+'</a>').click()[0];
    
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

console.log(statesData)



// Fetch the JSON data and console log it
function readdata(idname) {
    d3.json("../static_state_page/samples.json").then((data) => {
        var id_data = data.metadata;
        var filter_data = id_data.filter(x => x.id == idname);
        filter_data = filter_data[0];
        var metadata = d3.select("#sample-metadata");
        metadata.html("");
        Object.entries(filter_data).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });


    });
}

function dropdown() {
    var id_dropdown = d3.select("#selDataset");
    d3.json("../static_state_page/samples.json").then((data) => {
        var id_names = data.names;
        id_names.forEach((ids) => {
            id_dropdown.append("option").text(ids).property("value", ids);
        })
    });
}

function optionChanged(newid) {
    readdata(newid);
    updatebarPlot(newid);
    updatebubblePlot(newid);
}

function updatebarPlot(idname) {
    d3.json("../static_state_page/samples.json").then((data) => {
        var id_data = data.samples;
        var filter_data = id_data.filter(x => x.id == idname);
        // filter_data = filter_data[0];
        var otuids = filter_data.otu_ids;
        var otulabels = filter_data.otu_labels;
        var samplevalue = filter_data.sample_values;
        var yaxisdata = otuids;

        var trace = [{
                y: yaxisdata,
                text: otulabels,
                x: samplevalue,
                type: "bar",
                orientation: "h"

            }

        ];
        var layout = {
            title: "Top 10 OTU IDs with their Labels and Values"
        };
        Plotly.newPlot("bar", trace, layout);


    });
}

readdata(940);
dropdown();
updatebarPlot(940);
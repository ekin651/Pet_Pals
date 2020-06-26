var url = "data/samples.json";

function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
        // Fetch new data each time a new sample is selected
    createBarchart(newSample);
    createBubbleChart(newSample);
    buildMetadata(newSample);
}

function buildMetadata(sample) {
    // write code to create the buildMetadata
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json(url).then(function(data) {
        // Create a variable to hold the metadata
        var metadata = data.metadata.filter(meta => meta.id.toString() === sample)[0];
        // console.log(metadata)
        // Create a variable to hold the metadata filtered by id
        // Create a variable for metadata and select by div id in html
        var demoInfo = d3.select("#sample-metadata");
        // Clear existing metadata prior to retrieving new metadata
        demoInfo.html("");
        // Append the new metadata
        Object.entries(metadata).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key}: ${value}`);
        });
    });

}
// Build a Bubble Chart and Bar chart

function buildCharts(barbubble) {
    // write code to create the buildcharts 
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var filterdata = samples.filter(sampleObj => sampleObj.id == barbubble);
        var chartsdata = filterdata[0];

        var otu_ids = chartsdata.otu_ids;
        var otu_labels = chartsdata.otu_labels;
        var sample_values = chartsdata.sample_values;

        // Build a Bubble Chart
        // specify layout format parameters
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Portland'
            }
        }];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Build a BarChart

        var yVal = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [{
            y: yVal,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h",
            type: "bar",

        }];
        // specify layout format parameters 
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);
    });
}



function init() {
    var dropdown = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        data['names'].forEach((name) => {
            dropdown
                .append("option")
                .text(name)
                .property("value", name)
        });
        buildCharts(data.names[0]);
        console.log(data.names[0]);

        buildMetadata(data.names[0]);
    })
};
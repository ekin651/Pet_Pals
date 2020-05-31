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
  d3.json(url).then(function (data) {
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
  // bonus only
  // buildGauge()
}
function createBarchart(filterID) {
  // write code to create barchart
  // console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
  d3.json(url).then(function (data) {
    console.log("this is data inside cretebarchart :: ", data);
    // Grab values from the response json object to build the plots
    var sampleData = data.samples.filter(sample => sample.id.toString() === filterID);
    console.log("sample data :: ", sampleData);
    var otuIDs = sampleData[0]['otu_ids'];
    console.log("this is my otuIDs :: ", otuIDs);

    var otu10 = otuIDs.slice(0, 10).reverse();
    console.log("this is my top ten IDs :: ", otu10);

    var sample_values = sampleData[0].sample_values.slice(0, 10).reverse();
    console.log("this is my top ten sample values :: ", otu10);

    var otuID = otu10.map(id => "OTU" + id);
    var trace1 = {
      type: "bar",
      x: sample_values,
      y: otuID,
      orientation: "h"
    };
    var chartData = [trace1];
    var layout = {
      title: `OTU`,
    };
    Plotly.newPlot("bar", chartData, layout);
  });
}
// function createBubbleChart(sample) {
//   // write code to create the BubbleChart
//   console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
//   d3.json(url).then(function (data) {
//     // Grab values from the response json object to build the plots
//     var samples = data.sample.filter(s => s.id.toString() === sample)[0];
//     var x_val = samples.otu_ids;
//     var y_val = sampleData.sample_values;
//     var marker_size = sampleData.sample_values;
//     var color = samples.otu_ids;
//     var text = samples.otu_lables;
//     var trace1 = {
//       type: "bar",
//       x: x_val,
//       y: y_val,
//       text: text,
//       mode: "marker",
//       marker: {
//         color: color,
//         size: marker_size,
//         colorscale: "Rainbow"
//       }
//     };
//     var bubbledata = [trace1];
//     var layout = {
//       title: `OTU`,
//       xaxis: { title: "OOOO" }
//     };
//     Plotly.newPlot("bubbe", bubbledata, layout);
//   });
// }
function init() {
  var dropdown = d3.select("#selDataset");
  d3.json(url).then(function (data) {
    data['names'].forEach((name) => {
      dropdown
        .append("option")
        .text(name)
        .property("value", name)
    });
    createBarchart(data.names[0]);
    console.log(data.names[0]);
    // createBubbleChart(data.names[0]);
    buildMetadata(data.names[0]);
  })
};
  // });

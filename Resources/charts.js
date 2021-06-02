function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var  otu_ids = result.otu_ids;
    //console.log(otu_ids);
    var otu_labels = result.otu_labels.slice(0, 10).reverse();
    var sample_values = result.sample_values.slice(0,10).reverse();

    var bubble_Labels = result.otu_labels;
    var bubble_Values = result.sample_values;
    //deliverable ii
  // 1. Create the trace for the bubble chart.
  var bubbleData = [{
    x: otu_ids,
    y: bubble_Values,
    text: bubble_Labels,
    mode: "markers",
     marker: {
       size: bubble_Values,
       color: bubble_Values,
       colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], 
       [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], 
       [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']]
     }
  }];
  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    title: {text: "<b>Bacteria Cultures Per Each Sample</b>",},
    xaxis: {title: "<b>OTU id</b>",
    height: 600,
    width: 1000},
    showlegend: false,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
  },
    hovermode: "closest"
};
  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    // these are for assignment ii
    var bubble_Labels = result.otu_labels;
    var bubble_Values = result.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // we create like a python f string accoridng to Jonathan 

    var yticks = otu_ids.map(sampleObj => 
      `OTU ${sampleObj}`).slice(0,10).reverse();

      
    // 8. Create the trace for the bar chart. 
    var barData = [{
        x: sample_values,
        y: yticks,
        type: "bar",
        orientation: "h",
        color: "blue",
        text: otu_labels 
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    
      title: {text: "<b> Top 10 OTU Found</b>", width: 500, height: 500, }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var metadata = data.metadata;
      var gaugeArray = metadata.filter(metaObj => metaObj.id == sample);  
      var gaugeResult = gaugeArray[0]; 

 // 3. Create a variable that holds the washing frequency.  
 var wfreqs = gaugeResult.wfreq;

 var gaugeData = [{
  value: wfreqs,
  type: "indicator",
  mode: "gauge+number",
  title: {text: "<b> BB Washing Frequency </b> <br></br> Scrubs Per Week", width: 500, height: 500, },
  gauge: {
    xaxis: {range: [0,10], dtick: "2", zeroline: false, 
    line: {
     color: "purple"
   }},

 

    bar: {color: "black"},
    steps:[
      {range: [0, 2], color: "red"},
      {range: [2, 4], color: "orange"},
      {range: [4, 6], color: "yellow"},
      {range: [6, 8], color: "lightgreen"},
      {range: [8, 10], color: "green"}
    ],
    dtick: 2
  }
}];

// 5. Create the layout for the gauge chart.
var gaugeLayout = { 
 automargin: true,
 
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeData, gaugeLayout)

 
  });

 
};

// the deliverable 3 starter code  asks for a lot of stuff
//that was already created in the other assignments, therefore 
// pls see slightly cleaned up version


 // 1. Create a variable that filters the metadata array for the object with the desired sample number.
 //var metadata = data.metadata;
 //var gaugeArray = metadata.filter(metaObj => metaObj.id == sample);  

 // 2. Create a variable that holds the first sample in the metadata array.
     

 // 4. Create the trace for the gauge chart.
 
 

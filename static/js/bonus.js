// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  //use init() to initialize the dashboard 
  function init() {
  
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
  
      // Use D3 to get sample names and populate the drop-down selector
      d3.json(url).then((data) => {
          
          // Set a variable for the sample names
          let names = data.names;
  
          // Add  samples to dropdown menu
          names.forEach((id) => {
  
              // Log the value of id for each iteration of the loop
              console.log(id);
  
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // Set the first sample from the list
          let first_sample = names[0];
  
          // Log the value of sample_one
          console.log(first_sample);
  
          // Build the initial plots
          guagechart(first_sample);
      });
  };
  

  // Function that builds the gauge chart
    function guagechart(sample) {
  
      //Fetch the Json data - we need the wash freequency not taken before
      d3.json(url).then((data) => {
  
          //pull the demo data
          let metadata = data.metadata;
  
          //filter the demo data based on the value
          let value = metadata.filter(result => result.id == sample);
  
          //Log the array of metadata objects after filtered
          console.log(value)
  
          //find the first value (index)from the array
          let guage_chart = value[0];
  
          // Use Object.entries to get the key/value pairs and put into the demographics box on the page
          let wash = Object.values(guage_chart)[6];
          
          //Setting up the trace for the guage chart (see https://plotly.com/javascript/gauge-charts/)
          let trace3 = {
              value: wash,
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 20}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                  axis: {range: [0,10], tickmode: "linear", tick0: 0, dtick: 1},
                  bar: {color: "rgba(102, 51, 153, .9 )"},
                  steps: [
                      {range: [0, 1], color: "rgba(140, 20, 252, 0)"},
                      {range: [1, 2], color: "rgba(140, 20, 252, .1)"},
                      {range: [2, 3], color: "rgba(140, 20, 252, .2)"},
                      {range: [3, 4], color:  "rgba(140, 20, 252, .3)"},
                      {range: [4, 5], color:  "rgba(140, 20, 252, .4)"},
                      {range: [5, 6], color: "rgba(140, 20, 252, .5)"},
                      {range: [6, 7], color: "rgba(140, 20, 252, .6)"},
                      {range: [7, 8], color:  "rgba(140, 20, 252, .7)"},
                      {range: [8, 9], color: "rgba(140, 20, 252, .8)"},
                      {range: [9, 10], color: "rgba(140, 20, 252, .9)"},
                  ]
              } 
          };
  
          // Set up the Layout
          let layout3 = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };
  
          // Call Plotly to plot the gauge chart
          Plotly.newPlot("gauge", [trace3], layout3)
      });
  };
  
  // Call the initialize function
  init();
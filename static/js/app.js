// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

});   

//.......................................................................

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

        //add the first sample to the list
        let first_sample = names[0];

        //add values to the first sample
        console.log(first_sample);

        //build the intial graphs
        demo(first_sample);
        bar(first_sample);
        bubble(first_sample);
        
    });
};

//........................................................................

//Now we need to make a function that populates the metadata(demo)info
function demo(sample) {

    //Retrieve all of the data from the json file using then command
    d3.json(url).then((data)=> {

        //pull the demo data
        let metadata = data.metadata;

        //filter the demo data based on the value
        let value = metadata.filter(result => result.id == sample);

        //log the demo array
        console.log(value);

        //find the first value from the array
        let first_sample_value = value[0];

        //clear out the "sample-metadata" in the html
        d3.select("#sample-metadata").html("");

         //using object.entries() return an array of given objects
        //[key,value]
        Object.entries(first_sample_value).forEach(([key,value])=> {

            //log all of the key and value pairs as they are appended
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);                
                    
        });          
    });
};
//.......................................................................

//build the bar chart
function bar(sample) {

    //Fetch the data
    d3.json(url).then((data) => {

        //pull all of the sample data
        let sample_data = data.samples;

        // filter the samples based on their value
        let value = sample_data.filter(result => result.id == sample)

        //pull the first index from the array
        let value_data = value[0];

        //obtain the otu_ids, lables and sample values
        //this looks at the array and pulls the data from it
        //this is why we value_data. 
        let otu_ids = value_data.otu_ids;
        let otu_labels = value_data.otu_labels;
        let sample_values = value_data.sample_values;

        //console log the data
        console.log(otu_ids,otu_labels,sample_values);


        //slice the data for the first 10 and reverse the order
        let sl_otu_ids = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let sl_otu_labels = otu_labels.slice(0,10).reverse();
        let sl_sample_values = sample_values.slice(0,10).reverse();

        //set up the trace for the bar chart
        let trace = {
            x: sl_sample_values,
            y: sl_otu_ids,
            text: sl_otu_labels,
            type: "bar",
            marker:{
                color: "rgb(142,124,195)"
            },
            orientation: "h"
        };
        //data array
        let traceData = [trace];

        //Bar Graph Layout
        let layout = {
            title:  "Top 10 OTUs Per Test Subject ID",
        };

        //plot the graph 
        Plotly.newPlot("bar",traceData,layout);
    });
};
//..........................................................................

function bubble(sample) {

    //Fetch the data
    d3.json(url).then((data) => {

        //pull all of the sample data
        //Will be exactly the same at the bar graph.  The same data 
        // is being used.  The only difference will be in the graphing
        //and there will be no slicing
        let sample_data = data.samples;

        // filter the samples based on their value
        let value = sample_data.filter(result => result.id == sample)

        //pull the first index from the array
        let value_data = value[0];

        //obtain the otu_ids, lables and sample values
        //this looks at the array and pulls the data from it
        //this is why we value_data. 
        let otu_ids = value_data.otu_ids;
        let otu_labels = value_data.otu_labels;
        let sample_values = value_data.sample_values;

        //set up the trace for the bar chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale: 'Picnic'
            }
        };

        //data entry for array
        let bubbleData = [trace2];

        //Bubble Graph Title
        let layout2 = {
            title: "Individual OTU demographics of Belly Button Bacteria",
            hovermode: 'closest',
            xaxis: {title: "OTU ID"},
        };

        //plot the graph 
        Plotly.newPlot("bubble",bubbleData,layout2);
  
    });

};


// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    demo(value);
    bar(value);
    bubble(value);
    
};

// Call the initialize function
init();
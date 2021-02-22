# Life on Us - the Invisible World of Microbes.

*Background*
Human eyes can see what they can only see. The smallest visible object to them is just around 0.1 mm (or ~ 1/254 inch). Truth is they can't see the microbes (1/1000 mm or 1/25,400 inch). Thanks to the modern hi-tech microscope with high resolution and manifying capability, now we can see the worlds that we couldn't see before - the worlds of different microbes that live on our body. To them, our body is their earth as the earth to human race.

In recent research project from the Dept. of Applied Ecology of the North Carolina University, the scientists collected human belly button samples and develop a database that catalogs the microbes colonizing human navels. The dataset reveals a small handful of microbial species knowns as "Operational Taxonomic Units", or "OTUs".

**Plot.ly  - Belly Button Biodiversity**

![Bacteria by filterforge.com](Images/bacteria.jpg)

I build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values.

* Use `sample_values` for the y values.

* Use `sample_values` for the marker size.

* Use `otu_ids` for the marker colors.

* Use `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

![hw](Images/hw03.png)

6. Update all of the plots any time that a new sample is selected.













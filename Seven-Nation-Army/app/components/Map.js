import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Map.css';

type Props = {};

export default class Map extends Component<Props> {
  props: Props;

  highlight(){
  	//Array of all the territory names, used as reference
	let names = ["Switzerland", "Adriatic_Sea", "Aegean_Sea", "Albania", "Ankara", "Apulia", "Armenia", "Baltic_Sea", "Barents_Sea", "Belgium", "Berlin", "Black_Sea", "Bohemia", "Brest", "Budapest", "Bulgaria", "Burgundy", "Clyde", "Constantinople", "Denmark", "Eastern_Mediterranean", "Edinburgh", "English_Channel", "Finland", "Galicia", "Gascony", "Greece", "Gulf_of_Lyon", "Gulf_of_Bothnia", "Helgoland_Bight", "Holland", "Ionian_Sea", "Irish_Sea", "Kiel", "Liverpool", "Livonia", "London", "Marseilles", "Mid-Atlantic_Ocean", "Moscow", "Munich", "Naples", "North_Atlantic_Ocean", "North_Africa", "North_Sea", "Norway", "Norwegian_Sea", "Paris", "Picardy", "Piedmont", "Portugal", "Prussia", "Rome", "Ruhr", "Rumania", "Serbia", "Sevastopol", "Silesia", "Skagerrak", "Smyrna", "Spain", "St_Petersburg", "Sweden", "Syria", "Trieste", "Tunis", "Tuscany", "Tyrolia", "Tyrrhenian_Sea", "Ukraine", "Venice", "Vienna", "Wales", "Warsaw", "Western_Mediterranean", "Yorkshire"];


	var highlight_layer = document.getElementById("map_overlay");
	var territories = [];

	//Opens the map_overlay svg document and iterates over all paths within it
	//Each path will be stored in the territories array
	//Then the we iterate over the territories array and attach an EventListener to each item in the array
	//These eventListeners will look for mouseover and mouseout events and modify the path accordingly
	//Currently it is set to change the color and opacity on enter and exit
	if(highlight_layer){
	    highlight_layer.addEventListener("load",function(){
	    	var svgDoc = highlight_layer.contentDocument;
	    	for(i=0; i < 76; i++){
	    		territories.push(svgDoc.getElementById(names[i]));
	    	}
	        territories.forEach(function (value, i) {
	            if(value){
	                value.addEventListener("mouseover",function() {
	                    value.style.fill='yellow';
	                    value.style.opacity = ".25";
	                    console.log(items[i]);
	                }, false);
	                value.addEventListener("mouseout",function() {
	                    value.style.opacity = "0";
	                }, false);
	            }
	        });

	    }, false);
	}
  }
  render() {
    return (
		// The displayArea class will keep everything centered on the screen and resize it with the window
		<div class = "displayArea">
			// The background image can be located in any folder as long as it is linked correctly
			<img class = "resize_fit_center " src = "images/standard_colored.png">
			// The SVG files must be in the root directory
			// Smaller z-indexes will be rendered first. Larger z-indexes will be stacked ontop
			// Things within the <object> tag will also be stacked in order of declaration
			<object style = "z-index: 1;" class = "resize_fit_center " data="map_overlays.svg" type="image/svg+xml" id="map_overlay"></object>
			<object class = "resize_fit_center " data="map_labels.svg" type="image/svg+xml" id="map_labels" onload="highlight()"></object>
		</div>
    );
  }
}

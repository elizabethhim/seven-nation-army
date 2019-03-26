import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Map.css';
import mapOverlay from './../../resources/images/map_overlays.svg';
import map_labels from './../../resources/images/map_labels.svg';
import mapImage from './../../resources/images/standard_colored.png';

type Props = {};

export default class Map extends Component<Props> {
  props: Props;

  highlight() {
			//Array of all the territory names, used as reference
		const names = ["Switzerland", "Adriatic_Sea", "Aegean_Sea", "Albania", "Ankara", "Apulia", "Armenia", "Baltic_Sea", "Barents_Sea", "Belgium", "Berlin", "Black_Sea", "Bohemia", "Brest", "Budapest", "Bulgaria", "Burgundy", "Clyde", "Constantinople", "Denmark", "Eastern_Mediterranean", "Edinburgh", "English_Channel", "Finland", "Galicia", "Gascony", "Greece", "Gulf_of_Lyon", "Gulf_of_Bothnia", "Helgoland_Bight", "Holland", "Ionian_Sea", "Irish_Sea", "Kiel", "Liverpool", "Livonia", "London", "Marseilles", "Mid-Atlantic_Ocean", "Moscow", "Munich", "Naples", "North_Atlantic_Ocean", "North_Africa", "North_Sea", "Norway", "Norwegian_Sea", "Paris", "Picardy", "Piedmont", "Portugal", "Prussia", "Rome", "Ruhr", "Rumania", "Serbia", "Sevastopol", "Silesia", "Skagerrak", "Smyrna", "Spain", "St_Petersburg", "Sweden", "Syria", "Trieste", "Tunis", "Tuscany", "Tyrolia", "Tyrrhenian_Sea", "Ukraine", "Venice", "Vienna", "Wales", "Warsaw", "Western_Mediterranean", "Yorkshire"];


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
					for(let i=0; i < 76; i++){
						territories.push(svgDoc.getElementById(names[i]));
					}
						territories.forEach(function (value, i) {
								if(value){
										value.addEventListener("mouseover",function() {
												value.style.fill='yellow';
												value.style.opacity = ".25";
					
										}, false);
										value.addEventListener("mouseout",function() {
												value.style.opacity = "0";
										}, false);
								}
						});

				}, false);
		}
	};
	
  render() {
    return (
		// The displayArea class will keep everything centered on the screen and resize it with the window
		<div className={styles.displayArea}>
		<img className={styles.resize_fit_center} src={mapImage} id="map_image"/>
			<object className={styles.resize_fit_center} data={mapOverlay} type="image/svg+xml" id="map_overlay"></object>
			
			<object className={styles.resize_fit_center} data={map_labels.svg} type="image/svg+xml" id="map_labels" onLoad={this.highlight}></object>
		</div>
    );
  }
}

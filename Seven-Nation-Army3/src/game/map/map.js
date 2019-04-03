import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, Container, Row, Col, CardBody, Jumbotron } from 'reactstrap';

import mapOverlay from "../../media/images/map_overlays.svg";
import mapLabels from "../../media/images/map_labels.svg";
import mapImage from "../../media/images/standard_colored.png";
import "../../styles/Map.scss";

// Holdover from first Seven-Nation-Army --Chris
// import Popup from '../../chat/components/Popup';
import ChatContainer from '../../chat/components/ChatContainer';
import BackButton from './BackButton';

export default class Map extends Component {

	constructor(props) {
		super(props);
		
		this.starting = [
				  [["Vienna", 0], ["Budapest", 0], ["Trieste", 1]],
				  [["Edinburgh", 1], ["Liverpool", 0], ["London", 1]],
				  [["Brest", 1], ["Paris", 0], ["Marseilles", 0]],
				  [["Kiel", 1], ["Berlin", 0], ["Munich", 0]],
				  [["Venice", 0], ["Rome", 0], ["Naples", 1]],
				  [["St_Petersburg", 1], ["Moscow", 0], ["Warsaw", 0], ["Sevastopol", 1]],
				  [["Constantinople", 0], ["Ankara", 1], ["Smyrna", 0]]
				 ];

		this.countries = ["Austria_Hungary", "England", "France", "Germany", "Italy", "Russia", "Turkey"];
		this.colors = ["#ed497d", "#605aa7", "#9a9148", "#c0495e", "#cb75db", "#c95df6", "#7b69b8"];
		this.territoryNames = [
			'Switzerland',
			'Adriatic_Sea',
			'Aegean_Sea',
			'Albania',
			'Ankara',
			'Apulia',
			'Armenia',
			'Baltic_Sea',
			'Barents_Sea',
			'Belgium',
			'Berlin',
			'Black_Sea',
			'Bohemia',
			'Brest',
			'Budapest',
			'Bulgaria',
			'Burgundy',
			'Clyde',
			'Constantinople',
			'Denmark',
			'Eastern_Mediterranean',
			'Edinburgh',
			'English_Channel',
			'Finland',
			'Galicia',
			'Gascony',
			'Greece',
			'Gulf_of_Lyon',
			'Gulf_of_Bothnia',
			'Helgoland_Bight',
			'Holland',
			'Ionian_Sea',
			'Irish_Sea',
			'Kiel',
			'Liverpool',
			'Livonia',
			'London',
			'Marseilles',
			'Mid-Atlantic_Ocean',
			'Moscow',
			'Munich',
			'Naples',
			'North_Atlantic_Ocean',
			'North_Africa',
			'North_Sea',
			'Norway',
			'Norwegian_Sea',
			'Paris',
			'Picardy',
			'Piedmont',
			'Portugal',
			'Prussia',
			'Rome',
			'Ruhr',
			'Rumania',
			'Serbia',
			'Sevastopol',
			'Silesia',
			'Skagerrak',
			'Smyrna',
			'Spain',
			'St_Petersburg',
			'Sweden',
			'Syria',
			'Trieste',
			'Tunis',
			'Tuscany',
			'Tyrolia',
			'Tyrrhenian_Sea',
			'Ukraine',
			'Venice',
			'Vienna',
			'Wales',
			'Warsaw',
			'Western_Mediterranean',
			'Yorkshire'
		];

		this.territoryObjects = [];

		this.coordsX = 0;
		this.coordsY = 0;

		this.init = this.init.bind(this);
		this.movePopup = this.movePopup.bind(this);
	}

	movePopup(e){
		this.coordsX = e.clientX;
		this.coordsY = e.clientY;
   		document.getElementById('popupContainer').style.top = this.coordsY - 10 + 'px';
  		document.getElementById('popupContainer').style.left = this.coordsX + 75 + 'px';
  		console.log(this.coordsX, this.coordsY);
	}

	init(){
		const svgLayer = document.getElementById('map_overlay');
		if(svgLayer){
			const svgDoc = svgLayer.contentDocument;
			for(let i = 0; i < this.territoryNames.length; i++){
				const territory = svgDoc.getElementById(this.territoryNames[i]);
				if(territory){
					territory.style.fill = "yellow";
					territory.setAttribute('country', 'Unclaimed');
					territory.setAttribute('unit', 'None');

					this.territoryObjects.push(territory);
				}
			}
			for (let i = 0; i < this.starting.length; i++){
				for (let j = 0; j < this.starting[i].length; j++){
					const territory = svgDoc.getElementById(this.starting[i][j][0]);
					if(territory){
						territory.setAttribute('stroke', this.colors[i]);
						territory.setAttribute('stroke-width', 8);
						territory.setAttribute('stroke-opacity', .5);
						territory.setAttribute('country', this.countries[i]);
						let unit;
						switch(this.starting[i][j][1]){
							case 0:
								unit = 'Army';
								break;
							case 1:
								unit = 'Fleet';
								break;
						}
						territory.setAttribute('unit', unit);
					}
				}
			}
		}
		this.addListeners();
	}

	addListeners() {
	    for (let i in this.territoryObjects) {

	    	let territory = this.territoryObjects[i];
	    	if(territory){
		      	territory.addEventListener('mouseenter', () => {
					document.getElementById('myPopup').classList.toggle('show'); 
		      		territory.addEventListener('mousemove', this.movePopup);
		      	});

		      	territory.addEventListener('mouseenter', () => {
					territory.setAttribute("fill-opacity", 0.33);

					document.getElementById("popupText").innerHTML = "Country: " + territory.getAttribute('country') + 
																	"<br/> Territory: " + territory.id + 
																	"<br/> Unit: " + territory.getAttribute('unit') + 
																	"<br/>" + "Player:  None";
				});
		    	
		    	territory.addEventListener('mouseout', () => {
					territory.setAttribute("fill-opacity", 0);
					if (document.getElementsByClassName('show').length != 0){
						document.getElementById('myPopup').classList.toggle('show');
					}
				});

	    	}
	    }
	}

	render() {
		return (
			// The displayArea class will keep everything centered on the screen and resize it with the window
			<Fragment>
				<BackButton />
				<ChatContainer />
				<div className="displayArea">
					<img
						className='resize_fit_center'
						src={mapImage}
						id="map_image"
					/>

					<object
						className="resize_fit_center"
						data={mapOverlay}
						type="image/svg+xml"
						id="map_overlay"
						onLoad={this.init}
					/>

					<div className="popup" id="popupContainer">
						<span className="popuptext" id="myPopup">
							<p id="popupText"></p>
						</span>
					</div>

				</div>
			</Fragment>
		);
	}
}

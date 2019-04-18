import React, { Component, Fragment } from 'react';

// Holdover from first Seven-Nation-Army --Chris
import PopUp from './popup/PopUp';
import ChatContainer from '../chat/components/ChatContainer';
import LegendContainer from '../legend/LegendContainer';
import Map from './map/map';

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.supplyCenters = [
			'Ankara', 'Belgium', 'Berlin', 'Brest', 'Budapest', 'Bulgaria', 'Constantinople',
			'Denmark', 'Edinburgh', 'Holland', 'Kiel', 'Liverpool', 'London', 'Marseilles',
			'Moscow', 'Munich', 'Naples', 'Norway', 'Paris', 'Portugal', 'Rome', 'Rumania',
			'Serbia', 'Sevastopol', 'Smyrna', 'Spain', 'St_Petersburg', 'Sweden', 'Trieste',
			'Tunis', 'Venice', 'Vienna', 'Warsaw'
		];
		this.starting = [
			[['Vienna', 'Army'], ['Budapest', 'Army'], ['Trieste', 'Fleet']],
			[['Edinburgh', 'Fleet'], ['Liverpool', 'Army'], ['London', 'Fleet']],
			[['Brest', 'Fleet'], ['Paris', 'Army'], ['Marseilles', 'Army']],
			[['Kiel', 'Fleet'], ['Berlin', 'Army'], ['Munich', 'Army']],
			[['Venice', 'Army'], ['Rome', 'Army'], ['Naples', 'Fleet']],
			[['St_Petersburg', 'Fleet'], ['Moscow', 'Army'], ['Warsaw', 'Army'], ['Sevastopol', 'Fleet']],
			[['Constantinople', 'Army'], ['Ankara', 'Fleet'], ['Smyrna', 'Army']]
		];
		this.countries = ['Austria_Hungary', 'England', 'France', 'Germany', 'Italy', 'Russia', 'Turkey'];
		this.colors = ['#ed497d', '#605aa7', '#9a9148', '#c0495e', '#cb75db', '#c95df6', '#7b69b8'];
		this.territoryNames = [
			'Adriatic_Sea', 'Aegean_Sea', 'Albania', 'Ankara', 'Apulia', 'Armenia', 'Baltic_Sea',
			'Barents_Sea', 'Belgium', 'Berlin', 'Black_Sea', 'Bohemia', 'Brest', 'Budapest',
			'Bulgaria', 'Burgundy', 'Clyde', 'Constantinople', 'Denmark', 'Eastern_Mediterranean',
			'Edinburgh', 'English_Channel', 'Finland', 'Galicia', 'Gascony', 'Greece',
			'Gulf_of_Lyon', 'Gulf_of_Bothnia', 'Helgoland_Bight', 'Holland', 'Ionian_Sea',
			'Irish_Sea', 'Kiel', 'Liverpool', 'Livonia', 'London', 'Marseilles',
			'Mid-Atlantic_Ocean', 'Moscow', 'Munich', 'Naples', 'North_Atlantic_Ocean',
			'North_Africa', 'North_Sea', 'Norway', 'Norwegian_Sea', 'Paris', 'Picardy', 'Piedmont',
			'Portugal', 'Prussia', 'Rome', 'Ruhr', 'Rumania', 'Serbia', 'Sevastopol', 'Silesia',
			'Skagerrak', 'Smyrna', 'Spain', 'St_Petersburg', 'Sweden', 'Syria', 'Trieste', 'Tunis',
			'Tuscany', 'Tyrolia', 'Tyrrhenian_Sea', 'Ukraine', 'Venice', 'Vienna', 'Wales',
			'Warsaw', 'Western_Mediterranean', 'Yorkshire'
		];
		this.adjacencyList = [
			["Ionian_Sea", "Apulia", "Venice", "Trieste", "Albania"],
			["Ionian_Sea", "Greece", "Bulgaria", "Constantinople", "Smyrna", "Eastern_Mediterranean"],
			["Adriatic_Sea", "Trieste", "Serbia", "Greece", "Ionian_Sea"],
			["Constantinople", "Black_Sea", "Armenia", "Smyrna"],
			["Adriatic_Sea", "Ionian_Sea", "Naples", "Rome", "Venice"],
			["Ankara", "Black_Sea", "Sevastopol", "Syria", "Smyrna"],
			["Livonia", "Prussia", "Berlin", "Kiel", "Denmark", "Sweden", "Gulf_of_Bothnia"],
			["St_Petersburg", "Finland", "Norway", "Norwegian_Sea"],
			["Holland", "Ruhr", "Burgundy", "Picardy", "English_Channel", "North_Sea"],
			["Baltic_Sea", "Prussia", "Silesia", "Munich", "Kiel"],
			["Ankara", "Armenia", "Constantinople", "Bulgaria", "Rumania", "Sevastopol"],
			["Silesia", "Galicia", "Vienna", "Tyrolia", "Munich"],
			["Mid-Atlantic_Ocean", "English_Channel", "Picardy", "Paris", "Gascony"],
			["Galicia", "Rumania", "Serbia", "Trieste", "Vienna"],
			["Aegean_Sea", "Black_Sea", "Greece", "Serbia", "Rumania", "Constantinople"],
			["Belgium", "Ruhr", "Munich", "Marseilles", "Gascony", "Paris", "Picardy"],
			["North_Atlantic_Ocean", "Norwegian_Sea", "Edinburgh", "Liverpool"],
			["Aegean_Sea", "Ankara", "Black_Sea", "Bulgaria", "Smyrna"],
			["Baltic_Sea", "Kiel", "Helgoland_Bight", "North_Sea", "Skagerrak", "Sweden"],
			["Aegean_Sea", "Smyrna", "Syria", "Ionian_Sea"],
			["Clyde", "Norwegian_Sea", "North_Sea", "Yorkshire", "Liverpool"],
			["Belgium", "Brest", "Picardy", "Mid-Atlantic_Ocean", "Irish_Sea", "Wales", "London", "North_Sea"],
			["St_Petersburg", "Gulf_of_Bothnia", "Sweden", "Norway", "Adriatic_Sea"],
			["Bohemia", "Budapest", "Vienna", "Silesia", "Warsaw", "Ukraine", "Rumania"],
			["Brest", "Burgundy", "Paris", "Marseilles", "Spain", "Mid-Atlantic_Ocean"],
			["Aegean_Sea", "Albania", "Bulgaria", "Serbia", "Ionian_Sea"],
			["Baltic_Sea", "Finland", "Sweden", "St_Petersburg", "Livonia"],
			["Tuscany", "Tyrrhenian_Sea", "Western_Mediterranean", "Spain", "Marseilles", "Piedmont"],
			["Denmark", "Kiel", "Holland", "North_Sea"],
			["Belgium", "Helgoland_Bight", "North_Sea", "Kiel", "Ruhr"],
			["Adriatic_Sea", "Aegean_Sea", "Albania", "Apulia", "Eastern_Mediterranean", "Greece", "Tunis", "Tyrrhenian_Sea", "Naples"],
			["English_Channel", "Mid-Atlantic_Ocean", "North_Atlantic_Ocean", "Wales"],
			["Baltic_Sea", "Berlin", "Denmark", "Helgoland_Bight", "Holland", "Ruhr", "Munich"],
			["Clyde", "Edinburgh", "Yorkshire", "Wales", "Irish_Sea", "North_Atlantic_Ocean"],
			["Baltic_Sea", "Gulf_of_Bothnia", "St_Petersburg", "Moscow", "Warsaw", "Prussia"],
			["English_Channel", "Wales", "Yorkshire", "North_Sea"],
			["Burgundy", "Gascony", "Gulf_of_Lyon", "Spain", "Piedmont"],
			["Brest", "English_Channel", "Gascony", "Irish_Sea", "North_Atlantic_Ocean", "Irish_Sea", "Spain", "Portugal", "Western_Mediterranean", "North_Africa"],
			["Livonia", "St_Petersburg", "Warsaw", "Ukraine", "Sevastopol"],
			["Berlin", "Bohemia", "Burgundy", "Kiel", "Silesia", "Tyrolia", "Ruhr"],
			["Apulia", "Ionian_Sea", "Tyrrhenian_Sea", "Rome"],
			["Mid-Atlantic_Ocean", "Western_Mediterranean", "Tunis"],
			["Clyde", "Irish_Sea", "Liverpool", "Mid-Atlantic_Ocean", "Norwegian_Sea"],
			["Belgium", "Denmark", "Edinburgh", "English_Channel", "Helgoland_Bight", "Holland", "London", "Norwegian_Sea", "Norway", "Skagerrak", "Yorkshire"],
			["Barents_Sea", "Finland", "North_Sea", "St_Petersburg", "Sweden", "Skagerrak", "Norwegian_Sea"],
			["Barents_Sea", "Clyde", "Edinburgh", "North_Atlantic_Ocean", "North_Sea", "Norway"],
			["Brest", "Burgundy", "Gascony", "Picardy"],
			["Belgium", "Brest", "Burgundy", "English_Channel", "Paris"],
			["Gulf_of_Lyon", "Marseilles", "Tyrolia", "Venice", "Tuscany"],
			["Mid-Atlantic_Ocean", "Spain"],
			["Baltic_Sea", "Berlin", "Livonia", "Warsaw", "Silesia"],
			["Apulia", "Naples", "Tyrrhenian_Sea", "Tuscany", "Venice"],
			["Belgium", "Burgundy", "Holland", "Kiel", "Munich"],
			["Black_Sea", "Budapest", "Bulgaria", "Galicia", "Ukraine", "Sevastopol", "Serbia"],
			["Albania", "Budapest", "Bulgaria", "Greece", "Rumania", "Trieste"],
			["Armenia", "Black_Sea", "Moscow", "Rumania", "Ukraine"],
			["Berlin", "Bohemia", "Galicia", "Munich", "Prussia", "Warsaw"],
			["Denmark", "North_Sea", "Norway", "Sweden"],
			["Aegean_Sea", "Ankara", "Armenia", "Constantinople", "Eastern_Mediterranean", "Syria"],
			["Gascony", "Gulf_of_Lyon", "Marseilles", "Mid-Atlantic_Ocean", "Portugal", "Western_Mediterranean"],
			["Barents_Sea", "Finland", "Gulf_of_Bothnia", "Livonia", "Moscow", "Norway"],
			["Baltic_Sea", "Denmark", "Finland", "Gulf_of_Bothnia", "Norway", "Skagerrak"],
			["Eastern_Mediterranean", "Smyrna", "Armenia"],
			["Serbia", "Albania", "Adriatic_Sea", "Venice", "Tyrolia", "Vienna", "Budapest"],
			["North_Africa", "Western_Mediterranean", "Tyrrhenian_Sea", "Ionian_Sea"],
			["Tyrrhenian_Sea", "Gulf_of_Lyon", "Piedmont", "Venice", "Rome"],
			["Venice", "Munich", "Bohemia", "Vienna", "Trieste"],
			["Ionian_Sea", "Tunis", "Western_Mediterranean", "Gulf_of_Lyon", "Tuscany", "Rome", "Naples"],
			["Moscow", "Sevastopol", "Rumania", "Galicia", "Warsaw"],
			["Piedmont", "Tyrolia", "Trieste", "Adriatic_Sea", "Apulia", "Rome", "Tuscany"],
			["Budapest", "Trieste", "Tyrolia", "Bohemia", "Galicia"],
			["Irish_Sea", "Liverpool", "Yorkshire", "London", "English_Channel"],
			["Prussia", "Silesia", "Galicia", "Ukraine", "Moscow", "Livonia"],
			["North_Africa", "Mid-Atlantic_Ocean", "Spain", "Gulf_of_Lyon", "Tyrrhenian_Sea", "Tunis"],
			["London", "Wales", "Liverpool", "Edinburgh", "North_Sea"]];

		this.waterSpaces = ['Adriatic_Sea', 'Aegean_Sea', 'Baltic_Sea', 'Barents_Sea', 'Black_Sea',
			'Eastern_Mediterranean', 'English_Channel', 'Gulf_of_Bothnia', 'Gulf_of_Lyon', 'Helgoland_Bight',
			'Ionian_Sea', 'Irish_Sea', 'Mid-Atlantic_Ocean', 'North_Atlantic_Ocean', 'North_Sea',
			'Norwegian_Sea', 'Skagerrak', 'Tyrrhenian_Sea', 'Western_Mediterranean'];

		this.coastalSpaces = ['Albania', 'Ankara', 'Apulia', 'Armenia', 'Belgium',
			'Berlin', 'Brest', 'Bulgaria', 'Clyde', 'Constantinople',
			'Denmark', 'Edinburgh', 'Finland', 'Gascony', 'Greece',
			'Holland', 'Kiel', 'Livonia', 'London', 'Marseilles', 'Naples',
			'North_Africa', 'Norway', 'Picardy', 'Piedmont', 'Portugal',
			'Prussia', 'Rome', 'Rumania', 'Sevastopol', 'Smyrna',
			'Spain', 'St_Petersburg', 'Sweden', 'Syria', 'Trieste',
			'Tunis', 'Tuscany', 'Venice', 'Wales', 'Yorkshire'];

		this.landLockedSpaces = ['Bohemia', 'Budapest', 'Burgundy', 'Galicia', 'Liverpool', 
			'Moscow', 'Munich', 'Paris', 'Ruhr', 'Serbia', 
			'Silesia', 'Tyrolia', 'Ukraine', 'Vienna', 'Warsaw'];

		this.territoryObjects = [];

		this.movePopup = this.movePopup.bind(this);

		this.state = {
			buttonActionIsVisible: false,
		}
	}

	movePopup(e) {
		let x = e.clientX + 85;
		let y = e.clientY - 20;

		x = x >= window.innerWidth - 85 ? window.innerWidth - 85 : x
		y = 100 >= y ? 100 : y
		const popupContainer = document.getElementById('popupContainer');

		if (popupContainer.getAttribute('mutable') === 'true') {
			popupContainer.style.top = y + 'px';
			popupContainer.style.left = x + 'px';
		}
	}

	buildString(territory) {
		const territoryName = `Territory: ${territory.id}<br/>`;
		const country = territory.getAttribute('country') !== ''
			? (`Country: ${territory.getAttribute('country')}<br/>`)
			: '';
		const unit = territory.getAttribute('unit') !== ''
			? (`Unit: ${territory.getAttribute('unit')}<br/>`)
			: '';
		const player = territory.getAttribute('player') !== ''
			? (`Player: ${territory.getAttribute('player')}<br/>`)
			: '';

		return country + territoryName + unit + player;
	}

	addListeners() {
		const displayCanvas = document.getElementById('displayCanvas');
		const popup = document.getElementById('myPopup');
		const popupContainer = document.getElementById('popupContainer');

		displayCanvas.addEventListener('mousemove', this.movePopup);

		for (let i in this.territoryObjects) {
			const territory = this.territoryObjects[i];
			const color = territory.getAttribute('fill');

			territory.addEventListener('mouseenter', () => {
				if(popupContainer.getAttribute('mutable') === 'true'){
					document.getElementById('popupText').innerHTML = this.buildString(territory);
				}
				territory.setAttribute('fill-opacity', .25);
				territory.setAttribute('fill', 'yellow');
			});

			territory.addEventListener('mouseout', () => {
				if (color === 'yellow') {
					territory.setAttribute('fill-opacity', 0);
				}
				territory.setAttribute('fill', color);
			});

			territory.addEventListener('click', () => {
				if (territory.getAttribute('unit') !== '' && popupContainer.getAttribute('mutable') === 'true') {
					popupContainer.setAttribute('mutable', false);
					this.setState({
						buttonActionIsVisible: true,
					});
					this.buttonListener(territory);
				} else {
					popupContainer.setAttribute('mutable', true);
					this.setState({
						buttonActionIsVisible: false,
					});
				}
			});
		}



		displayCanvas.addEventListener('mouseleave', () => {
			popup.classList.toggle('show');
		});

		displayCanvas.addEventListener('mouseenter', () => {
			popup.classList.toggle('show');
			popupContainer.setAttribute('mutable', true);
			this.setState({
				buttonActionIsVisible: false,
			});
		});

		popup.addEventListener('mouseenter', () => {
			popup.classList.toggle('show');
		});

		popup.addEventListener('mouseleave', () => {
			popup.classList.toggle('show');
		});
	}

	buttonListener(territory){
		const moveButton = document.getElementById('moveButton');
		const holdButton = document.getElementById('holdButton');
		const supportButton = document.getElementById('supportButton');
		const convoyButton = document.getElementById('convoyButton');
		const list = this.adjacencyList[this.territoryNames.indexOf(territory.id)];
		moveButton.addEventListener('click', () => {
			this.findMovementSpaces(territory);
		});

		holdButton.addEventListener('click', () => {
			territory.setAttribute('fill-opacity', .6);
		});

		supportButton.addEventListener('click', () => {
			this.findSupportSpaces(territory);
		});
	}

	findMovementSpaces(territory){
		const unitType = territory.getAttribute('unit');
		const country = territory.getAttribute('country');
		const list = this.adjacencyList[this.territoryNames.indexOf(territory.id)];

		for(let i in list){
			const territory2 = this.territoryObjects[this.territoryNames.indexOf(list[i])];

			const sameCountry = territory2.getAttribute('country') == country;
			const isEmpty = (territory2.getAttribute('country') == '' || territory2.getAttribute('country') == 'Unclaimed');

			if(!sameCountry){
				if(unitType == 'Fleet' && this.landLockedSpaces.indexOf(territory2.id) == -1){
					territory2.setAttribute('fill', 'red');
					territory2.setAttribute('stroke', 'red');
					territory2.setAttribute('stroke-width', 4);
					if(!isEmpty){
						territory2.setAttribute('fill-opacity', .6);
						territory2.setAttribute('stroke-opacity', .4);
					} else if (isEmpty){
						territory2.setAttribute('fill-opacity', .4);
						territory2.setAttribute('stroke-opacity', .4);
					} 
				}else if(unitType == 'Army' && this.waterSpaces.indexOf(territory2.id) == -1){
					territory2.setAttribute('fill', 'red');
					territory2.setAttribute('stroke', 'red');
					territory2.setAttribute('stroke-width', 4);
					if(!isEmpty){
						territory2.setAttribute('fill-opacity', .6);
						territory2.setAttribute('stroke-opacity', .4);
					} else if (isEmpty){
						territory2.setAttribute('fill-opacity', .4);
						territory2.setAttribute('stroke-opacity', .4);
					} 
				}
			}
		}
	}

	findSupportSpaces(territory){
		const unitType = territory.getAttribute('unit');
		const country = territory.getAttribute('country');
		const list = this.adjacencyList[this.territoryNames.indexOf(territory.id)];

		for(let i in list){
			const territory2 = this.territoryObjects[this.territoryNames.indexOf(list[i])];
			const color = territory.getAttribute('fill');
			if(territory2){
				if (territory2.getAttribute('unit') !== ''){
					territory2.setAttribute('fill', 'green');
					territory2.setAttribute('fill-opacity', .6);
					territory2.setAttribute('stroke', 'green');
					territory2.setAttribute('stroke-opacity', .6);
					territory2.setAttribute('stroke-width', 6);
				}
			}
		}
	}

	componentDidMount() {
		const svgLayer = document.getElementById('map_overlay');
		if (svgLayer) {
			/* const svgDoc = svgLayer.contentDocument; */
			for (let i in this.territoryNames) {
				const territory = svgLayer.getElementById(this.territoryNames[i]);
				territory.setAttribute('fill', 'yellow');
				territory.setAttribute('unit', '');
				territory.setAttribute('player', '');
				territory.setAttribute('country', '');
				if (this.supplyCenters.indexOf(territory.id) > -1) {
					territory.setAttribute('country', 'Unclaimed');
				}
				this.territoryObjects.push(territory);
			}
			for (let i in this.starting) {
				for (let j in this.starting[i]) {
					const territory = svgLayer.getElementById(this.starting[i][j][0]);
					territory.setAttribute('fill', this.colors[i]);
					territory.setAttribute('fill-opacity', 0.25);
					territory.setAttribute('stroke', this.colors[i]);
					territory.setAttribute('stroke-width', 10);
					territory.setAttribute('stroke-opacity', .4);
					territory.setAttribute('country', this.countries[i]);
					territory.setAttribute('unit', this.starting[i][j][1]);
				}
			}
		}

		// document.getElementById('myPopup').classList.toggle('show');
		document.getElementById('popupContainer').setAttribute('mutable', true);
		this.addListeners();
	}

	render() {
		return (
			<Fragment>
				<ChatContainer/>
				<Map />
				<PopUp buttonIsVisible={this.state.buttonActionIsVisible} />
				<LegendContainer  /> 
			</Fragment>
		);
	}
}
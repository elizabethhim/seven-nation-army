import React, { Component, Fragment } from 'react';

// Holdover from first Seven-Nation-Army --Chris
import PopUp from './popup/PopUp';
import ChatContainer from '../chat/components/ChatContainer';
import BackButton from './back/BackButton';
import Legend from './legend';
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

		const popupAlert = document.getElementById('popupContainer');
		if (popupAlert.getAttribute('mutable') === 'true') {
			popupAlert.style.top = y + 'px';
			popupAlert.style.left = x + 'px';
		}
	}

	buildString(territory, event) {
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
		for (let i in this.territoryObjects) {
			const territory = this.territoryObjects[i];
			if (territory) {

				const color = territory.getAttribute('fill')

				territory.addEventListener('mousemove', this.movePopup);

				territory.addEventListener('mouseenter', () => {
					document.getElementById('popupText').innerHTML = this.buildString(territory);
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
					if (territory.getAttribute('unit') !== '' && document.getElementById('popupContainer').getAttribute('mutable') === 'true') {
						document.getElementById('popupContainer').setAttribute('mutable', false);
						this.setState({
							buttonActionIsVisible: true,
						});
					} else {
						document.getElementById('popupContainer').setAttribute('mutable', true);
						this.setState({
							buttonActionIsVisible: false,
						});
					}
				});
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

		document.getElementById('myPopup').classList.toggle('show');
		document.getElementById('popupContainer').setAttribute('mutable', true);
		this.addListeners();
	}

	render() {
		return (
			<Fragment>
				<BackButton />
				<ChatContainer />
				<Map />
				<PopUp buttonIsVisible={this.state.buttonActionIsVisible} />
			</Fragment>
		);
	}
}

import React, { Component, Fragment } from 'react';
import * as scripts from './scripts.js';

// Holdover from first Seven-Nation-Army --Chris
import PopUp from './popup/PopUp';
import ChatContainer from '../chat/components/ChatContainer';
import LegendContainer from '../legend/LegendContainer';
import OrdersPanelContainer from '../orderspanel/OrdersPanelContainer';
import Map from './map/map';
import { getFirebase } from 'react-redux-firebase';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.isFirstRun = true;

    this.countryColors = {
      'Russia':'#dd1efa',
      'Austria_Hungary': '#c41717',
      'Turkey': '#c49e17',
      'Italy': '#2bb213',
      'Germany': '#d896ea',
      'France': '#3cb6c4',
      'England': '#070291'
    };

    //Used to iterate through the JSON and SVG objects
    this.territoryNames = [
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
      'Yorkshire',
    ];

    this.territoryObjects = [];

    this.state = {
      buttonActionIsVisible: false,
    };

    this.actionStruct = [
      { unitOrigin: '' },
      { actionID: '' },
      { unitDest: '' },
      { secondaryUnit: '' },
    ];

  }

  closeButtons(){
    this.setState({
      buttonActionIsVisible: false,
    });
    document.getElementById('popupContainer').setAttribute('mutable', true);
    if(!document.getElementById('myPopup').classList.contains('show')){
      document.getElementById('myPopup').classList.toggle('show');
    };
  }
  addMouseListeners() {
    const displayCanvas = document.getElementById('displayCanvas');
    const popup = document.getElementById('myPopup');
    const popupContainer = document.getElementById('popupContainer');

    //Iterating over every territory object to add listeners
    //Listeners are based on the current action being taken
    //Action being taken is stored in this.actionStruct[1].actionID
    for (let i in this.territoryObjects) {
      const territory = this.territoryObjects[i];

      //When the mouse leaves the bounds of a territory
      territory.addEventListener('mouseout', () => {
        scripts.deHighlight(territory);
      });

      //When the mouse enters a territory's bounds it will be highlighted
      //and the popup will be updated with the it's info.
      territory.addEventListener('mouseenter', () => {
        scripts.highlight(territory);
        if (popupContainer.getAttribute('mutable') === 'true') {
          document.getElementById('popupText').innerHTML = scripts.buildString(
            territory
          );
        }
      });

      //This one handles all the clicks
      territory.addEventListener('click', e => {
        switch (this.actionStruct[1].actionID) {
          //If the move action was selected earlier, the next territory clicked is the destination
          case 'move':
            //Destination along with the actionStruct is passed to a function
            //that will verify the validity of the move
            //If its valid, it will be pushed to the list
            //Regardless of validity, the 'move' action is completed and the game waits for another action
            scripts.resetFill(this.actionStruct[2].unitDest);
            if (scripts.validateMove(territory, this.actionStruct)) {
              scripts.buildOrders(this.actionStruct);
            }
            this.actionStruct[1].actionID = '';
            break;

          //If the support action was selected earlier, the next territory clicked is the destination
          case 'support':
            //Destination along with the actionStruct is passed to a function
            //that will verify the validity of the support
            //If its valid, it will continue on to find what action will be supported
            //If a valid unit was not selected, the support is canceled by setting this.action[1].actionID to ''
            scripts.resetFill(this.actionStruct[2].unitDest);
            if (scripts.validateMove(territory, this.actionStruct)) {
              this.actionStruct[1].actionID = 'gettingsecondaryunit';
              scripts.setFill([
                this.actionStruct[3].secondaryUnit[territory.id],
                'green',
                0.20,
              ]);
            } else {
              this.actionStruct[1].actionID = '';
            }
            break;
          //If support was selected as an action earlier and a valid unit was selected afterwards,
          //the next unit is the secondary unit for the support
          case 'gettingsecondaryunit':
            //Destination along with the actionStruct is passed to a function
            //that will verify the validity of the secondary unit.
            //If its valid, the order is pushed to the list
            //If not the support is cancelled.
            scripts.resetFill(
              this.actionStruct[3].secondaryUnit[this.actionStruct[2].unitDest]
            );
            if (scripts.validateMove(territory, this.actionStruct)) {
              scripts.buildOrders(this.actionStruct);
            }
            this.actionStruct[1].actionID = '';
            break;
          case 'convoy':
            this.actionStruct[1].actionID = '';
            break;
          //The default logic for a click
          default:
            //Toggles the buttons in the popup depending on if the territory has a unit
            //also responsible for closing the button menu when clicked away
            if(scripts.validateUser(territory)){
              this.setState({
                buttonActionIsVisible: scripts.mouseClickFunc(territory),
              });
              //If the buttons have been opened, add listeners to them
              //If the buttons have been closed, remove listeners (TBA)
              if (this.state.buttonActionIsVisible)
                this.addButtonListeners(territory);
              else this.removeButtonListeners(territory);
            }
            break;
        }
      });
    }

    //Making the popup follow the mouse
    displayCanvas.addEventListener('mousemove', scripts.movePopup);

    //Closing the popup when the canvas loses mouse focus
    displayCanvas.addEventListener('mouseleave', () => {
      popup.classList.toggle('show');
    });

    //Opens the popup when reentering the canvas
    //Also closes the button menu if it was open
    //and makes the popup follow the mouse again in case it was frozen
    displayCanvas.addEventListener('mouseenter', () => {
      popup.classList.toggle('show');
      this.closeButtons();
    });

    popup.addEventListener('mouseenter', () => {
      popup.classList.toggle('show');
    });

    popup.addEventListener('mouseleave', () => {
      popup.classList.toggle('show');
    });
  }

  removeButtonListeners() {}

  addButtonListeners(territory) {
    const moveButton = document.getElementById('moveButton');
    const holdButton = document.getElementById('holdButton');
    const supportButton = document.getElementById('supportButton');
    const convoyButton = document.getElementById('convoyButton');

    this.actionStruct[0].unitOrigin = territory.id;

    moveButton.addEventListener('click', e => {
      this.actionStruct[1]['actionID'] = "move";
      this.actionStruct[2].unitDest = scripts.findMovementSpaces(territory);
      this.closeButtons();
    });

    holdButton.addEventListener('click', () => {
      this.actionStruct[1].actionID = 'hold';
      this.actionStruct[2].unitDest = territory.id;
      scripts.buildOrders(this.actionStruct);
      scripts.holding(this.actionStruct);
      this.actionStruct[1].actionID = '';
      this.closeButtons();
    });

    supportButton.addEventListener('click', () => {
      const results = scripts.findSupportSpaces(territory);
      if (results[0].length !== 0){
        this.actionStruct[1].actionID = 'support';
        this.actionStruct[2].unitDest = results[0];
        this.actionStruct[3].secondaryUnit = results[1];
      }
      this.closeButtons();
    });

    convoyButton.addEventListener('click', () => {
      this.closeButtons();
      // this.actionStruct[1].actionID = 'convoy';
    });
  }

  updateGameState(){
    //Reads the JSON file which is pulled from the server
    if(!document.getElementById('myPopup').classList.contains('show')){
      document.getElementById('myPopup').classList.toggle('show');
    };
    let territoriesJSON = scripts.getJSON();

    //Looping through all the territories and adds them to a list
    for (let i in this.territoryNames) {
      //territory is the actual SVG object
      //territoryInfo is the info from the JSON file
      const territory = document.getElementById(this.territoryNames[i]);
      const territoryInfo = territoriesJSON[territory.id];

      //Setting default info as empty and color as yellow for highlighting
      territory.setAttribute('fill', 'yellow');
      territory.setAttribute('unit', territoryInfo.unit);
      territory.setAttribute('player', territoryInfo.player);
      territory.setAttribute('country', territoryInfo.country);
      territory.setAttribute('countrycolor', territory.getAttribute('fill'));
      territory.setAttribute('previouscolor', territory.getAttribute('fill'));

      //Adds country attribute for supply centers
      if (territoryInfo.isSupplyCenter === 'True' && territoryInfo.country === '') {
        territory.setAttribute('country', 'Unclaimed');
      }

      //More details for territories that are owned by a country
      //These are the starting points
      if (territoryInfo.country !== '' || territoryInfo.player !== '') {
        //Each country has its own color stored in the JSON
        const color = this.countryColors[territoryInfo.country];
        //countrycolor attribute will be the color each territory
        //defaults back to after being highlighted
        //Fills in the relevant info from the JSON
        territory.setAttribute('countrycolor', color);
        territory.setAttribute('fill', color);
        territory.setAttribute('fill-opacity', 0.20);
        territory.setAttribute('stroke', color);
        territory.setAttribute('stroke-width', 10);
        territory.setAttribute('stroke-opacity', 0.20);
        territory.setAttribute('previouscolor', color);
        //Makes the needed units visible and hides the others
        if (territoryInfo.unit === 'Army') {
          document
            .getElementById(territory.id + '_Army')
            .setAttribute('fill-opacity', '1');
          document
            .getElementById(territory.id + '_Army')
            .setAttribute('stroke-opacity', '1');
          document
            .getElementById(territory.id + '_Army')
            .setAttribute('fill', color);
          document
            .getElementById(territory.id + '_Fleet')
            .setAttribute('fill-opacity', '0');
          document
            .getElementById(territory.id + '_Fleet')
            .setAttribute('stroke-opacity', '0');
        } else if (territoryInfo.unit === 'Fleet') {
          document
            .getElementById(territory.id + '_Fleet')
            .setAttribute('fill-opacity', '1');
          document
            .getElementById(territory.id + '_Fleet')
            .setAttribute('stroke-opacity', '1');
          document
            .getElementById(territory.id + '_Fleet')
            .setAttribute('fill', color);
          document
            .getElementById(territory.id + '_Army')
            .setAttribute('fill-opacity', '0');
          document
            .getElementById(territory.id + '_Army')
            .setAttribute('stroke-opacity', '0');
        }
      }

      this.territoryObjects.push(territory);
    }
    if(this.isFirstRun){
      this.addMouseListeners();
      document.getElementById('submitOrders').addEventListener('click', scripts.submitOrders());   
      this.isFirstRun = false;
    }else{
      scripts.cleanUp();
    }
    document.getElementById('popupContainer').setAttribute('mutable', true);
  }

  componentDidMount() {
    let jsonPath = getFirebase().database().ref('root/sessions/' + scripts.sessionID + '/boardState');
    jsonPath.on('value', (snapshot) =>{
      scripts.setJSON(snapshot.val());
      console.log("JSON updated");
      this.updateGameState();
    });
  }

  render() {

    return (
      <Fragment>
        <ChatContainer />
        <Map />
        <PopUp buttonIsVisible={this.state.buttonActionIsVisible} />
        <OrdersPanelContainer ordersList={scripts.ordersList} />
        <LegendContainer />
      </Fragment>
    );
  }
}

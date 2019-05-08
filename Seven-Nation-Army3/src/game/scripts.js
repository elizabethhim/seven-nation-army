import { getFirebase } from 'react-redux-firebase';

export let orders = { 'sessionID': '' };
export const sessionID = '-Ld_bcgkJ0hKGr_iu32T';
// export const sessionID = getFirebase.getSessionID();

export function buildOrders(action) {
  if (orders['sessionID'] === '') {
    orders['sessionID'] = sessionID;
  }
  const x = Object.keys(orders).length;
  const exists = orderExists(action);
  let newObj = [
    { unitOrigin: action[0].unitOrigin },
    { actionID: action[1].actionID },
    { unitDest: action[2].unitDest },
    { secondaryUnit: action[3].secondaryUnit },
  ];

  const index = !exists[0] ? 'actionList' + x : 'actionList' + exists[1];
  orders[index] = newObj
}

function orderExists(action) {
  for (let i = 1; i <= Object.keys(orders).length; i += 1) {
    const temp = orders[`actionList${i}`]
    if (temp) {
      if (temp[0].unitOrigin === action[0].unitOrigin) {
        return [true, i];
      }
    }
  }
  return [false];
}

export function getCurrentUser() {
  const firebase = getFirebase();
  return firebase.auth().currentUser;
}

export function getUserId() {
  return getCurrentUser().uid;
}

export function validateUser(territory) {
  return territory.getAttribute('player') === getUserId().displayName;
}

//vars is an array
//vars[0] = array of territory objects, can be just one
//vars[1] = color
//vars[2] = opacity
export function setFill(vars) {
  for (let i = 0; i < vars[0].length; i++) {
    vars[0][i].setAttribute('previouscolor', vars[0][i].getAttribute('fill'));
    vars[0][i].setAttribute('fill', vars[1]);
    vars[0][i].setAttribute('stroke', vars[1]);
    vars[0][i].setAttribute('stroke-width', 4);
    vars[0][i].setAttribute('stroke-opacity', 1);
    vars[0][i].setAttribute('fill-opacity', vars[2]);
  }
}

//territories is an array
//iterates over the array and calls setFill
//will set the fill to whatever the previous color was
export function resetFill(territories) {
  for (let i = 0; i < territories.length; i++) {
    let opacity =
      territories[i].getAttribute('countrycolor') === 'yellow' ? 0 : 0.20;
    territories[i].setAttribute(
      'fill',
      territories[i].getAttribute('countrycolor')
    );
    territories[i].setAttribute('stroke', territories[i].getAttribute('countrycolor'));
    territories[i].setAttribute('stroke-opacity', opacity);
    territories[i].setAttribute(
      'previouscolor',
      territories[i].getAttribute('countrycolor')
    );
    territories[i].setAttribute('fill-opacity', opacity);
  }
}

export function highlight(territory) {
  territory.setAttribute('previouscolor', territory.getAttribute('fill'));
  territory.setAttribute('fill', 'yellow');
  territory.setAttribute('fill-opacity', .25);
}

export function deHighlight(territory) {
  if (territory.getAttribute('previouscolor') === 'yellow') {
    territory.setAttribute('fill-opacity', 0);
  }
  territory.setAttribute('fill', territory.getAttribute('previouscolor'));
}

export function mouseClickFunc(territory) {
  let buttonState;
  const popupContainer = document.getElementById('popupContainer');
  if (
    territory.getAttribute('unit') !== '' &&
    popupContainer.getAttribute('mutable') === 'true'
  ) {
    buttonState = true;
    popupContainer.setAttribute('mutable', false);
  } else {
    buttonState = false;
    popupContainer.setAttribute('mutable', true);
  }
  return buttonState;
}

export function validateMove(territory, action) {
  let valid = false;
  if (action[1].actionID === 'gettingsecondaryunit') {
    valid = action[3].secondaryUnit[action[2].unitDest].includes(territory);
    if (valid) {
      action[3].secondaryUnit = territory.id;
      drawAction(
        action[2].unitDest,
        action[3].secondaryUnit,
        action[1].actionID
      );
      action[1].actionID = 'support';
    }
  } else {
    valid = action[2].unitDest.includes(territory);
    if (valid) {
      action[2].unitDest = territory.id;
      drawAction(action[0].unitOrigin, action[2].unitDest, action[1].actionID);
    }
  }
  return valid;
}

export function findMovementSpaces(territory) {
  const adjacencyList = territoriesJSON[territory.id].adjacencyList;
  let validMoveSpaces = [];

  for (let i = 0; i < adjacencyList.length; i++) {
    const adjacentTerritory = document.getElementById(adjacencyList[i]);
    if (
      (territoriesJSON[territory.id].unit === 'Fleet' &&
        territoriesJSON[adjacentTerritory.id].spaceType !== 'landlocked') ||
      (territoriesJSON[territory.id].unit === 'Army' &&
        territoriesJSON[adjacentTerritory.id].spaceType !== 'water') ||
      territoriesJSON[adjacentTerritory.id].spaceType === 'coast'
    ) {
      validMoveSpaces.push(adjacentTerritory);
    }
  }
  setFill([validMoveSpaces, 'green', '.15']);
  return validMoveSpaces;
}

export function findSupportSpaces(territory) {
  const moveSpaces = findMovementSpaces(territory);
  resetFill(moveSpaces);
  let validSupportSpaces = [];
  let secondaryUnit = {};

  for (let i = 0; i < moveSpaces.length; i++) {
    const moveSpace = moveSpaces[i];
    const moveSpaceAdjacentTerritories =
      territoriesJSON[moveSpace.id].adjacencyList;
    for (let j = 0; j < moveSpaceAdjacentTerritories.length; j++) {
      const msAdjacentTerritory = document.getElementById(
        moveSpaceAdjacentTerritories[j]
      );
      const msATMovementSpaces = findMovementSpaces(msAdjacentTerritory);
      resetFill(msATMovementSpaces);
      if (
        msAdjacentTerritory.id !== territory.id &&
        territoriesJSON[msAdjacentTerritory.id].unit !== '' &&
        msATMovementSpaces.includes(moveSpace) &&
        !validSupportSpaces.includes(msAdjacentTerritory)
      ) {
        validSupportSpaces.push(msAdjacentTerritory);
        if (!secondaryUnit[msAdjacentTerritory.id]) {
          secondaryUnit[msAdjacentTerritory.id] = [moveSpace];
        } else {
          secondaryUnit[msAdjacentTerritory.id].push(moveSpace);
        }
      }
    }
  }

  setFill([validSupportSpaces, 'green', 0.20]);
  return [validSupportSpaces, secondaryUnit];
}

export function buildString(territory) {
  const territoryName = `Territory: ${territory.id}<br/>`;
  const country =
    territory.getAttribute('country') !== ''
      ? `Country: ${territory.getAttribute('country')}<br/>`
      : '';
  const unit =
    territory.getAttribute('unit') !== ''
      ? `Unit: ${territory.getAttribute('unit')}<br/>`
      : '';
  const player =
    territory.getAttribute('player') !== ''
      ? `Player: ${territory.getAttribute('player')}<br/>`
      : '';

  return country + territoryName + unit + player;
}

export function movePopup(e) {
  let x = e.clientX + 85;
  let y = e.clientY - 20;

  x = x >= window.innerWidth - 85 ? window.innerWidth - 85 : x;
  y = 100 >= y ? 100 : y;
  const popupContainer = document.getElementById('popupContainer');

  if (popupContainer.getAttribute('mutable') === 'true') {
    popupContainer.style.top = y + 'px';
    popupContainer.style.left = x + 'px';
  }
}

export function holding(action) {
  drawAction(action[0].unitOrigin, action[2].unitDest, action[1].actionID);
}

export function drawAction(origin, dest, actionId) {
  //delete markings if already exist
  let arrow = document.getElementById(origin + '_Arrow');
  let hold = document.getElementById(origin + '_Hold');
  if (arrow) {
    arrow.parentNode.removeChild(
      document.getElementById(origin + '_Arrowhead')
    );
    arrow.parentNode.removeChild(arrow);
  }
  if (hold) {
    hold.parentNode.removeChild(hold);
  }

  if (actionId === 'hold') {
    const territory = territoriesJSON[origin];
    const coords = [
      parseInt(document.getElementById(origin + '_Army').getAttribute('cx')),
      parseInt(document.getElementById(origin + '_Army').getAttribute('cy')),
    ];

    const holdIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    holdIcon.setAttribute('class', 'holdIcon');
    holdIcon.setAttribute('id', origin + '_Hold');
    holdIcon.setAttribute('r', 20);
    if (territory.unit === 'Army') {
      holdIcon.setAttribute('cx', coords[0]);
      holdIcon.setAttribute('cy', coords[1]);
    } else {
      holdIcon.setAttribute('cx', coords[0] + 10);
      holdIcon.setAttribute('cy', coords[1] + 6);
    }
    document.getElementById('arrowContainer').append(holdIcon);
  }
  else {
    //Getting coords for arrow start and end of arrow
    const originPoints = [
      parseInt(document.getElementById(origin + '_Army').getAttribute('cx')),
      parseInt(document.getElementById(origin + '_Army').getAttribute('cy')),
    ];

    const destinPoints = [
      parseInt(document.getElementById(dest + '_Army').getAttribute('cx')),
      parseInt(document.getElementById(dest + '_Army').getAttribute('cy')),
    ];

    //Getting the control point for Quadratic Bezier curve
    //If a straight line is used they overlap and its harder to see whats going on
    const d = Math.round(
      Math.sqrt(
        Math.pow(originPoints[0] - destinPoints[0], 2) +
        Math.pow(originPoints[1] - destinPoints[1], 2)
      )
    );
    const curveAmount = 3;
    const bezier = [
      originPoints[0] < destinPoints[0]
        ? destinPoints[0] - d / curveAmount
        : destinPoints[0] + d / curveAmount,
      originPoints[1] < destinPoints[1]
        ? destinPoints[1] - d / curveAmount
        : destinPoints[1] + d / curveAmount,
    ];

    //Getting coordinates for arrowhead
    const arrowheadSize = 25;
    const radius = Math.round(arrowheadSize / 2);
    const midPoint = [
      originPoints[0] < destinPoints[0]
        ? destinPoints[0] - arrowheadSize
        : destinPoints[0] + arrowheadSize,
      originPoints[1] < destinPoints[1]
        ? destinPoints[1] - arrowheadSize
        : destinPoints[1] + arrowheadSize,
    ];

    //The points of the arrowhead change depending on the direction of the arrow
    const horizontalDir = originPoints[0] > destinPoints[0];
    const verticalDir = originPoints[1] < destinPoints[1];

    let points = [
      midPoint[0] + radius,
      midPoint[1] - radius,
      midPoint[0] - radius,
      midPoint[1] + radius,
    ];
    if ((horizontalDir && verticalDir) || !(horizontalDir || verticalDir)) {
      points[1] = midPoint[1] + radius;
      points[3] = midPoint[1] - radius;
    }

    //Adding the arrows and heads with their attributes
    const arrowLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const arrowHead = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );

    const linePath =
      'M' +
      originPoints[0] +
      ' ' +
      originPoints[1] +
      ' Q ' +
      bezier[0] +
      ' ' +
      bezier[1] +
      ', ' +
      destinPoints[0] +
      ' ' +
      destinPoints[1];

    const arrowheadPath =
      destinPoints[0] +
      ', ' +
      destinPoints[1] +
      ' ' +
      points[0] +
      ', ' +
      points[1] +
      ' ' +
      points[2] +
      ', ' +
      points[3];

    arrowLine.setAttribute('class', 'arrow');
    arrowLine.setAttribute('id', origin + '_Arrow');
    arrowLine.setAttribute('d', linePath);
    if (actionId === 'support') arrowLine.setAttribute('stroke-dasharray', '8 8');

    arrowHead.setAttribute('class', 'arrowhead');
    arrowHead.setAttribute('id', origin + '_Arrowhead');
    arrowHead.setAttribute('points', arrowheadPath);

    //Adding the arrows to the arrowContainer
    document.getElementById('arrowContainer').append(arrowLine);
    document.getElementById('arrowContainer').append(arrowHead);
  }
}

export function setJSON(file) {
  territoriesJSON = file;
}

export let territoriesJSON = {};

// export const territoriesJSON = {
//   Adriatic_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Albania', 'Apulia', 'Ionian_Sea', 'Trieste', 'Venice'],
//   },
//   Aegean_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Bulgaria',
//       'Constantinople',
//       'Eastern_Mediterranean',
//       'Greece',
//       'Ionian_Sea',
//       'Smyrna',
//     ],
//   },
//   Albania: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Adriatic_Sea',
//       'Greece',
//       'Ionian_Sea',
//       'Serbia',
//       'Trieste',
//     ],
//   },
//   Ankara: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Turkey',
//     adjacencyList: ['Armenia', 'Black_Sea', 'Constantinople', 'Smyrna'],
//   },
//   Apulia: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Adriatic_Sea', 'Ionian_Sea', 'Naples', 'Rome', 'Venice'],
//   },
//   Armenia: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Ankara', 'Black_Sea', 'Sevastopol', 'Smyrna', 'Syria'],
//   },
//   Baltic_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Berlin',
//       'Denmark',
//       'Gulf_of_Bothnia',
//       'Kiel',
//       'Livonia',
//       'Prussia',
//       'Sweden',
//     ],
//   },
//   Barents_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Finland', 'Norway', 'Norwegian_Sea', 'St_Petersburg'],
//   },
//   Belgium: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Burgundy',
//       'English_Channel',
//       'Holland',
//       'North_Sea',
//       'Picardy',
//       'Ruhr',
//     ],
//   },
//   Berlin: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Germany',
//     adjacencyList: ['Baltic_Sea', 'Kiel', 'Munich', 'Prussia', 'Silesia'],
//   },
//   Black_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Ankara',
//       'Armenia',
//       'Bulgaria',
//       'Constantinople',
//       'Rumania',
//       'Sevastopol',
//     ],
//   },
//   Bohemia: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Galicia', 'Munich', 'Silesia', 'Tyrolia', 'Vienna'],
//   },
//   Brest: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'France',
//     adjacencyList: [
//       'English_Channel',
//       'Gascony',
//       'Mid-Atlantic_Ocean',
//       'Paris',
//       'Picardy',
//     ],
//   },
//   Budapest: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Austria_Hungary',
//     adjacencyList: ['Galicia', 'Rumania', 'Serbia', 'Trieste', 'Vienna'],
//   },
//   Bulgaria: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Aegean_Sea',
//       'Black_Sea',
//       'Constantinople',
//       'Greece',
//       'Rumania',
//       'Serbia',
//     ],
//   },
//   Burgundy: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Belgium',
//       'Gascony',
//       'Marseilles',
//       'Munich',
//       'Paris',
//       'Picardy',
//       'Ruhr',
//     ],
//   },
//   Clyde: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Edinburgh',
//       'Liverpool',
//       'North_Atlantic_Ocean',
//       'Norwegian_Sea',
//     ],
//   },
//   Constantinople: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Turkey',
//     adjacencyList: ['Aegean_Sea', 'Ankara', 'Black_Sea', 'Bulgaria', 'Smyrna'],
//   },
//   Denmark: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Baltic_Sea',
//       'Helgoland_Bight',
//       'Kiel',
//       'North_Sea',
//       'Skagerrak',
//       'Sweden',
//     ],
//   },
//   Eastern_Mediterranean: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Aegean_Sea', 'Ionian_Sea', 'Smyrna', 'Syria'],
//   },
//   Edinburgh: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'England',
//     adjacencyList: [
//       'Clyde',
//       'Liverpool',
//       'North_Sea',
//       'Norwegian_Sea',
//       'Yorkshire',
//     ],
//   },
//   English_Channel: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Belgium',
//       'Brest',
//       'Irish_Sea',
//       'London',
//       'Mid-Atlantic_Ocean',
//       'North_Sea',
//       'Picardy',
//       'Wales',
//     ],
//   },
//   Finland: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Adriatic_Sea',
//       'Gulf_of_Bothnia',
//       'Norway',
//       'St_Petersburg',
//       'Sweden',
//     ],
//   },
//   Galicia: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Bohemia',
//       'Budapest',
//       'Rumania',
//       'Silesia',
//       'Ukraine',
//       'Vienna',
//       'Warsaw',
//     ],
//   },
//   Gascony: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Brest',
//       'Burgundy',
//       'Marseilles',
//       'Mid-Atlantic_Ocean',
//       'Paris',
//       'Spain',
//     ],
//   },
//   Greece: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Aegean_Sea',
//       'Albania',
//       'Bulgaria',
//       'Ionian_Sea',
//       'Serbia',
//     ],
//   },
//   Gulf_of_Bothnia: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Baltic_Sea',
//       'Finland',
//       'Livonia',
//       'St_Petersburg',
//       'Sweden',
//     ],
//   },
//   Gulf_of_Lyon: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Marseilles',
//       'Piedmont',
//       'Spain',
//       'Tuscany',
//       'Tyrrhenian_Sea',
//       'Western_Mediterranean',
//     ],
//   },
//   Helgoland_Bight: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Denmark', 'Holland', 'Kiel', 'North_Sea'],
//   },
//   Holland: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Belgium', 'Helgoland_Bight', 'Kiel', 'North_Sea', 'Ruhr'],
//   },
//   Ionian_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Adriatic_Sea',
//       'Aegean_Sea',
//       'Albania',
//       'Apulia',
//       'Eastern_Mediterranean',
//       'Greece',
//       'Naples',
//       'Tunis',
//       'Tyrrhenian_Sea',
//     ],
//   },
//   Irish_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'English_Channel',
//       'Mid-Atlantic_Ocean',
//       'North_Atlantic_Ocean',
//       'Wales',
//     ],
//   },
//   Kiel: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Germany',
//     adjacencyList: [
//       'Baltic_Sea',
//       'Berlin',
//       'Denmark',
//       'Helgoland_Bight',
//       'Holland',
//       'Munich',
//       'Ruhr',
//     ],
//   },
//   Liverpool: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'England',
//     adjacencyList: [
//       'Clyde',
//       'Edinburgh',
//       'Irish_Sea',
//       'North_Atlantic_Ocean',
//       'Wales',
//       'Yorkshire',
//     ],
//   },
//   Livonia: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Baltic_Sea',
//       'Gulf_of_Bothnia',
//       'Moscow',
//       'Prussia',
//       'St_Petersburg',
//       'Warsaw',
//     ],
//   },
//   London: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'England',
//     adjacencyList: ['English_Channel', 'North_Sea', 'Wales', 'Yorkshire'],
//   },
//   Marseilles: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'France',
//     adjacencyList: ['Burgundy', 'Gascony', 'Gulf_of_Lyon', 'Piedmont', 'Spain'],
//   },
//   'Mid-Atlantic_Ocean': {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Brest',
//       'English_Channel',
//       'Gascony',
//       'Irish_Sea',
//       'Irish_Sea',
//       'North_Africa',
//       'North_Atlantic_Ocean',
//       'Portugal',
//       'Spain',
//       'Western_Mediterranean',
//     ],
//   },
//   Moscow: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: 'zunigaenrique',
//     country: 'Russia',
//     adjacencyList: [
//       'Livonia',
//       'Sevastopol',
//       'St_Petersburg',
//       'Ukraine',
//       'Warsaw',
//     ],
//   },
//   Munich: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Germany',
//     adjacencyList: [
//       'Berlin',
//       'Bohemia',
//       'Burgundy',
//       'Kiel',
//       'Ruhr',
//       'Silesia',
//       'Tyrolia',
//     ],
//   },
//   Naples: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Italy',
//     adjacencyList: ['Apulia', 'Ionian_Sea', 'Rome', 'Tyrrhenian_Sea'],
//   },
//   North_Atlantic_Ocean: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Mid-Atlantic_Ocean', 'Tunis', 'Western_Mediterranean'],
//   },
//   North_Africa: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Clyde',
//       'Irish_Sea',
//       'Liverpool',
//       'Mid-Atlantic_Ocean',
//       'Norwegian_Sea',
//     ],
//   },
//   North_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Belgium',
//       'Denmark',
//       'Edinburgh',
//       'English_Channel',
//       'Helgoland_Bight',
//       'Holland',
//       'London',
//       'Norway',
//       'Norwegian_Sea',
//       'Skagerrak',
//       'Yorkshire',
//     ],
//   },
//   Norway: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Barents_Sea',
//       'Finland',
//       'North_Sea',
//       'Norwegian_Sea',
//       'Skagerrak',
//       'St_Petersburg',
//       'Sweden',
//     ],
//   },
//   Norwegian_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Barents_Sea',
//       'Clyde',
//       'Edinburgh',
//       'North_Atlantic_Ocean',
//       'North_Sea',
//       'Norway',
//     ],
//   },
//   Paris: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'France',
//     adjacencyList: ['Brest', 'Burgundy', 'Gascony', 'Picardy'],
//   },
//   Picardy: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Belgium', 'Brest', 'Burgundy', 'English_Channel', 'Paris'],
//   },
//   Piedmont: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Gulf_of_Lyon',
//       'Marseilles',
//       'Tuscany',
//       'Tyrolia',
//       'Venice',
//     ],
//   },
//   Portugal: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Mid-Atlantic_Ocean', 'Spain'],
//   },
//   Prussia: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Baltic_Sea', 'Berlin', 'Livonia', 'Silesia', 'Warsaw'],
//   },
//   Rome: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Italy',
//     adjacencyList: ['Apulia', 'Naples', 'Tuscany', 'Tyrrhenian_Sea', 'Venice'],
//   },
//   Ruhr: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Belgium', 'Burgundy', 'Holland', 'Kiel', 'Munich'],
//   },
//   Rumania: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Black_Sea',
//       'Budapest',
//       'Bulgaria',
//       'Galicia',
//       'Serbia',
//       'Sevastopol',
//       'Ukraine',
//     ],
//   },
//   Serbia: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Albania',
//       'Budapest',
//       'Bulgaria',
//       'Greece',
//       'Rumania',
//       'Trieste',
//     ],
//   },
//   Sevastopol: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Russia',
//     adjacencyList: ['Armenia', 'Black_Sea', 'Moscow', 'Rumania', 'Ukraine'],
//   },
//   Silesia: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Berlin',
//       'Bohemia',
//       'Galicia',
//       'Munich',
//       'Prussia',
//       'Warsaw',
//     ],
//   },
//   Skagerrak: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Denmark', 'North_Sea', 'Norway', 'Sweden'],
//   },
//   Smyrna: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Turkey',
//     adjacencyList: [
//       'Aegean_Sea',
//       'Ankara',
//       'Armenia',
//       'Constantinople',
//       'Eastern_Mediterranean',
//       'Syria',
//     ],
//   },
//   Spain: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Gascony',
//       'Gulf_of_Lyon',
//       'Marseilles',
//       'Mid-Atlantic_Ocean',
//       'Portugal',
//       'Western_Mediterranean',
//     ],
//   },
//   St_Petersburg: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Russia',
//     adjacencyList: [
//       'Barents_Sea',
//       'Finland',
//       'Gulf_of_Bothnia',
//       'Livonia',
//       'Moscow',
//       'Norway',
//     ],
//   },
//   Sweden: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Baltic_Sea',
//       'Denmark',
//       'Finland',
//       'Gulf_of_Bothnia',
//       'Norway',
//       'Skagerrak',
//     ],
//   },
//   Syria: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Armenia', 'Eastern_Mediterranean', 'Smyrna'],
//   },
//   Trieste: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Fleet',
//     player: '',
//     country: 'Austria_Hungary',
//     adjacencyList: [
//       'Adriatic_Sea',
//       'Albania',
//       'Budapest',
//       'Serbia',
//       'Tyrolia',
//       'Venice',
//       'Vienna',
//     ],
//   },
//   Tunis: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Ionian_Sea',
//       'North_Africa',
//       'Tyrrhenian_Sea',
//       'Western_Mediterranean',
//     ],
//   },
//   Tuscany: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Gulf_of_Lyon',
//       'Piedmont',
//       'Rome',
//       'Tyrrhenian_Sea',
//       'Venice',
//     ],
//   },
//   Tyrolia: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Bohemia', 'Munich', 'Trieste', 'Venice', 'Vienna'],
//   },
//   Tyrrhenian_Sea: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Gulf_of_Lyon',
//       'Ionian_Sea',
//       'Naples',
//       'Rome',
//       'Tunis',
//       'Tuscany',
//       'Western_Mediterranean',
//     ],
//   },
//   Ukraine: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Galicia', 'Moscow', 'Rumania', 'Sevastopol', 'Warsaw'],
//   },
//   Venice: {
//     spaceType: 'coast',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Italy',
//     adjacencyList: [
//       'Adriatic_Sea',
//       'Apulia',
//       'Piedmont',
//       'Rome',
//       'Trieste',
//       'Tuscany',
//       'Tyrolia',
//     ],
//   },
//   Vienna: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Austria_Hungary',
//     adjacencyList: ['Bohemia', 'Budapest', 'Galicia', 'Trieste', 'Tyrolia'],
//   },
//   Wales: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'English_Channel',
//       'Irish_Sea',
//       'Liverpool',
//       'London',
//       'Yorkshire',
//     ],
//   },
//   Warsaw: {
//     spaceType: 'landlocked',
//     isSupplyCenter: 'True',
//     unit: 'Army',
//     player: '',
//     country: 'Russia',
//     adjacencyList: [
//       'Galicia',
//       'Livonia',
//       'Moscow',
//       'Prussia',
//       'Silesia',
//       'Ukraine',
//     ],
//   },
//   Western_Mediterranean: {
//     spaceType: 'water',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: [
//       'Gulf_of_Lyon',
//       'Mid-Atlantic_Ocean',
//       'North_Africa',
//       'Spain',
//       'Tunis',
//       'Tyrrhenian_Sea',
//     ],
//   },
//   Yorkshire: {
//     spaceType: 'coast',
//     isSupplyCenter: 'False',
//     unit: '',
//     player: '',
//     country: '',
//     adjacencyList: ['Edinburgh', 'Liverpool', 'London', 'North_Sea', 'Wales'],
//   },
// };
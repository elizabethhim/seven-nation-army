import { getFirebase } from 'react-redux-firebase';

export const sessionID = '-LeTFyD10JE1O-GKaU14';
let orders = { sessionID: sessionID };
export let ordersList = [];
let territoriesJSON = {};
let players = {};
export let adjudicationPeriod = 0;

///////////////////////////
//*Firebase Interactions*//
///////////////////////////
//gets the current user
function getCurrentUser() {
  return getFirebase().auth().currentUser;
}
export function validateUser(territory) {
  return territory.getAttribute('player') === getCurrentUser().uid;
}
//submits current orders
export function submitOrders() {
  const action = orders;
  getFirebase()
    .database()
    .ref(
      'root/sessions/' +
        sessionID +
        '/participatingUserIDs/' +
        getCurrentUser().uid
    )
    .set({
      action,
    });
    console.log(orders);
}
export function getPlayers() {
  var playersRef = getFirebase()
    .database()
    .ref('root/sessions/' + sessionID + '/participatingUserIDs/');
  playersRef.on('value', function(snapshot) {
    for (let x in snapshot.val()) {
      players[x] = snapshot.val()[x].displayName;
    }
  });
}
export function getAdjudicationPeriod() {
  return getFirebase()
    .database()
    .ref('root/sessions/' + sessionID + '/adjudicationPeriod')
    .once('value')
    .then(function(snapshot) {
      adjudicationPeriod = snapshot.val();
    });
}

///////////////////////////
//*        Orders       *//
///////////////////////////
//Creates the orders{} object that will be sent to the server
export function buildOrders(action) {
  const x = Object.keys(orders).length;
  const exists = orderExists(action);
  let actionID = 0;
  if (action[1].actionID === 'move') {
    actionID = 1;
  } else if (action[1].actionID === 'support') {
    actionID = 2;
  } else if (action[1].actionID === 'convoy') {
    actionID = 3;
  }
  const secondaryUnit =
    action[3].secondaryUnit === '' ? 'none' : action[3].secondaryUnit;
  let newObj = {
    actionType: actionID,
    secondaryUnit: secondaryUnit,
    unitDest: action[2].unitDest,
    unitOrigin: action[0].unitOrigin,
  };

  const index = !exists[0] ? 'actionList' + x : 'actionList' + exists[1];
  orders[index] = newObj;
  makeOrdersList();
}
//Checks to see if an order for a territory already exists
//Returns a bool and index if found
function orderExists(action) {
  for (let i = 1; i <= Object.keys(orders).length; i += 1) {
    const temp = orders[`actionList${i}`];
    if (temp) {
      if (temp['unitOrigin'] === action[0].unitOrigin) {
        return [true, i];
      }
    }
  }
  return [false];
}

//Deletes an order from the orders object
function deleteOrder(action) {
  const exists = orderExists(action);
  if (exists[0]) {
    const key = 'actionList' + exists[1];
    delete orders[key];
  }
}
//Essentially a toString method for the orders objects
//Used to display the orders on the right side panel
function makeOrdersList() {
  //Blank list so we start fresh every time
  let tempList = [];
  for (let i = 1; i < Object.keys(orders).length; i++) {
    //Temporary order for ease of coding
    const temp = orders[`actionList${i}`];
    let ordersString = temp['unitOrigin'];

    switch (temp['actionType']) {
      case 1:
        ordersString += ' moves to ' + temp['unitDest'];
        break;
      case 0:
        ordersString += ' holds.';
        break;
      case 2:
        ordersString += ' supports ' + temp['unitDest'];
        break;
      default:
        break;
    }
    tempList.push(ordersString);
  }
  ordersList = tempList;
}
//clears out the orders and the map when the JSON is updated
export function cleanUp() {
  for (let x in orders) {
    deleteActionDrawings(orders[x]['unitOrigin']);
  }
  orders = { sessionID: sessionID };
  makeOrdersList();
}

///////////////////////////
//*    Coloring Stuff   *//
///////////////////////////
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
      territories[i].getAttribute('countrycolor') === 'yellow' ? 0 : 0.2;
    territories[i].setAttribute(
      'fill',
      territories[i].getAttribute('countrycolor')
    );
    territories[i].setAttribute(
      'stroke',
      territories[i].getAttribute('countrycolor')
    );
    territories[i].setAttribute('stroke-opacity', opacity);
    territories[i].setAttribute(
      'previouscolor',
      territories[i].getAttribute('countrycolor')
    );
    territories[i].setAttribute('fill-opacity', opacity);
  }
}
//Colors the territory yellow when the mouse hovers over it
export function highlight(territory) {
  territory.setAttribute('previouscolor', territory.getAttribute('fill'));
  territory.setAttribute('fill', 'yellow');
  territory.setAttribute('fill-opacity', 0.25);
}
//Removes the yellow color when the mouse exits
export function deHighlight(territory) {
  if (territory.getAttribute('previouscolor') === 'yellow') {
    territory.setAttribute('fill-opacity', 0);
  }
  territory.setAttribute('fill', territory.getAttribute('previouscolor'));
}

///////////////////////////
//*     Pop-up Stuff    *//
///////////////////////////
//Builds the string that will go within the popup
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
      ? `Player: ${players[territory.getAttribute('player')]}<br/>`
      : '';

  return country + territoryName + unit + player;
}
//Moves the popup to follow the cursor
export function movePopup(e) {
  let x = e.clientX + 85;
  let y = e.clientY - 20;

  x = x >= window.innerWidth - 85 ? window.innerWidth - 85 : x;
  y = 100 >= y ? 100 : y;
  const popupContainer = document.getElementById('popupContainer');

  if (popupContainer && popupContainer.getAttribute('mutable') === 'true') {
    popupContainer.style.top = y + 'px';
    popupContainer.style.left = x + 'px';
  }
}
//Opens the popup or not
//Really badly done, needs to be reworked
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

///////////////////////////
//*    Movement Stuff   *//
///////////////////////////
//Makes sure only valid selections are made for
//move or support orders
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
  if (!valid) {
    deleteActionDrawings(action[0].unitOrigin);
    deleteOrder(action);
  }
  return valid;
}
//Highlights everything that is a valid movement space
//and returns a list of territories that are valid
export function findMovementSpaces(territory) {
  const adjacencyList = territoriesJSON[territory.id].adjacencyList;
  let validMoveSpaces = [];

  for (let i = 0; i < adjacencyList.length; i++) {
    const adjacentTerritory = document.getElementById(adjacencyList[i]);
    if (adjacentTerritory) {
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
  }
  setFill([validMoveSpaces, 'green', '.15']);
  return validMoveSpaces;
}
//Theres some bugs with this one, needs to be redone
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
      if (msAdjacentTerritory) {
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
  }

  setFill([validSupportSpaces, 'green', 0.2]);
  return [validSupportSpaces, secondaryUnit];
}

///////////////////////////
//*  Map Drawing Stuff  *//
///////////////////////////
//Deletes any drawings that already exists
//Includes holds, arrowheads, and lines
function deleteActionDrawings(origin) {
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
}
//Calls the drawAction function for holds
export function holding(action) {
  drawAction(action[0].unitOrigin, action[2].unitDest, action[1].actionID);
}
//Draws the action
//Circle for hold
//Solid arrow for move
//Dashed for support
export function drawAction(origin, dest, actionId) {
  //delete markings if already exist
  deleteActionDrawings(origin);

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
  } else {
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
    if (actionId === 'support')
      arrowLine.setAttribute('stroke-dasharray', '8 8');

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

export function getJSON() {
  return territoriesJSON;
}

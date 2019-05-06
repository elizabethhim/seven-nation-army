/**
 * This file helps descibe the outcomes taken by player actions on the board.
 */

// Go through all actions and check if more than one power is moving to a destination
const boardState = {
  Adriatic_Sea: {
    adjacencyList: ['Albania', 'Apulia', 'Ionian_Sea', 'Trieste', 'Venice'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Aegean_Sea: {
    adjacencyList: [
      'Bulgaria',
      'Constantinople',
      'Eastern_Mediterranean',
      'Greece',
      'Ionian_Sea',
      'Smyrna',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Albania: {
    adjacencyList: [
      'Adriatic_Sea',
      'Greece',
      'Ionian_Sea',
      'Serbia',
      'Trieste',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Ankara: {
    adjacencyList: ['Armenia', 'Black_Sea', 'Constantinople', 'Smyrna'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Apulia: {
    adjacencyList: ['Adriatic_Sea', 'Ionian_Sea', 'Naples', 'Rome', 'Venice'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Armenia: {
    adjacencyList: ['Ankara', 'Black_Sea', 'Sevastopol', 'Smyrna', 'Syria'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Baltic_Sea: {
    adjacencyList: [
      'Berlin',
      'Denmark',
      'Gulf_of_Bothnia',
      'Kiel',
      'Livonia',
      'Prussia',
      'Sweden',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Barents_Sea: {
    adjacencyList: ['finland', 'Norway', 'Norwegian_Sea', 'St_Petersburg'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Belgium: {
    adjacencyList: [
      'Burgundy',
      'English_Channel',
      'Holland',
      'North_Sea',
      'Picardy',
      'Ruhr',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Berlin: {
    adjacencyList: ['Baltic_Sea', 'Kiel', 'Munich', 'Prussia', 'Silesia'],
    country: 'Germany',
    isSupplyCenter: 'True',
    player: 'GGxP4z3b1ggO6eHsVHlfumyGFyl2',
    spaceType: 'coast',
    unit: 'Army',
    unitPower: 1,
  },
  Black_Sea: {
    adjacencyList: [
      'Ankara',
      'Armenia',
      'Bulgaria',
      'Constantinople',
      'Romania',
      'Sevastopol',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Bohemia: {
    adjacencyList: ['Galicia', 'Munich', 'Silesia', 'Tyrolia', 'Vienna'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Brest: {
    adjacencyList: [
      'English_Channel',
      'Gascony',
      'Mid-Atlantic_Ocean',
      'Paris',
      'Picardy',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Budapest: {
    adjacencyList: ['Galicia', 'Rumania', 'Serbia', 'Trieste', 'Vienna'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Bulgaria: {
    adjacencyList: [
      'Aegean_Sea',
      'Black_Sea',
      'Constantinople',
      'Greece',
      'Romania',
      'Serbia',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Burgundy: {
    adjacencyList: [
      'Belgium',
      'Gascony',
      'Marseilles',
      'Munich',
      'Paris',
      'Picardy',
      'Ruhr',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Clyde: {
    adjacencyList: [
      'Edinburgh',
      'Liverpool',
      'North_Atlantic_Ocean',
      'Norwegian_Sea',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Constantinople: {
    adjacencyList: ['Aegean_Sea', 'Ankara', 'Black_Sea', 'Bulgaria', 'Smyrna'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Denmark: {
    adjacencyList: [
      'Baltic_Sea',
      'Helgoland_Bight',
      'Kiel',
      'North_Sea',
      'Skagerrak',
      'Sweden',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Eastern_Mediterranean: {
    adjacencyList: ['Aegean_Sea', 'Ionian_Sea', 'Smyrna', 'Syria'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Edinburgh: {
    adjacencyList: [
      'Clyde',
      'Liverpool',
      'North_Sea',
      'Norwegian_Sea',
      'Yorkshire',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  English_Channel: {
    adjacencyList: [
      'Belgium',
      'Brest',
      'Irish_Sea',
      'London',
      'Mid-Atlantic_Ocean',
      'North_Sea',
      'Picardy',
      'Wales',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Finland: {
    adjacencyList: [
      'Adriatic_Sea',
      'Gulf_of_Bothnia',
      'Norway',
      'St_Petersburg',
      'Sweden',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Galicia: {
    adjacencyList: [
      'Bohemia',
      'Budapest',
      'Rumania',
      'Silesia',
      'Ukraine',
      'Vienna',
      'Warsaw',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Gascony: {
    adjacencyList: [
      'Brest',
      'Burgundy',
      'Marseilles',
      'Mid-Atlantic_Ocean',
      'Paris',
      'Spain',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Greece: {
    adjacencyList: [
      'Aegean_Sea',
      'Albania',
      'Bulgaria',
      'Ionian_Sea',
      'Serbia',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Gulf_of_Bothnia: {
    adjacencyList: [
      'Baltic_Sea',
      'finland',
      'Livonia',
      'St_Petersburg',
      'Sweden',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Gulf_of_Lyon: {
    adjacencyList: [
      'Marseilles',
      'Piedmont',
      'Spain',
      'Tuscany',
      'Tyrrhenian_Sea',
      'Western_Mediterranean',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Helgoland_Bight: {
    adjacencyList: ['Denmark', 'Holland', 'Kiel', 'North_Sea'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Holland: {
    adjacencyList: ['Belgium', 'Helgoland_Bight', 'Kiel', 'North_Sea', 'Ruhr'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Ionian_Sea: {
    adjacencyList: [
      'Adriatic_Sea',
      'Aegean_Sea',
      'Albania',
      'Apulia',
      'Eastern_Mediterranean',
      'Greece',
      'Naples',
      'Tunis',
      'Tyrrhenian_Sea',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Irish_Sea: {
    adjacencyList: [
      'English_Channel',
      'Mid-Atlantic_Ocean',
      'North_Atlantic_Ocean',
      'Wales',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Kiel: {
    adjacencyList: [
      'Baltic_Sea',
      'Berlin',
      'Denmark',
      'Helgoland_Bight',
      'Holland',
      'Munich',
      'Ruhr',
    ],
    country: 'Germany',
    isSupplyCenter: 'True',
    player: 'GGxP4z3b1ggO6eHsVHlfumyGFyl2',
    spaceType: 'coast',
    unit: 'Fleet',
    unitPower: 1,
  },
  Liverpool: {
    adjacencyList: [
      'Clyde',
      'Edinburgh',
      'Irish_Sea',
      'North_Atlantic_Ocean',
      'Wales',
      'Yorkshire',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Livonia: {
    adjacencyList: [
      'Baltic_Sea',
      'Gulf_of_Bothnia',
      'Moscow',
      'Prussia',
      'St_Petersburg',
      'Warsaw',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  London: {
    adjacencyList: ['English_Channel', 'North_Sea', 'Wales', 'Yorkshire'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Marseilles: {
    adjacencyList: ['Burgundy', 'Gascony', 'Gulf_of_Lyon', 'Piedmont', 'Spain'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  'Mid-Atlantic_Ocean': {
    adjacencyList: [
      'Brest',
      'English_Channel',
      'Gascony',
      'Irish_Sea',
      'Irish_Sea',
      'North_Africa',
      'North_Atlantic_Ocean',
      'Portugal',
      'Spain',
      'Western_Mediterranean',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Moscow: {
    adjacencyList: [
      'Livonia',
      'Sevastopol',
      'St_Petersburg',
      'Ukraine',
      'Warsaw',
    ],
    country: 'Russia',
    isSupplyCenter: 'True',
    player: 'ipRCJb3TyJh4KHDKLNmR0rK8UPE2',
    spaceType: 'landlocked',
    unit: 'Army',
    unitPower: 1,
  },
  Munich: {
    adjacencyList: [
      'Berlin',
      'Bohemia',
      'Burgundy',
      'Kiel',
      'Ruhr',
      'Silesia',
      'Tyrolia',
    ],
    country: 'Germany',
    isSupplyCenter: 'True',
    player: 'GGxP4z3b1ggO6eHsVHlfumyGFyl2',
    spaceType: 'landlocked',
    unit: 'Army',
    unitPower: 1,
  },
  Naples: {
    adjacencyList: ['Apulia', 'Ionian_Sea', 'Rome', 'Tyrrhenian_Sea'],
    country: 'Italy',
    isSupplyCenter: 'True',
    player: 'LczZWVsIFFO2PlhecZIvfaAl8Mr2',
    spaceType: 'coast',
    unit: 'Fleet',
    unitPower: 1,
  },
  North_Africa: {
    adjacencyList: [
      'Clyde',
      'Irish_Sea',
      'Liverpool',
      'Mid-Atlantic_Ocean',
      'Norwegian_Sea',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  North_Atlantic_Ocean: {
    adjacencyList: ['Mid-Atlantic_Ocean', 'Tunis', 'Western_Mediterranean'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  North_Sea: {
    adjacencyList: [
      'Belgium',
      'Denmark',
      'Edinburgh',
      'English_Channel',
      'Helgoland_Bight',
      'Holland',
      'London',
      'Norway',
      'Norwegian_Sea',
      'Skagerrak',
      'Yorkshire',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Norway: {
    adjacencyList: [
      'Barents_Sea',
      'Finland',
      'North_Sea',
      'Norwegian_Sea',
      'Skagerrak',
      'St_Petersburg',
      'Sweden',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Norwegian_Sea: {
    adjacencyList: [
      'Barents_Sea',
      'Clyde',
      'Edinburgh',
      'North_Atlantic_Ocean',
      'North_Sea',
      'Norway',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Paris: {
    adjacencyList: ['Brest', 'Burgundy', 'Gascony', 'Picardy'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Picardy: {
    adjacencyList: ['Belgium', 'Brest', 'Burgundy', 'English_Channel', 'Paris'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Piedmont: {
    adjacencyList: [
      'Gulf_of_Lyon',
      'Marseilles',
      'Tuscany',
      'Tyrolia',
      'Venice',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Portugal: {
    adjacencyList: ['Mid-Atlantic_Ocean', 'Spain'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Prussia: {
    adjacencyList: ['Baltic_Sea', 'Berlin', 'Livonia', 'Silesia', 'Warsaw'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Rome: {
    adjacencyList: ['Apulia', 'Naples', 'Tuscany', 'Tyrrhenian_Sea', 'Venice'],
    country: 'Italy',
    isSupplyCenter: 'True',
    player: 'LczZWVsIFFO2PlhecZIvfaAl8Mr2',
    spaceType: 'coast',
    unit: 'Army',
    unitPower: 1,
  },
  Ruhr: {
    adjacencyList: ['Belgium', 'Burgundy', 'Holland', 'Kiel', 'Munich'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Rumania: {
    adjacencyList: [
      'Black_Sea',
      'Budapest',
      'Bulgaria',
      'Galicia',
      'Serbia',
      'Sevastopol',
      'Ukraine',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Serbia: {
    adjacencyList: [
      'Albania',
      'Budapest',
      'Bulgaria',
      'Greece',
      'Rumania',
      'Trieste',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Sevastopol: {
    adjacencyList: ['Armenia', 'Black_Sea', 'Moscow', 'Rumania', 'Ukraine'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Sevestopol: {
    country: 'Russia',
    player: 'ipRCJb3TyJh4KHDKLNmR0rK8UPE2',
    unit: 'Fleet',
    unitPower: 1,
  },
  Silesia: {
    adjacencyList: [
      'Berlin',
      'Bohemia',
      'Galicia',
      'Munich',
      'Prussia',
      'Warsaw',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Skagerrak: {
    adjacencyList: ['Denmark', 'North_Sea', 'Norway', 'Sweden'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Smyrna: {
    adjacencyList: [
      'Aegean_Sea',
      'Ankara',
      'Armenia',
      'Constantinople',
      'Eastern_Mediterranean',
      'Syria',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Spain: {
    adjacencyList: [
      'Gascony',
      'Gulf_of_Lyon',
      'Marseilles',
      'Mid-Atlantic_Ocean',
      'Portugal',
      'Western_Mediterranean',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  St_Petersburg: {
    adjacencyList: [
      'Barents_Sea',
      'finland',
      'Gulf_of_Bothnia',
      'Livonia',
      'Moscow',
      'Norway',
    ],
    country: 'Russia',
    isSupplyCenter: 'True',
    player: 'ipRCJb3TyJh4KHDKLNmR0rK8UPE2',
    spaceType: 'coast',
    unit: 'Fleet',
    unitPower: 1,
  },
  Sweden: {
    adjacencyList: [
      'Baltic_Sea',
      'Denmark',
      'finland',
      'Gulf_of_Bothnia',
      'Norway',
      'Skagerrak',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Syria: {
    adjacencyList: ['Armenia', 'Eastern_Mediterranean', 'Smyrna'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Trieste: {
    adjacencyList: [
      'Adriatic_Sea',
      'Albania',
      'Budapest',
      'Serbia',
      'Tyrolia',
      'Venice',
      'Vienna',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Tunis: {
    adjacencyList: [
      'Ionian_Sea',
      'North_Africa',
      'Tyrrhenian_Sea',
      'Western_Mediterranean',
    ],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Tuscany: {
    adjacencyList: [
      'Gulf_of_Lyon',
      'Piedmont',
      'Rome',
      'Tyrrhenian_Sea',
      'Venice',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Tyrolia: {
    adjacencyList: ['Bohemia', 'Munich', 'Trieste', 'Venice', 'Vienna'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Tyrrhenian_Sea: {
    adjacencyList: [
      'Gulf_of_Lyon',
      'Ionian_Sea',
      'Naples',
      'Rome',
      'Tunis',
      'Tuscany',
      'Western_Mediterranean',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Ukraine: {
    adjacencyList: ['Galicia', 'Moscow', 'Rumania', 'Sevastopol', 'Warsaw'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Venice: {
    adjacencyList: [
      'Adriatic_Sea',
      'Apulia',
      'Piedmont',
      'Rome',
      'Trieste',
      'Tuscany',
      'Tyrolia',
    ],
    country: 'Italy',
    isSupplyCenter: 'True',
    player: 'LczZWVsIFFO2PlhecZIvfaAl8Mr2',
    spaceType: 'coast',
    unit: 'Army',
    unitPower: 1,
  },
  Vienna: {
    adjacencyList: ['Bohemia', 'Budapest', 'Galicia', 'Trieste', 'Tyrolia'],
    country: '',
    isSupplyCenter: 'True',
    player: '',
    spaceType: 'landlocked',
    unit: '',
    unitPower: 0,
  },
  Wales: {
    adjacencyList: [
      'English_Channel',
      'Irish_Sea',
      'Liverpool',
      'London',
      'Yorkshire',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
  Warsaw: {
    adjacencyList: [
      'Galicia',
      'Livonia',
      'Moscow',
      'Prussia',
      'Silesia',
      'Ukraine',
    ],
    country: 'Russia',
    isSupplyCenter: 'True',
    player: 'ipRCJb3TyJh4KHDKLNmR0rK8UPE2',
    spaceType: 'landlocked',
    unit: 'Army',
    unitPower: 1,
  },
  Western_Mediterranean: {
    adjacencyList: [
      'Gulf_of_Lyon',
      'Mid-Atlantic_Ocean',
      'North_Africa',
      'Spain',
      'Tunis',
      'Tyrrhenian_Sea',
    ],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'water',
    unit: '',
    unitPower: 0,
  },
  Yorkshire: {
    adjacencyList: ['Edinburgh', 'Liverpool', 'London', 'North_Sea', 'Wales'],
    country: '',
    isSupplyCenter: 'False',
    player: '',
    spaceType: 'coast',
    unit: '',
    unitPower: 0,
  },
};

const participatingUserIDs = {
  GGxP4z3b1ggO6eHsVHlfumyGFyl2: {
    action: {
      actionList1: {
        actionType: 0,
        secondaryUnit: 'none',
        unitDest: 'Berlin',
        unitOrigin: 'Berlin',
      },
      actionList2: {
        actionType: 1,
        secondaryUnit: 'none',
        unitDest: 'Tyrolia',
        unitOrigin: 'Munich',
      },
      actionList3: {
        actionType: 1,
        secondaryUnit: 'none',
        unitDest: 'Baltic_Sea',
        unitOrigin: 'Kiel',
      },
    },
    country: 'Germany',
  },
  LczZWVsIFFO2PlhecZIvfaAl8Mr2: {
    action: {
      actionList1: {
        actionType: 1,
        secondaryUnit: 'none',
        unitDest: 'Tuscany',
        unitOrigin: 'Rome',
      },
      actionList2: {
        actionType: 0,
        secondaryUnit: 'none',
        unitDest: 'Naples',
        unitOrigin: 'Naples',
      },
      actionList3: {
        actionType: 1,
        secondaryUnit: 'none',
        unitDest: 'Tyrolia',
        unitOrigin: 'Venice',
      },
    },
    country: 'Italy',
  },
  ipRCJb3TyJh4KHDKLNmR0rK8UPE2: {
    action: {
      actionList1: {
        actionType: 0,
        secondaryUnit: 'none',
        unitDest: 'Warsaw',
        unitOrigin: 'Warsaw',
      },
      actionList2: {
        actionType: 0,
        secondaryUnit: 'none',
        unitDest: 'St_Petersburg',
        unitOrigin: 'St_Petersburg',
      },
      actionList3: {
        actionType: 1,
        secondaryUnit: 'none',
        unitDest: 'Black_Sea',
        unitOrigin: 'Sevastopol',
      },
      actionList4: {
        actionType: 0,
        secondaryUnit: 'none',
        unitDest: 'Moscow',
        unitOrigin: 'Moscow',
      },
    },
    country: 'Russia',
  },
};

// Returns the difference between the power levels of partyA and partyB.
// E.g., If partyA.unitPower == 3 and partyB.unitPower == 1, this returns 2.
const contestWinnerBetween = (territoryA, territoryB) => {
  // Measure by supporters
  // return getSupportersOf(territoryA).length - getSupportersOf(territoryB).length;
  // Measure by unitPower from game state
  return powerOf(territoryA) - powerOf(territoryB);
};

const isBlockedAt = territory => {
  const attackers = countriesContestedAt(territory);
  let isContested = true;
  let maxPower = -1;
  attackers.forEach(t => {
    if (powerOf(t) >= maxPower) {
      maxPower = powerOf(t);
      isContested = true;
    } else if (powerOf(t) === maxPower) {
      isContested = false;
    }
  });
  return isContested;
};

const countriesContestedAt = territory => {
  const countries = [];
  for (let userID in participatingUserIDs) {
    for (let action in participatingUserIDs[userID].action) {
      if (participatingUserIDs[userID].action[action].unitDest === territory) {
        countries.push(participatingUserIDs[userID].action[action].unitOrigin);
      }
    }
  }
  return countries;
};

// Return a count of countries that have pledged to support a unit at a given territory
const getSupporterCountOf = territory => {
  let countries = 0;
  for (let userID in participatingUserIDs) {
    for (let action in participatingUserIDs[userID].action) {
      if (
        participatingUserIDs[userID].action[action].actionType === 2 &&
        participatingUserIDs[userID].action[action].secondaryUnit === territory
      ) {
        countries += 1;
      }
    }
  }
  return countries;
};

// Return a list of countries that have pledged to support a unit at a given territory
const getSupportersOf = territory => {
  const countries = [];
  for (let userID in participatingUserIDs) {
    for (let action in participatingUserIDs[userID].action) {
      if (
        participatingUserIDs[userID].action[action].actionType === 2 &&
        participatingUserIDs[userID].action[action].secondaryUnit === territory
      ) {
        countries.push(participatingUserIDs[userID].action[action].unitOrigin);
      }
    }
  }
  return countries;
};

const countryAt = territory => {
  return boardState[territory].country;
};

const unitAt = territory => {
  return boardState[territory].unit;
};

const playerIDAt = territory => {
  return boardState[territory].player;
};

const powerOf = territory => {
  return boardState[territory].unitPower;
};

const playerIDOf = country => {
  for (let userID in participatingUserIDs) {
    if (participatingUserIDs[userID].country === country) {
      return userID;
    }
  }
  return '';
};

import React, { Component } from "react";

import { InputGroupAddon, Input } from 'reactstrap';

import "../styles/Legend.scss";

export default class Legend extends Component {

	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<div className="resize_fit_top_left">

				<p className='countryName' style={{color: '#ed497d'}}>
				<text style={{color: 'red'}}>■</text>Austria
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>
				
				<p className='countryName' style={{color: '#605aa7'}}>
					<text style={{color: 'green'}}>■</text>England
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>
				
				<p className='countryName' style={{color: '#9a9148'}} >
					<text style={{color: 'green'}}>■</text>France
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>
				
				<p className='countryName' style={{color: '#c0495e'}} >
					<text style={{color: 'red'}}>■</text>Germany
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>

				<p className='countryName' style={{color: '#cb75db'}} >
					<text style={{color: 'green'}}>■</text>Italy
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>
				
				<p className='countryName' style={{color: '#c95df6'}} >
					<text style={{color: 'red'}}>■</text>Russia
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>

				<p className='countryName' style={{color: '#7b69b8'}} >
					<text style={{color: 'red'}}>■</text>Turkey
				</p>
				<p className='countryInfo'>
					• playerName<br/>
					• units
				</p>
			</div>
		);
	}
}

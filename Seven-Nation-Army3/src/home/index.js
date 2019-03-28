import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import UserRepos from './containers/UserRepos';
import './style.scss';
import { NavLink } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div>
				<div className="fullscreen-bg">
					<video loop muted autoPlay poster={require("../media/images/BackgroundVidStill.png")} className="fullscreen-bg__video">
						<source src={require("../media/videos/OceanBackground.mp4")} type="video/mp4"/>
						<source src={require("../media/videos/OceanBackground.ogv")} type="video/ogg"/>
					</video>
				</div>
				<div>
					<NavLink to="/map" exact>
						<img
							className="screen_item resize_fit_center item"
							src={require("../media/images/main_menu_new_game.png")}
						/>
					</NavLink>
					<img
						className="screen_item resize_fit_center item"
						style={{ top: '30%' }}
						src={require("../media/images/main_menu_continue.png")}
					/>
					<img
						className="screen_item resize_fit_center item"
						style={{ top: '60%' }}
						src={require("../media/images/main_menu_settings.png")}
					/>
				</div>

			</div>
		);
	}
}

export default Home;

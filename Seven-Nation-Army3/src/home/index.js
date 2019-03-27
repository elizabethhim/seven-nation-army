import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import UserRepos from './containers/UserRepos';
import './style.scss';

class Home extends Component {
	render() {
		return (
			<div id="home">
				<Container>
					<h2 className="text-center">Home</h2>
					<UserRepos />
				</Container>
			</div>
		);
	}
}

export default Home;

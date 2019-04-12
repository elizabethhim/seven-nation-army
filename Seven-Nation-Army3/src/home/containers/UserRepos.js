import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Repo from '../components/Repo';
import getUserRepos from '../../store/thunks/getUserRepos';

import { bindActionCreators } from 'redux'

class UserRepos extends Component {

	componentDidMount() {
		let username = 'mohandere';
		this.props.getUserRepos(username);
	}

	render() {
		let pageContent = ''
		let { repos, isLoading } = this.props;

		if (isLoading) {
			pageContent = (
				<div className="userReposLoader">
					Loading...
        </div>
			)
		} else {
			pageContent = (
				<ul className="repos">
					{repos.map((repo, i) => <Repo key={i} {...repo} />)}
				</ul>
			)
		}

		return (
			<div>
				<h3>Github Projects</h3>
				{pageContent}
			</div>
		);

	}
}

UserRepos.propTypes = {
	repos: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		repos: state.home.userRepos.repos,
		isLoading: state.home.userRepos.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getUserRepos,
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRepos);

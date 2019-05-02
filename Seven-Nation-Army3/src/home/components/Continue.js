import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Video from '../../common/components/Video';
import { getSessions } from '../../store/actions/getSession';

class Continue extends Component {
  componentDidMount() {
    this.props.getSessions();
  }

  render() {
    console.log('Sessions', this.props.sessions);
    return <Video />;
  }
}

Continue.propTypes = {
  sessions: PropTypes.object,
  getSessions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sessions: state.sessionList.sessions,
});

const mapDispatchToProps = dispatch => ({
  getSessions: () => dispatch(getSessions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Continue);

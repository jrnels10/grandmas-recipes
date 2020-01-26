import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { withRouter } from 'react-router-dom';
import './fullscreen.css'


class FullScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    redirect = () => {
        this.props.history.goBack();
    }
    render() {
        return <Consumer>
            {value => {
                return <img className='full-screen' src={value.fullScreenImage} onClick={this.redirect} alt='Uses entire screen for visualization' />
            }}
        </Consumer>
    }
}

export default withRouter(FullScreen);
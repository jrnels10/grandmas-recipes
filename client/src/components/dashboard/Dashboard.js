import React, { Component } from 'react';
import secretResponse from './../HOC/Secret';
import './dashBoard.css';
import { NavigateButton } from './../tools/Buttons';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

        secretResponse(this.props.data.dispatch, this)
    }
    reload = () => {
        secretResponse(this.props.data.dispatch, this);
    }

    render() {
        return <div className="dashboard-container">
            <div className="dashboard-buttons-container">
                <NavigateButton customClassName='dashboard-button w-100' pathTo={'/familychefs'}>View Chefs</NavigateButton>
                <NavigateButton customClassName='dashboard-button w-100' pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
            </div>
        </div>
    };
};

export default DashBoard;
import React, { Component } from 'react';
import { Consumer } from '../../Context';
import secretResponse from './../HOC/Secret';
import './dashBoard.css'
import PageWrapper from '../tools/PageWrapper';
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
        return <Consumer>
            {value => {
                return <PageWrapper>
                    <div className="dashboard-container">
                        <div className="dashboard-buttons-container">
                            <NavigateButton customClassName='dashboard-button' pathTo={'/familychefs'}>View Chefs</NavigateButton>
                            <NavigateButton customClassName='dashboard-button' pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
                        </div>
                    </div>
                </PageWrapper>
            }}
        </Consumer >
    }
}

export default DashBoard;
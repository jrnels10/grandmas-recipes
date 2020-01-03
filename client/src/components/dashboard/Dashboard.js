import React, { Component } from 'react';
import { Consumer } from '../../Context';

import secretResponse from './../HOC/Secret';

import './dashBoard.css'
import PageWrapper from '../tools/PageWrapper';

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
                    <h2>DashBoard</h2>
                </PageWrapper>
            }}
        </Consumer >
    }
}

export default DashBoard;
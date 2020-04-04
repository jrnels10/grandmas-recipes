import React, { Component } from 'react';
import CardListContainer from './CardListContainer';
import secretResponse from '../HOC/Secret';
import Card from './Card';


class CardsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        secretResponse(this.props.data.dispatch, this)
    }
    render() {
        const { data, dataType } = this.props;
        return <CardListContainer value={this.props.data}>
            {
                data.user.chefs
            }
        </CardListContainer>
    }
}

export default CardsHome;
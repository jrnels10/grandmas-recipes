import React, { Component } from 'react';

class GeneralLargeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={`card general-card ${this.props.classNombre ? this.props.classNombre : ''}`} style={{ width: '22rem', marginTop: "10px" }}>
            {this.props.children}
        </div>
    }
}

export default GeneralLargeCard;
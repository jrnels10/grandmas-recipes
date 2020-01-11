import React, { Component } from 'react';

class GeneralLargeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log(this.props)
        return <div className={`card general-card m-auto ${this.props.classNombre}`} style={{ width: '22rem' }}>
            {this.props.children}
        </div>
    }
}

export default GeneralLargeCard;
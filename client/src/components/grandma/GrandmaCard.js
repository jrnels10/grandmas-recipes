import React, { Component } from 'react';

import './grandma.css';

class GrandmaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { chefImage } = this.props.chef;
        return <div className="card m-auto" style={{ width: '22rem', height: '90vh' }}>
            <img className="card-img-top" src={chefImage} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    }
}

export default GrandmaCard;
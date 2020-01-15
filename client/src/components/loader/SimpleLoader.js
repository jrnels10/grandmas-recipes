import React, { Component } from 'react';

import './simpleloader.css';

class SimpleLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className='loader-container'>
            <div className="simple-loader"></div>
        </div>
    }
}

export default SimpleLoader;
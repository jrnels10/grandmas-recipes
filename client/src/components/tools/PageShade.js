import React, { Component } from 'react';
import './pagewrapper.css'

class PageShade extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className="page-shade">
            {this.props.children}
        </div>
    }
}

export default PageShade;
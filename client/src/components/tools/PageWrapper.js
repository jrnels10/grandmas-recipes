import React, { Component } from 'react';
import './pagewrapper.css';
class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className="page-wrapper-container">
            {this.props.children}
        </div>
    }
}

export default PageWrapper;
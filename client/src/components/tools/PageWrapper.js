import React, { Component } from 'react';
import './pagewrapper.css';
import { withRouter } from 'react-router-dom';
class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { isTop: 0 }
    }

    render() {
        return <div className="page-wrapper-container">
            {this.props.children}
        </div>
    }
}

export default withRouter(PageWrapper);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class NavigateButton extends Component {
    //pathTo, children
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const customClass = this.props.customClassName ? this.props.customClassName : '';
        return <Link className="nav-link p-0 text-white" to={`${this.props.pathTo}`} >
            <button type="submit" className={`btn signin-button ${customClass}`}>{this.props.children}</button>
        </Link>
    }
}
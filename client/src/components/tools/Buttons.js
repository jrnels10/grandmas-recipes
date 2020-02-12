import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class NavigateButton extends Component {
    //pathTo, children
    constructor(props) {
        super(props);
        this.state = {}
    }

    selected = (selected, type) => {
        if (type === 'edit') {
            this.props.value.dispatch({
                type: 'VIEW_MY_CHEF',
                payload: { selected: selected }
            })
        }
    }
    render() {
        const customClass = this.props.customClassName ? this.props.customClassName : '';
        return <Link className="nav-link p-0 text-white" to={`${this.props.pathTo}`} onClick={this.selected.bind(this, this.props.selected, this.props.type)}>
            <button type="submit" className={`btn signin-button ${customClass}`}>{this.props.children}</button>
        </Link>
    }
}
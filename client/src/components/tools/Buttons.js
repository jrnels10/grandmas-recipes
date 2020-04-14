import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class NavigateButton extends Component {
    //pathTo, children
    constructor(props) {
        super(props);
        this.state = {}
    }

    selected = (selected, type) => {
        if (selected && type) {
            if (type === 'editChef' || type === 'editRecipe' || type === 'familyHome') {
                this.props.value.dispatch({
                    type: 'ITEM_SELECTED',
                    payload: { selected: selected }
                });
            }
            else if (type === 'fullscreenChef') {
                this.props.value.dispatch({ type: 'FULLSCREEN_IMAGE', payload: { fullScreenImage: selected.chefImage } })
            }
            else if (type === 'fullscreenRecipe') {

                this.props.value.dispatch({ type: 'FULLSCREEN_IMAGE', payload: { fullScreenImage: selected.image } })
            }

        };
    };

    render() {
        const customClass = this.props.customClassName ? this.props.customClassName : '';
        return <Link
            className="nav-link p-0 text-white"
            to={`${this.props.pathTo}`}
            onClick={this.selected.bind(this, this.props.selected, this.props.type)}>
            <button type="submit" className={`btn signin-button-v2 ${customClass}`}>{this.props.children}</button>
        </Link>
    }
}

export const BackButton = ({ goBack }) => {
    return <svg className="bi bi-arrow-left back-to-home" onClick={goBack} width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
    </svg>
}
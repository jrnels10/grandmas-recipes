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
            if (type === 'editChef') {
                this.props.value.dispatch({
                    type: 'VIEW_MY_CHEF',
                    payload: { selected: selected }
                });
            }
            else if (type === 'editRecipe') {
                this.props.value.dispatch({
                    type: 'EDIT_MY_RECIPE',
                    payload: { selected: selected }
                });
            }
            else if (type === 'fullscreenChef') {
                this.props.value.dispatch({ type: 'FULLSCREEN_IMAGE', payload: { fullScreenImage: selected.chefImage } })
            }
            else if (type === 'fullscreenRecipe') {
                debugger
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
            <button type="submit" className={`btn signin-button ${customClass}`}>{this.props.children}</button>
        </Link>
    }
}
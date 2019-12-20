import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './addrecipe.css'

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    add = () => {
        console.log(this.props.history)
        // this.props.history.push('/addrecipes');
    }
    render() {
        return <Link to="/addrecipe">
            <label>
                <span>Add Recipe</span>
                <i className="fas fa-plus" />
            </label>
        </Link >
    }
}

export default AddRecipe;
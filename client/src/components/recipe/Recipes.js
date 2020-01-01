import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './recipes.css'
class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        // debugger
        // console.log(this.props.recipeData)
        const { recipeName, _id, img, chefName, chefBio } = this.props.recipeData;
        return <div className="card recipe-card">
            <Link to={`/dashboard/${_id}`}>
                <img className="recipe-card-image" src={img} />
                <label>{recipeName}</label>
                {this.props.private ? <i className="fas fa-user-lock"></i> : <i className="fas fa-users"></i>}
            </Link>
        </div>
    }
}

export default Recipe;
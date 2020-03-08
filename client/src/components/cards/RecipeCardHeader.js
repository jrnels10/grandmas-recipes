import React, { Component } from 'react';
import RecipeOptions from './RecipeOptions';

class RecipeCardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { recipeName, dateSubmitted, recipeImage, _id } = this.props.recipe;
        return <div className='recipe-card-header'>
            <div className='w-75 mini-recipe-care-title-container'>
                <label className="card-title mini-recipe-card-title w-100">{recipeName}</label>
                <span className="card-title mini-recipe-card-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
            </div>
            <RecipeOptions options={{ value: this.props.value, image: recipeImage, recipeId: _id }} />
        </div>
    }
}

export default RecipeCardHeader;
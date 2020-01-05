import React, { Component } from 'react';
import privateIcon from './../../Images/icons/alert-square.svg'
import { Link, Route } from 'react-router-dom';
import './recipecard.css';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.value.value.dispatch({
            type: 'VIEW_MY_RECIPE',
            payload: { selected: this.props.recipe }
        })
    }
    render() {
        // console.log(this.props)
        const { recipeName, img, _id } = this.props.recipe;
        const recipePrivate = this.props.recipe.private;
        return <div className="card recipe-card" >
            <Link className="nav-link p-0 text-white" to={`/recipe/selectedrecipe/${_id}`} >
                <img className="card-recipe-img" src={img} alt="recipe" />
            </Link>
            <h5 className="card-title recipe-card-title">{recipeName}</h5>
        </div>
    }
}

export default RecipeCard;
import React, { Component } from 'react';
import { likemyrecipe } from './../../API/RecipeAPI';
import { Link } from 'react-router-dom';


class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { description: false, heart: false, modal: false, likedRecipes: [], liked: this.props.recipe.liked }
    };

    toggle = (title) => {
        this.setState({ [title]: !this.state[title] })
    };

    toggleHeart = async (e) => {
        this.setState({ heart: !this.state.heart });
        const res = await likemyrecipe(this.props.recipe._id, { userId: this.props.value.user.id })
        this.setState({ liked: res.data.liked });
    };

    componentWillUnmount() {

    }

    selected = () => {
        this.props.value.dispatch({
            type: 'VIEW_MY_RECIPE',
            payload: { selected: Object.assign(this.props.recipe, { chefName: this.props.chefName }) }
        });
    };

    render() {
        const { heart, description, liked } = this.state;
        const { recipeImage, _id, recipeDescription, recipeName, dateSubmitted } = this.props.recipe;
        return <div className="card mini-recipe-card" >
            <div className='recipe-card-header'>
                <div className='w-75 mini-recipe-care-title-container'>
                    <label className="card-title mini-recipe-card-title w-100">{recipeName}</label>
                    <span className="card-title mini-recipe-card-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                </div>
            </div>
            <Link className="nav-link p-0 text-white" onClick={this.selected.bind(this)} to={`/recipe/selectedrecipe/${_id}`} >
                <img className="mini-card-recipe-img" src={recipeImage} alt="recipe" />
            </Link>
            <div className={`mini-recipe-card-description-${description ? 'full' : 'short'}`}>
                <p className="mini-recipe-card-description">{recipeDescription}</p>
            </div>
            <div className="mini-recipe-card-actions row">
                <div className="mini-recipe-card-heart-container col-2">
                    {heart || liked ?
                        <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clipRule="evenodd" />
                        </svg> :
                        <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clipRule="evenodd" />
                        </svg>}
                </div>
                {liked > 0 ?
                    <React.Fragment>
                        <svg className="bi bi-circle-fill liked-icon" width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="#bf0d00" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className='liked-number'>{liked}</span>
                    </React.Fragment>
                    : null}
                <div className="mini-share col-8">

                </div>

                {!description ? <svg className="bi bi-chevron-down mini-chevron-down col-2" onClick={this.toggle.bind(this, 'description')} id='description' width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.646 6.646a.5.5 0 01.708 0L10 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clipRule="evenodd" />
                </svg> : <svg className="bi bi-chevron-up mini-chevron-down col-2" onClick={this.toggle.bind(this, 'description')} id='description' width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L10 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clipRule="evenodd" />
                    </svg>}
            </div>
        </div>
    };
};

export default RecipeCard;
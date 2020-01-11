import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import MiniRecipeCard from './MiniRecipeCard';
import './grandma.css';
import './recipecard.css';

import RecipeCard from './RecipeCard';
import GeneralLargeCard from './GeneralLargeCard';


class GrandmaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    delayRedirect = event => {
        let to = event.target.pathname;
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(() => push(to), 300);
    }
    render() {
        const options = {
            items: 2,
            margin: 20,
            nav: false,
            rewind: true,
            autoplay: false,
            loop: true
        };
        const { selected } = this.props.value.recipe;
        const { chefImage, chefName, chefBio, author, _id, chefRecipes } = this.props.chef;
        const numberOfRecipes = chefRecipes.length;
        return <GeneralLargeCard>
            <h5 className="card-title grandma-card-title">{chefName}</h5>
            <div className="row card-graphics-container">
                <img className="card-img-top" src={chefImage} alt="portrait of chef" />
                <div className="col-12 card-graphics-container-light" />
                <div className="col-12 card-graphics-container-dark" >
                </div>
            </div>
            <div className="card-body grandma-card-body">
                <p className="card-text ">{chefBio}</p>
                <p className="card-author"> -{author}</p>
                {/* <div className="position-relative"> */}
                <div className="row w-100 mb-3">
                    <div className="col-8">
                        <Link className="nav-link p-0 text-white" to={`/addrecipe/${_id}`} >Add New Recipe</Link>
                    </div>
                </div>
                <div className="row w-100 m-0 mb-3 mini-card-container">
                    {numberOfRecipes > 0 ?
                        <div className='w-100'>
                            {chefRecipes.map((recipe, idx) => {
                                return <MiniRecipeCard key={idx} recipe={recipe} value={this.props} />
                            })}
                        </div>
                        : <span>No recipes.</span>}
                </div>
            </div>
            {/* </div> */}
        </GeneralLargeCard >

    }
}

export default GrandmaCard;
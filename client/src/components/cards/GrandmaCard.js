import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import MiniRecipeCard from './MiniRecipeCard';
import './grandma.css';
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
            <img className="card-img-top" src={chefImage} alt="portrait of chef" />
            <div className="row card-graphics-container">
                <div className="col-12 card-graphics-container-light"></div>
                <div className="col-12 card-graphics-container-dark">
                    <div className="card-body grandma-card-body">
                        <p className="card-author"> -{author}</p>
                        <div className="row w-100 mb-3">
                            <div className="col-8">
                                <Link className="nav-link p-0 text-white" to={`/addrecipe/${_id}`} >Add New Recipe</Link>
                            </div>
                        </div>
                        <div className="row w-100 m-0 mb-3 mini-card-container">
                            {numberOfRecipes > 0 ?
                                <div className='w-100'>
                                    <OwlCarousel
                                        options={options}
                                    >
                                        {chefRecipes.map((recipe, idx) => {
                                            return <MiniRecipeCard key={idx} recipe={recipe} value={this.props} />
                                        })}
                                    </OwlCarousel>
                                </div>
                                : <span>No recipes.</span>}
                        </div>
                        <p className="card-text ">{chefBio}</p>

                    </div>
                </div>
            </div>
        </GeneralLargeCard>

    }
}

export default GrandmaCard;
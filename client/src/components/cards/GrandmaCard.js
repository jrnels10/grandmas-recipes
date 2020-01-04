import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import RecipeCard from './RecipeCard';
import './grandma.css';


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
        console.log(this.props.chef)
        const { chefImage, chefName, chefBio, author, _id, chefRecipes } = this.props.chef;
        const numberOfRecipes = chefRecipes.length;
        return <div className="card grandma-card m-auto" style={{ width: '22rem' }}>
            <img className="card-img-top" src={chefImage} alt="portrait of chef" />
            <div className="card-img-top-shadow" />
            <h5 className="card-title grandma-card-title">{chefName}</h5>
            <div className="card-body grandma-card-body">
                <p className="card-text ">{chefBio}</p>
                <p className="card-author"> -{author}</p>
                <div className="row w-100 mb-3">
                    <div className="col-8">
                        <Link className="nav-link p-0 text-white" to={`/addrecipe/${_id}`} >Add New Recipe</Link>
                    </div>
                    {/* <div className="col-6">
                        <Link className="nav-link p-0 text-white" to="/addrecipe" onClick={this.delayRedirect}>View Recipes</Link>
                    </div> */}
                </div>
                <div className="row w-100 m-0 mb-3">
                    {numberOfRecipes > 0 ?
                        <div className='w-100'>
                            <OwlCarousel
                                options={options}
                            >
                                {chefRecipes.map((recipe, idx) => {
                                    return <RecipeCard key={idx} recipe={recipe} value={this.props} />
                                })}
                            </OwlCarousel>
                        </div>
                        : <span>No recipes.</span>}
                </div>
            </div>
        </div>
    }
}

export default GrandmaCard;
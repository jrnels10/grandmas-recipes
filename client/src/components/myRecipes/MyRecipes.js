import React, { Component } from 'react';
import Recipe from '../recipe/Recipes';
import OwlCarousel from 'react-owl-carousel';
import './myRecipes.css'

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const options = {
    items: 4,
    dots: true,
    autoplay: true
}

export default class MyRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props)
        // debugger
        return <div className='myrecipes-container'>
            <OwlCarousel
                items={2}
                className="owl-theme"
                loop={true}
                dots={true}
                autoplay={true}
                autoplaySpeed={2000}
                margin={10}
                nav
            >
                {this.props.value.myRecipes.map((recipe, idx) => {
                    return <Recipe key={idx} recipeData={recipe} />
                })}
            </OwlCarousel>

        </div>

    };
};
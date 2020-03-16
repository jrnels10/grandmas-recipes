import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Slider from "react-slick";
import secretResponse from './../HOC/Secret';
import GrandmaCard from '../cards/GrandmaCard';
import { NavigateButton } from './../tools/Buttons';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedRecipes: []
        }
    }
    componentDidMount() {
        secretResponse(this.props.data.dispatch, this)
    }
    componentWillUnmount() {
        console.log(this.state)
        debugger
    }

    myLikedRecipes = (recipeId, liked) => {
        liked ?
            this.setState({ likedRecipes: [...this.state.likedRecipes, recipeId] }) :
            this.setState({ likedRecipes: [...this.state.likedRecipes.filter(recipe => { return recipe !== recipeId })] })
    };

    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return <Consumer>
            {value => {
                return value.user.chefs.length > 0 ?
                    <Slider {...settings}>
                        {value.user.chefs.map((chef, idx) => {
                            return <GrandmaCard key={idx} chef={chef} value={value} myLikedRecipes={this.myLikedRecipes} />
                        })}
                    </Slider>
                    : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
            }
            }
        </Consumer >
    }
}

export default CardContainer;
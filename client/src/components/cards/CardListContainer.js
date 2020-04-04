import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Slider from "react-slick";
import ChefCardMini from './CardMini/ChefCardMini';

import { NavigateButton } from '../tools/Buttons';

class CardListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedRecipes: []
        }
    }


    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            vertical: true
        };
        const { children, dataType, value } = this.props;
        return children ?
            // <Slider {...settings}>
            <React.Fragment>

                {children.map((chef, idx) => {
                    // const chefFamilies = children.user.families.filter(family => {
                    //     return family.chefId === chef.chefId;
                    // });
                    return <ChefCardMini key={idx} chef={chef} value={value} />
                })}
            </React.Fragment>
            // </Slider>
            : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
    }
}

export default CardListContainer;
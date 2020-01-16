import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Slider from "react-slick";
import secretResponse from './../HOC/Secret';
import GrandmaCard from '../cards/GrandmaCard';
import PageWrapper from '../tools/PageWrapper';
import { NavigateButton } from './../tools/Buttons';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        secretResponse(this.props.data.dispatch, this)
    }
    reload = () => {
        secretResponse(this.props.data.dispatch, this);
    }

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
                console.log(value)
                return <PageWrapper value={value}>
                    {value.user.myRecipes.length > 0 ?
                        <Slider {...settings}>
                            {value.user.myRecipes.map((chef, idx) => {
                                return <GrandmaCard key={idx} chef={chef} value={value} />
                            })}
                        </Slider>
                        : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>}
                </PageWrapper>
            }
            }
        </Consumer >
    }
}

export default CardContainer;
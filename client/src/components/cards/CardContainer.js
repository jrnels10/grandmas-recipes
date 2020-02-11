import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Slider from "react-slick";
import secretResponse from './../HOC/Secret';
import GrandmaCard from '../cards/GrandmaCard';
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
                debugger
                return value.user.chefs.length > 0 ?
                    <Slider {...settings}>
                        {value.user.chefs.map((chef, idx) => {
                            return <GrandmaCard key={idx} chef={chef} value={value} />
                        })}
                    </Slider>
                    : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
            }
            }
        </Consumer >
    }
}

export default CardContainer;
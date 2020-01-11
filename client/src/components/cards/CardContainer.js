import React, { Component } from 'react';
import { Consumer } from '../../Context';
// import OwlCarousel from 'react-owl-carousel';
import OwlCarousel from 'react-owl-carousel2';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import secretResponse from './../HOC/Secret';
import GrandmaCard from '../cards/GrandmaCard';
// import './../dashboard/dashboard.css';
import PageWrapper from '../tools/PageWrapper';
import { Link } from 'react-router-dom';
import { NavigateButton } from './../tools/Buttons';
import PageShade from '../tools/PageShade';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        secretResponse(this.props.data.dispatch, this)
        const cardSwtich = document.getElementsByClassName('owl-dot');
        console.log(cardSwtich)
        return cardSwtich[0] ? cardSwtich[0].addEventListener('click', () => {
            window.scrollTo(0, 0)
        }) : null

    }
    reload = () => {
        secretResponse(this.props.data.dispatch, this);
    }
    addedChef = () => {

    }

    render() {
        const options = {
            items: 1,
            nav: true,
            rewind: true,
            autoplay: false
        };
        const events = {
            onDragged: function (event) { console.log(event) },
            onChanged: function (event) {
                window.scrollTo(0, 0)
            }

        };
        return <Consumer>
            {value => {
                console.log(value)
                return <PageWrapper value={value}>

                    {value.user.myRecipes.length > 0 ?
                        <OwlCarousel
                            options={options}
                            events={events}
                        >
                            {value.user.myRecipes.map((chef, idx) => {
                                return <GrandmaCard key={idx} chef={chef} value={value} />
                            })}
                        </OwlCarousel>
                        : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>}
                </PageWrapper>
            }
            }
        </Consumer >
    }
}

export default CardContainer;
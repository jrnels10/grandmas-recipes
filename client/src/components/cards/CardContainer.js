import React, { Component } from 'react';
import { Consumer } from '../../Context';
import OwlCarousel from 'react-owl-carousel';
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
    }
    reload = () => {
        secretResponse(this.props.data.dispatch, this);
    }
    addedChef = () => {

    }

    render() {
        console.log("mounted")
        return <Consumer>
            {value => {
                console.log(value)
                return <PageWrapper>
                    {/* <PageShade> */}
                    {value.user.myRecipes.length > 0 ?
                        <OwlCarousel
                            className="owl-theme"
                            items={1}
                            margin={10}
                            nav
                        >
                            {value.user.myRecipes.map((chef, idx) => {
                                return <GrandmaCard key={idx} chef={chef} value={value} />
                            })}
                        </OwlCarousel>
                        : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>}

                    {/* </PageShade> */}
                </PageWrapper>
            }}
        </Consumer >
    }
}

export default CardContainer;
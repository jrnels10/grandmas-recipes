import React, { Component } from 'react';
import { Consumer } from '../../Context';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import secretResponse from './../HOC/Secret';
import GrandmaCard from '../cards/GrandmaCard';
import './dashBoard.css'
import PageWrapper from '../tools/PageWrapper';
import { NavigateButton } from './../tools/Buttons';
import { Link } from 'react-router-dom';

class DashBoard extends Component {
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
        return <Consumer>
            {value => {
                console.log(value)
                return <PageWrapper>
                    <Link className="nav-link p-0 text-white" to={`/familychefs`} >View Chefs</Link>
                    <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
                </PageWrapper>
                // value.user.myRecipes.length > 0 ? <PageWrapper>
                //     <OwlCarousel
                //         className="owl-theme"
                //         items={1}
                //         margin={10}
                //         nav
                //     >
                //         {value.user.myRecipes.map((chef, idx) => {
                //             return <GrandmaCard key={idx} chef={chef} value={value} />
                //         })}
                //     </OwlCarousel>
                // </PageWrapper> : null;
            }}
        </Consumer >
    }
}

export default DashBoard;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GeneralLargeCard from './GeneralLargeCard';

import './card.css';
import Options from './GrandmaOptions';


class GrandmaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareModal: false
        }
    };

    toggleModal = () => {
        this.setState({ shareModal: !this.state.shareModal })
    };

    render() {
        const { chefImage, chefName, chefBio, submittedBy, chefId, chefRecipes, families } = this.props.chef;
        // const numberOfRecipes = chefRecipes.length;
        return <GeneralLargeCard>
            <div className='card-header'>
                <div className='card-title-container'>
                    <label className="card-title grandma-card-title w-75">{chefName}</label>
                </div>
                <Options options={{ value: this.props.value, chef: this.props.chef }} />
            </div>
            <div className="row card-graphics-container">
                <img className="card-img-top" src={chefImage} alt="portrait of chef" />
                <div className="col-12 card-graphics-container-light" />
                <div className="col-12 card-graphics-container-dark" >
                </div>
            </div>
            <div className="card-body ">
                {chefBio ?
                    <React.Fragment>
                        <p className="card-text ">{chefBio}</p>
                        <p className="card-author"> -{submittedBy}</p>
                    </React.Fragment>
                    : null}
            </div>
        </GeneralLargeCard >
    }
}

export default GrandmaCard;
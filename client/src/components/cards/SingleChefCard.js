import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { withRouter, Link } from 'react-router-dom';
import GeneralLargeCard from './GeneralLargeCard';
import { findMyChef } from './../../API/ChefAPI';
// import MiniRecipeCard from './CardMini/MiniRecipeCard';


class SingleChefCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    async componentDidMount() {
        const res = await findMyChef(this.props.match.params.id)
        this.setState({ chef: res.data[0] })
    }

    signInAndSave = (value) => {
        value.dispatch({ type: 'SIGN_IN_AND_SAVE', payload: { save: true } })
        value.dispatch({ type: 'REDIRECT-FROM', payload: { redirectedFrom: document.referrer, redirectTo: window.location.pathname } })
    }

    saveChef = () => {

    }
    render() {
        return this.state.chef ? <Consumer>
            {value => {
                const { chefImage, chefName, chefBio, submittedBy, chefRecipes } = this.state.chef;
                return <GeneralLargeCard>
                    <h5 className="card-title grandma-card-title">{chefName}</h5>
                    <div className="row card-graphics-container">
                        <img className="card-img-top" src={chefImage} alt="portrait of chef" />
                        <div className="col-12 card-graphics-container-light" />
                        <div className="col-12 card-graphics-container-dark" >
                        </div>
                    </div>
                    <div className="card-body grandma-card-body">
                        <p className="card-text ">{chefBio}</p>
                        <p className="card-author"> -{submittedBy}</p>
                        <div className="row w-100 mb-3">
                            <div className="col-8">
                                {!value.isAuthenticated ? <Link className="nav-link p-0 text-white" to={`/`} onClick={this.signInAndSave.bind(this, value)}>Sign in to save Chef </Link>
                                    : <label onClick={this.saveChef.bind(this)}>Save Recipe</label>}
                            </div>
                        </div>
                    </div>
                </GeneralLargeCard>
            }}</Consumer> : null
    }
}

export default withRouter(SingleChefCard);
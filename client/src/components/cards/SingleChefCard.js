import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { withRouter, Link } from 'react-router-dom';
import GeneralLargeCard from './GeneralLargeCard';
import { findMyChef } from './../../API/RecipeAPI';
import MiniRecipeCard from './MiniRecipeCard';


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
    }
    render() {
        return this.state.chef ? <Consumer>
            {value => {
                const { chefImage, chefName, chefBio, submittedBy, chefRecipes } = this.state.chef;
                const numberOfRecipes = chefRecipes.length;
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
                                <Link className="nav-link p-0 text-white" to={`/`} onClick={this.signInAndSave.bind(this, value)}>Sign in to save Chef </Link>}
                                </div>
                        </div>
                        <div className="row w-100 m-0 mb-3 mini-card-container p-0">
                            {numberOfRecipes > 0 ?
                                <div className='w-100'>
                                    {chefRecipes.map((recipe, idx) => {
                                        return <MiniRecipeCard key={idx} recipe={recipe} value={value} />
                                    })}
                                </div>
                                : <span>No recipes.</span>}
                        </div>
                    </div>
                </GeneralLargeCard>
            }}</Consumer> : null
    }
}

export default withRouter(SingleChefCard);
import React, { Component } from 'react';
import MyRecipes from './../myRecipes/MyRecipes';
import AddRecipe from '../addrecipe/AddRecipeButton';
import { Consumer } from '../../Context';

import secretResponse from './../HOC/Secret';

import './dashBoard.css'
import PageWrapper from '../tools/PageWrapper';

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
                    <div className="container-fluid dashboard-container">
                        <div className="row" id='dashboard-my-recipes-container'>
                            <div className='col-4'>
                                <label className='dashboard-label'>
                                    My Recipes
                                </label>
                            </div>
                            <div className='col-3'>
                            </div>
                            <div className='col-5 mr-0'>
                                <AddRecipe value={value} />
                            </div>
                            <div className='dashboard-recipes' id='dashboard-my-recipes'>
                                {value.user.myRecipes.length > 0 ? <MyRecipes value={value.user} /> : null}
                            </div>
                        </div>
                        {/* <div className="row" id='dashboard-group-container'>
                        <label className='dashboard-label'>
                            Group Recipes
                </label>
                        <div className='dashboard-recipes' id='dashboard-group-recipes'>
                            Group Recipes Container
                </div>
                    </div>
                    <div className="row" id='dashboard-public-container'>
                        <label className='dashboard-label'>
                            Public Recipes
                </label>
                        <div className='dashboard-recipes' id='dashboard-public-recipes'>
                            Public Recipes Container
                </div>
                    </div> */}
                    </div>
                </PageWrapper>
            }
            }
        </Consumer >
    }
}

export default DashBoard;
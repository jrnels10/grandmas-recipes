import React, { Component } from 'react';
import GeneralLargeCard from './GeneralLargeCard';
import { getmyrecipe } from './../../API/RecipeAPI';
import { Consumer } from '../../Context';
import RecipeOptions from './CardOptions/RecipeOptions';
import './recipe.css';



class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: [], info: false }
    }
    findSelectedRecipe = async (dispatch) => {
        const recipeUrl = this.props.location.pathname;
        const last = recipeUrl.substring(recipeUrl.lastIndexOf("/") + 1, recipeUrl.length);
        const foundRecipe = await getmyrecipe(last);
        dispatch({
            type: 'ITEM_SELECTED',
            payload: { selected: foundRecipe.data }
        });
    };

    checkBoxSelected = (e) => {
        const boxSelected = this.state.checked.filter(item => item === e.target.id);
        boxSelected.length > 0 ? this.setState({ checked: this.state.checked.filter(item => item !== e.target.id) }) : this.setState({ checked: [...this.state.checked, e.target.id] })
    };

    checked = (e) => {
        return this.state.checked.filter(item => { return item.ingredient === e.target.id ? true : false })
    };

    toggleinformation = () => {
        this.setState({ info: !this.state.info })
    };

    hide = () => {
        this.setState({ viewImage: !this.state.viewImage })
    };

    render() {
        return <Consumer>
            {value => {
                if (value.selected) {
                    const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id } = value.selected;
                    const textSplit = cookingInstructions.split('\n');
                    const listItems = textSplit.map((textSplit, idx) =>
                        <li key={idx}>{textSplit}</li>
                    );
                    return <GeneralLargeCard>
                        <div className='recipe-card-header'>
                            <div className='w-75 mini-recipe-care-title-container'>
                                <label className="card-title mini-recipe-card-title w-100">{recipeName}</label>
                                <span className="card-title mini-recipe-card-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                            </div>
                            <RecipeOptions options={{ value: value, image: recipeImage, recipe: value.selected }} />
                        </div>
                        <div className="row card-graphics-container">
                            <img className="card-img-top" src={recipeImage} alt="portrait of recipe" onClick={this.hide} />
                            <div className="col-12 card-graphics-container-light" />
                            <div className="col-12 card-graphics-container-dark" >
                            </div>
                        </div>
                        <div className="card-body grandma-card-body p-0">
                            <div className="card-body recipe-card-body">
                                {ingredients.length > 0 ? ingredients.map((item, idx) => {
                                    return <div className="ingredients-check-container" key={idx}>
                                        {this.state.checked.indexOf(item.ingredient) > -1 ? <svg className="bi bi-check check-mark" width="30px" height="30px" viewBox="0 0 20 20" fill="#877785" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M15.854 5.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L8.5 12.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                                        </svg> : null}
                                        <div className='custom-checkbox-container' id={item.ingredient} name={idx} onClick={this.checkBoxSelected} />
                                        <label className='custom-checkbox-label'>{item.ingredient}</label>

                                    </div>
                                }) : null}
                                <ul className="card-text recipe-card-text mt-3">{listItems}</ul>
                                <p className="card-author"> -{chefName}</p>
                                <div className="row w-100 mb-3">
                                    <div className="col-8">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </GeneralLargeCard>
                } else {
                    this.findSelectedRecipe(value.dispatch)
                }
            }}
        </Consumer>
    }
}

export default RecipeCard;
import React, { Component } from 'react';
import GeneralLargeCard from './GeneralLargeCard';
import { Consumer } from '../../Context';
import PageWrapper from '../tools/PageWrapper';
import ModalRecipes from '../tools/Modal';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: [], info: false }
    }
    checkBoxSelected = (e) => {
        const boxSelected = this.state.checked.filter(item => item === e.target.id);
        boxSelected.length > 0 ? this.setState({ checked: this.state.checked.filter(item => item !== e.target.id) }) : this.setState({ checked: [...this.state.checked, e.target.id] })
    }

    checked = (e) => {
        return this.state.checked.filter(item => { return item.ingredient === e.target.id ? true : false })
    }

    toggleinformation = () => {
        this.setState({ info: !this.state.info })
    }
    render() {
        console.log(this.state)
        // const { img, groups, ingredients, recipeName } = this.props.recipe;
        // const privateStatus = this.props.private
        return <Consumer>
            {value => {
                console.log(value.recipe.selected)
                const { groups, ingredients, recipeName, img, cookingInstructions } = value.recipe.selected;
                const privateStatus = value.recipe.selected;
                return <PageWrapper>
                    <GeneralLargeCard classNombre={'recipe-card-container'}>
                        <img className="card-img-top" src={img} alt="portrait of chef" />
                        <div className="row card-graphics-container">
                            <div className="col-12 card-graphics-container-light">
                                <h5 className="card-title recipe-card-title">{recipeName}</h5>
                                {privateStatus ? <svg className="bi bi-person-fill" onClick={this.toggleinformation} width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 16s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H5zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg> : <svg className="bi bi-people-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                                    </svg>}
                            </div>
                            <div className="col-12 card-graphics-container-dark">
                                <div className="card-body recipe-card-body">
                                    {ingredients.length > 0 ? ingredients.map((item, idx) => {
                                        return <div className="ingredients-check-container" key={idx}>
                                            {this.state.checked.indexOf(item.ingredient) > -1 ? <svg className="bi bi-check check-mark" width="30px" height="30px" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M15.854 5.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L8.5 12.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                                            </svg> : null}
                                            <div className='custom-checkbox-container' id={item.ingredient} name={idx} onClick={this.checkBoxSelected} />
                                            <label className='custom-checkbox-label'>{item.ingredient}, {item.amount} {item.units}</label>

                                        </div>
                                    }) : null}
                                    <p className="card-text ">{cookingInstructions}</p>
                                    <p className="card-author"> -{recipeName}</p>
                                    <div className="row w-100 mb-3">
                                        <div className="col-8">
                                            {/* <Link className="nav-link p-0 text-white" to={`/addrecipe/${_id}`} >Add New Recipe</Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ModalRecipes display={this.state.info} name={'Information'} closeAction={this.toggleinformation}>
                            <p>A single person signifies that the recipe is private. Multiple people indicates it is viewable to the family</p>
                        </ModalRecipes>
                    </GeneralLargeCard>
                </PageWrapper>
            }}
        </Consumer>
    }
}

export default RecipeCard;
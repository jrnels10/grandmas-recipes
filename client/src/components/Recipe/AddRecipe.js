import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { addNewRecipe } from '../../API/RecipeAPI';
import PageShade from '../tools/PageShade';

import './addrecipe.css';

const Units = ['tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'mL', 'L', 'dL', 'lb', 'oz', 'mg', 'g', 'kg', 'mm', 'cm', 'm', 'inch']

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientModal: false,
            units: "tsp"
        }
    }

    componentDidMount() {
        this.focusDiv();
        const grandma_Id = window.location.pathname.split('/')[2];
        this.setState({ grandma_Id })
    }

    focusDiv() {
        this.refs.theDiv.focus();
    }

    onSelected = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectedRecipeInfo = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addIngredient = (e) => {
        this.setState({
            ingredients: [...this.state.ingredients,
            {
                ingredient: this.state.ingredient,
                amount: this.state.amount,
                units: this.state.units
            }]
        });
        // console.log(this.state)
        this.refs.ingredientDiv.value = '';
        this.refs.amountDiv.value = '';
        this.refs.unitsDiv.value = 'tsp';
        this.refs.ingredientDiv.focus();
    }

    upload = async (e) => {
        const test = {
            grandma_Id: '5e0e8b786a6570167c5c2770',
            recipeName: 'Jacobs secret recipe',
            groups: 'Nelson',
            ingredients: [{
                ingredient: "brocolli",
                amount: '1',
                units: 'tsp'
            }],
            cookingInstructions: 'cook it'
        }
        const recipeObject = {
            grandma_Id: this.state.grandma_Id,
            recipeName: this.state.recipeName,
            groups: this.state.groups,
            ingredients: this.state.ingredients,
            cookingInstructions: this.state.cookingInstructions
        }
        const json = JSON.stringify(test);
        var bodyFormData = new FormData();
        bodyFormData.append('picture', this.state.img);
        bodyFormData.append('accountType', this.props.data.user.method);
        bodyFormData.append('myRecipes', json);
        bodyFormData.append('private', true);
        console.log('json string: ', json)
        console.log('recipe image: ', this.state.img)
        console.log('bodyForm: ', bodyFormData)
        console.log('user info: ', this.props.data.user)
        // debugger
        for (var key of bodyFormData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        const res = await addNewRecipe(bodyFormData, this.props.data.user.email);
        console.log(res)

        if (res.status === 200) {
            const { dispatch } = this.props.data;
            dispatch({ type: 'ADDED_MY_RECIPE', payload: { myRecipes: res.data.myRecipes } })
            this.setState({ updated: true });
            // this.props.reload();
        }
    }

    toggleIngredientModal = () => {
        this.setState({ ingredientModal: !this.state.ingredientModal })
    }
    render() {
        // console.log(this.props.history)
        let families = []
        // this.props.data.user.myRecipes.map(item => {
        //     return item.groups.map(item => {
        //         families = [...new Set([...families, item.charAt(0).toUpperCase() + item.slice(1)])]
        //     })
        // });
        return <PageShade>
            <PageWrapper>
                <div className='addrecipe-container'>
                    <div className="input-group input-group-sm mb-3">
                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Recipe Name</label>
                        <input type="text" className="sign-input" placeholder="My secret recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                        <hr className='sign-underline' />
                    </div>
                    {/* <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Chef Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='chefName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Portrait</span>
                    </div>
                    <input className="text-white mt-1 edit-input-file" type="file" name='chefImage' onChange={this.onSelected.bind(this)} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Chef Bio</span>
                    </div>
                    <textarea rows="4" cols="50" className=" w-100 form-control-sm" name='chefBio' value={this.props.data.chefBio} onChange={this.onSelectedText.bind(this)}></textarea>
                    {/* <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='chefBio' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} /> */}
                    <div className="input-group input-group-sm mb-3">
                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Familes</label>
                        {families.length > 0 ? <select className="col-4 custom-select custom-select-sm"
                            name="groups"
                            value={this.state.selectSectionValue}
                            onChange={this.onSelectedText.bind(this)}>
                            {families.map((item) => {
                                return <option key={item}>{item}</option>
                            })}
                        </select> : null}
                        <input type="text" className="sign-input" placeholder="Family Name" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='groups' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                        <hr className='sign-underline' />
                    </div>
                    <div className='row w-100 m-0 mb-5'>
                        <div className='col-10 w-100 pl-0'>
                            <button className="btn w-100 signin-button" id="addrecipe-add-ingredients" onClick={this.toggleIngredientModal}>Add ingredients</button>
                        </div>

                        <div className={`modal ingredient-modal-${this.state.ingredientModal}`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLongTitle">{this.state.recipeName} ingredients</h6>
                                        <button type="button" className="close" onClick={this.toggleIngredientModal}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body row w-100 m-0">
                                        <div className='col-6 w-100 pl-0'>
                                            <div className="input-group input-group-sm mb-3">
                                                <label className="sign-input-label" htmlFor="exampleInputEmail1">Ingredient</label>
                                                <input type="text" className="sign-input" placeholder="Brocolli" aria-label="Sizing example input" ref="ingredientDiv" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedRecipeInfo.bind(this)} />
                                                <hr className='sign-underline' />
                                            </div>
                                        </div>
                                        <div className='col-6 w-100 pr-0 mb-2'>
                                            <label className="sign-input-label" htmlFor="exampleInputEmail1">Amount</label>
                                            <input type="text" className="sign-input w-50" placeholder="0" aria-label="Sizing example input" ref="amountDiv" tabIndex={0} name='amount' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedRecipeInfo.bind(this)} />
                                            <select className="w-50 addrecipe-units"
                                                name="units"
                                                ref="unitsDiv"
                                                value={this.state.selectSectionValue}
                                                onChange={this.onSelectedRecipeInfo.bind(this)}>
                                                {Units.map((item) => {
                                                    return <option key={item}>{item}</option>
                                                })}
                                            </select>
                                            <hr className='sign-underline' />
                                        </div>
                                        <div className='col-6 w-100 pl-0'>
                                            <button className="btn signin-button" id="addrecipe-addingredient" onClick={this.addIngredient}>Add</button>
                                        </div>
                                        <div className='col-6 w-100 pl-0'>
                                            <div className="addrecipe-ingredient-container">
                                                {this.state.ingredients.length > 0 ? this.state.ingredients.map((item, idx) => {
                                                    return <p key={idx} className="recipe-item">{item.amount} {item.units} of {item.ingredient}</p>
                                                }) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={this.toggleIngredientModal}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Image</label>
                        <input className="sign-input addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelected.bind(this)} />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Instructions</label>
                        <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="Directions on how to cook recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                        {/* <hr className='sign-underline' /> */}
                    </div>
                    <button className="btn w-100 signin-button" onClick={this.upload}>Save Recipe</button>
                </div >
            </PageWrapper >
        </PageShade>
    }
}

export default AddRecipe;
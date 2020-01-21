import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { addNewRecipe } from '../../API/RecipeAPI';
import ModalRecipes from './../tools/Modal';
import { withRouter } from 'react-router-dom';

import './addrecipe.css';

// const Units = ['', 'tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'mL', 'L', 'dL', 'lb', 'oz', 'mg', 'g', 'kg', 'mm', 'cm', 'm', 'inch']

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientModal: false,
            units: "",
            ingredient: '',
            ingredientButton: "Add"
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
                ingredient: this.state.ingredient
            }]
        });
        this.refs.ingredientDiv.value = '';
        this.refs.ingredientDiv.focus();
    }

    upload = async (e) => {
        // const test = {
        //     grandma_Id: '5e0e8b786a6570167c5c2770',
        //     recipeName: 'Jacobs secret recipe',
        //     groups: 'Nelson',
        //     ingredients: [{
        //         ingredient: "brocolli",
        //         amount: '1',
        //         units: 'tsp'
        //     }],
        //     cookingInstructions: 'cook it'
        // }
        const recipeObject = {
            dateSubmitted: new Date(),
            recipeDescription: this.state.recipeDescription,
            submittedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
            grandma_Id: this.state.grandma_Id,
            recipeName: this.state.recipeName,
            groups: this.state.groups,
            ingredients: this.state.ingredients,
            cookingInstructions: this.state.cookingInstructions
        }
        const json = JSON.stringify(recipeObject);
        var bodyFormData = new FormData();
        bodyFormData.append('picture', this.state.img);
        bodyFormData.append('accountType', this.props.data.user.method);
        bodyFormData.append('myRecipes', json);
        bodyFormData.append('private', true);
        const res = await addNewRecipe(bodyFormData, this.props.data.user.email);

        if (res.status === 200) {
            const { dispatch } = this.props.data;
            dispatch({ type: 'ADDED_MY_RECIPE', payload: { myRecipes: res.data.myRecipes } })
            this.setState({ updated: true });
            this.props.history.push('/dashboard');
        }
    }

    toggleIngredientModal = () => {
        this.setState({ ingredientModal: !this.state.ingredientModal })
    }

    editIngredient = (ingre) => {
        this.setState({
            ingredientButton: "Update", ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
        this.refs.ingredientDiv.value = ingre;
        this.refs.ingredientDiv.focus();

    }
    deleteIngredient = (ingre) => {
        this.setState({
            ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
    }
    render() {
        let families = [];
        return <div className='addrecipe-container'>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Recipe Name</label>
                <input type="text" className="sign-input" placeholder="My secret recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                <hr className='sign-underline' />
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Description</label>
                <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="A description about the recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeDescription' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
            </div>
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
            <div className='row w-100 m-0 mb-3'>
                <div className='col-10 w-100 pl-0'>
                    <button className="btn w-100 signin-button" id="addrecipe-add-ingredients" onClick={this.toggleIngredientModal}>Add ingredients</button>
                </div>
                <ModalRecipes display={this.state.ingredientModal} name={this.state.recipeName} closeAction={this.toggleIngredientModal}>
                    <div className='col-7 w-100 pl-0'>
                        <div className="input-group input-group-sm mb-3">
                            <label className="sign-input-label" htmlFor="exampleInputEmail1">Ingredient</label>
                            <input type="text" className="sign-input" placeholder="2 Cups of Flour" aria-label="Sizing example input" ref="ingredientDiv" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                            <hr className='sign-underline' />
                        </div>
                    </div>
                    <div className='col-5 w-100 pl-0'>
                        <button className="btn signin-button" id="addrecipe-addingredient" onClick={this.addIngredient}>{this.state.ingredientButton}</button>
                    </div>
                    <div className='col-12 w-100 p-0'>
                        <div className="addrecipe-ingredient-container">
                            <table>
                                <tbody>
                                    {this.state.ingredients.length > 0 ? this.state.ingredients.map((item, idx) => {
                                        return <tr key={idx} className="recipe-item">
                                            <td className="edit-ingredient" width="20%" >
                                                <button className='btn btn-warning ingredient-edit-button' onClick={this.editIngredient.bind(this, item.ingredient)}>Edit</button></td>
                                            <td width="70%">{item.ingredient}</td>
                                            <td className="delete-ingredient" width="20%" >
                                                <button className='btn btn-danger ingredient-delete-button' onClick={this.deleteIngredient.bind(this, item.ingredient)}>Delete</button>
                                            </td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ModalRecipes>
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
    }
}

export default withRouter(AddRecipe);
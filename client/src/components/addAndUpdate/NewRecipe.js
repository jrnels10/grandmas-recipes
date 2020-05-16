import React, { Component } from 'react';
import { addNewRecipe, updateRecipe, deleteMyRecipe } from '../../API/RecipeAPI';
import ModalRecipes from '../tools/Modal';
import { withRouter } from 'react-router-dom';
import IngredientCards from './IngredientCards';
import { motion } from 'framer-motion';

import './addrecipe.css';

async function recipeNewBody(state, props) {
    const recipeObject = {
        dateSubmitted: new Date(),
        recipeDescription: state.recipeDescription,
        submittedBy: `${props.data.user.firstName} ${props.data.user.lastName}`,
        chefId: state.grandma_Id,
        recipeName: state.recipeName,
        recipeOwnerId: props.data.user.id,
        groups: state.groups,
        ingredients: state.ingredients,
        cookingInstructions: state.cookingInstructions
    }
    const json = JSON.stringify(recipeObject);
    var bodyFormData = new FormData();
    bodyFormData.append('picture', state.img);
    bodyFormData.append('accountType', props.data.user.method);
    bodyFormData.append('myRecipes', json);
    bodyFormData.append('private', true);
    return bodyFormData
}

async function updateRecipeBody(state, props) {
    const { recipeId, grandma_Id, img, recipeDescription, recipeName, cookingInstructions, groups, ingredients, updatedBy, dateUpdated } = state;
    const updatedRecipe = { recipeId, grandma_Id, recipeDescription, recipeName, cookingInstructions, groups, ingredients, updatedBy, dateUpdated };
    const json = JSON.stringify(updatedRecipe);
    var bodyFormData = new FormData();
    bodyFormData.append('picture', img);
    bodyFormData.append('accountType', props.data.user.method);
    bodyFormData.append('myRecipes', json);
    return bodyFormData
}

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientModal: false,
            units: "",
            ingredient: '',
            ingredientButton: "Save",
            recipeDescription: '',
            recipeName: '',
            groups: [],
            cookingInstructions: ''
        }
    }

    componentDidMount() {
        const { selected } = this.props.data;
        console.log(this.props)
        if (Object.keys(selected).length > 0) {
            this.setState({
                dateUpdated: new Date(),
                updatedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
                update: true,
                ingredients: [...selected.ingredients],
                recipeId: selected._id,
                recipeDescription: selected.recipeDescription,
                recipeName: selected.recipeName,
                groups: [...selected.groups],
                cookingInstructions: selected.cookingInstructions,
                grandma_Id: selected.chefId
            });
            this.refs.theDiv.value = selected.recipeName;
            this.refs.theRecipeDescriptionDiv.value = selected.recipeDescription;
            this.refs.theInstructionsDiv.value = selected.cookingInstructions;
            this.refs.theDiv.focus();
        }
        else {
            this.focusDiv();
            const grandma_Id = window.location.pathname.split('/')[2];
            this.setState({ grandma_Id });
        };
    };

    focusDiv() {
        this.refs.theDiv.focus();
    };

    onSelected = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.charCode == 13) {
            this.addIngredient(e);
        }
    };

    onSelectedRecipeInfo = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };



    upload = async (e) => {
        const { dispatch } = this.props.data;
        let res;
        dispatch({ type: "LOADER", payload: { display: true } });

        const body = this.state.update ? await updateRecipeBody(this.state, this.props) : await recipeNewBody(this.state, this.props);


        // const res = await addNewRecipe(bodyFormData, this.props.data.user.id);
        if (this.state.update) {
            res = await updateRecipe(body, this.props.data.user.id);
        } else {
            res = await addNewRecipe(body, this.props.data.user.id);
        }
        if (res.status === 200) {
            dispatch({ type: "LOADER", payload: { display: false } });
            dispatch({ type: 'ADDED_MY_RECIPE', payload: { myRecipes: res.data.myRecipes } })
            this.setState({ updated: true });
            return this.props.history.push('/familychefs');
        } else if (res.error) {
            this.setState({ error: true, errorKey: res.error.details[0].path[0] })
            dispatch({ type: "LOADER", payload: { display: false } });
        };
    }

    toggleIngredientModal = () => {
        this.setState({ ingredientModal: !this.state.ingredientModal })
    }

    addIngredient = (e) => {
        this.setState({
            ingredients: [...this.state.ingredients, { ingredient: this.state.ingredient }],
            ingredientButton: 'Save'
        });
        this.refs.ingredientDiv.value = '';
        this.refs.ingredientDiv.focus();
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

    delete = async () => {
        const res = await deleteMyRecipe(this.state.recipeId, this.props.data.user.id);
        if (res.status === 200) {
            this.props.history.push('/familychefs');
        } else if (res.error) {
            console.log(res)
        }
    };

    onDragStart = (event, taskName) => {
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }
    onDragOver = (event) => {
        console.log(event)
    }

    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");

        let selectedIngredient = this.state.ingredients.filter((selected) => {
            if (selected.ingredient == taskName) {
                debugger
            }
            return selected;
        });

        this.setState({
            ...this.state,
            selectedIngredient
        });
    }

    reorderList = (list) => {
        this.setState({ ingredients: list })
    }

    render() {
        let families = [];
        return <motion.div
            className="card card-recipe-edit">
            <div className="input-group input-group-sm mb-3">
                <label className="card-recipe-label" >Recipe Name</label>
                <input type="text" className="sign-input w-100" placeholder="My secret recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                <hr className='card-recipe-underline' />
                {this.state.errorKey === 'recipeName' ? <p className="text-danger">required</p> : null}
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Description</label>
                <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="A description about the recipe" aria-label="Sizing example input" ref="theRecipeDescriptionDiv" tabIndex={0} name='recipeDescription' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
            </div>
            {/* <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Familes</label>
                {families.length > 0 ?
                    <select className="col-4 custom-select custom-select-sm"
                        name="groups"
                        value={this.state.selectSectionValue}
                        onChange={this.onSelectedText.bind(this)}>
                        {families.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select> : null}
                <input type="text" className="sign-input" placeholder="Family Name" aria-label="Sizing example input" ref="theGroupDiv" tabIndex={0} name='groups' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                <hr className='sign-underline' />
            </div> */}
            <div className='row w-100 m-0 mb-3'>
                <span className="sign-input-label ingredients-text-list">{this.state.ingredients.map(item => { return item.ingredient }).join(', ')}</span>
                <div className='col-10 w-100 pl-0'>
                    <button className="btn w-100 signin-button" id="addrecipe-add-ingredients" onClick={this.toggleIngredientModal}>Add{this.state.ingredients.length > 0 ? '/Edit' : ''} ingredients</button>
                </div>
                <ModalRecipes display={this.state.ingredientModal} name={this.state.recipeName} closeAction={this.toggleIngredientModal} closeActionName={"Close"}>
                    <div className='col-9 w-100 pl-0'>
                        <div className="input-group input-group-sm mb-3">
                            <label className="sign-input-label" htmlFor="exampleInputEmail1">Ingredient</label>
                            <input type="text" className="ingredient-input" placeholder="Type in ingredient and amount" aria-label="Sizing example input" ref="ingredientDiv" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                            <hr className='sign-underline' />
                        </div>
                    </div>
                    <div className='col-3 w-100 pl-0'>
                        {this.state.ingredient.length > 0 ? <button className="btn signin-button" id="addrecipe-addingredient" onClick={this.addIngredient}>{this.state.ingredientButton}</button> : null}
                    </div>
                    <div className='col-12 w-100 p-0 ingredients-container'>
                        <IngredientCards ingredients={this.state.ingredients} reorderList={this.reorderList} editIngredient={this.editIngredient} deleteIngredient={this.deleteIngredient} />
                    </div>
                </ModalRecipes>
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Image</label>
                <input className="sign-input addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelected.bind(this)} />
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Instructions</label>
                <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="Directions on how to cook recipe" aria-label="Sizing example input" ref="theInstructionsDiv" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                {/* <hr className='sign-underline' /> */}
            </div>
            <button className="btn w-100 signin-button" onClick={this.upload}>{this.state.update ? "Update" : "Save"} Recipe</button>
            {this.state.update ? <button className="btn btn-danger mt-2 w-100 " onClick={this.delete}>Delete Recipe</button> : null}
        </motion.div>
    }
}

export default withRouter(AddRecipe);
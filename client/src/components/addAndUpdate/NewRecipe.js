import React, { Component } from 'react';
import { addNewRecipe, updateRecipe, deleteMyRecipe } from '../../API/RecipeAPI';
import { uploadRecipeNew } from '../tools/Upload';
import { ModalRecipes } from '../tools/Modal';

import { withRouter } from 'react-router-dom';
import IngredientCards from './IngredientCards';
import { motion } from 'framer-motion';

import './newRecipe.css';



class AddRecipe extends Component {
    ingredientsRef = React.createRef();
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
                chefId: selected.chefId
            });
            this.refs.theDiv.value = selected.recipeName;
            this.refs.theRecipeDescriptionDiv.value = selected.recipeDescription;
            this.refs.theInstructionsDiv.value = selected.cookingInstructions;
            this.refs.theDiv.focus();
        }
        else {
            this.focusDiv();
            const chefId = window.location.pathname.split('/')[2];
            this.setState({ chefId });
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



    upload = async (value) => {
        const { dispatch } = this.props.data;
        dispatch({ type: "LOADER", payload: { display: true } });
        const res = await uploadRecipeNew(value, this);
        // let res;

        // // const body = this.state.update ? await updateRecipeBody(this.state, this.props) : await recipeNewBody(this.state, this.props);


        // // const res = await addNewRecipe(bodyFormData, this.props.data.user.id);
        // if (this.state.update) {
        //     res = await updateRecipe(body, this.props.data.user.id);
        // } else {
        //     res = await addNewRecipe(body, this.props.data.user.id);
        // }
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
        this.ingredientsRef.current.value = '';
        this.ingredientsRef.current.focus();
    }

    editIngredient = (ingre) => {
        this.setState({
            ingredientButton: "Update", ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
        this.ingredientsRef.current.value = ingre;
        this.ingredientsRef.current.focus();

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
            className="card new-recipe">
            <div className="input-group input-group-sm mb-3">
                <label className="new-recipe-label" >Recipe Name</label>
                <input type="text" className="new-recipe-input w-100" placeholder="My family recipe" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                <hr className='new-recipe-underline' />
                {this.state.errorKey === 'recipeName' ? <p className="text-danger">required</p> : null}
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="new-recipe-label">Description</label>
                <textarea rows="4" cols="50" type="text" className="new-recipe-input" id="addrecipe-instructions" placeholder="A description about the recipe" aria-label="Sizing example input" ref="theRecipeDescriptionDiv" tabIndex={0} name='recipeDescription' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                {this.state.errorKey === 'recipeDescription' ? <p className="text-danger">required</p> : null}
            </div>
            <div className='row w-100 m-0 mb-3'>
                <span className="new-recipe-label ingredients-text-list">{this.state.ingredients.map(item => { return item.ingredient }).join(', ')}</span>
                <div className='col-10 w-100 pl-0'>
                    <button className="btn w-100 signin-button" id="addrecipe-add-ingredients" onClick={this.toggleIngredientModal}>Add{this.state.ingredients.length > 0 ? '/Edit' : ''} ingredients</button>
                </div>
                <ModalRecipes display={this.state.ingredientModal} name={this.state.recipeName} closeAction={this.toggleIngredientModal} closeActionName={"Close"}>
                    <div className='col-9 w-100 pl-0'>
                        <div className="input-group input-group-sm mb-3">
                            <label className="ingredients-input-label">Ingredient</label>
                            <input type="text" className="ingredient-input" placeholder="Type in ingredient and amount" ref={this.ingredientsRef} aria-label="Sizing example input" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                        </div>
                    </div>
                    <div className='col-3 w-100 p-0'>
                        {this.state.ingredient.length > 0 ? <button className="btn ingredient-button" id="addrecipe-addingredient" onClick={this.addIngredient}>Add</button> : null}
                    </div>
                    <div className='col-12 w-100 p-0 ingredients-container'>
                        <IngredientCards ingredients={this.state.ingredients} reorderList={this.reorderList} editIngredient={this.editIngredient} deleteIngredient={this.deleteIngredient} />
                    </div>
                </ModalRecipes>
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="new-recipe-label">Image</label>
                <input className="sign-input addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelected.bind(this)} />
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="new-recipe-label">Instructions</label>
                <textarea rows="4" cols="50" type="text" className="new-recipe-input" id="addrecipe-instructions" placeholder="Directions on how to cook recipe" aria-label="Sizing example input" ref="theInstructionsDiv" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                {this.state.errorKey === 'cookingInstructions' ? <p className="text-danger">required</p> : null}
            </div>
            <button className="btn w-100 signin-button" onClick={this.upload.bind(this, this.props.data)}>{this.state.update ? "Update" : "Save"} Recipe</button>
            {this.state.update ? <button className="btn btn-danger mt-2 w-100 " onClick={this.delete}>Delete Recipe</button> : null}
        </motion.div>
    }
}

export default withRouter(AddRecipe);
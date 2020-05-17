import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getmyrecipe } from './../../API/RecipeAPI';
import { Consumer } from '../../Context';
import './recipe.css';
import ModalRecipes from '../tools/Modal';
import IngredientCards from '../addAndUpdate/IngredientCards';
import { uploadRecipeEdit } from '../tools/Upload';


function getHeight() {
    var offsetHeight = document.getElementById("card-recipe-id").offsetHeight;
    document.getElementById("card-recipe-id-edit").style.height = offsetHeight + 'px';
}

class RecipeCard extends Component {
    titleRef = React.createRef();
    imageRef = React.createRef();
    ingredientsRef = React.createRef();
    directionsRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            info: false,
            edit: '',
            reference: '',
            ingredient: ''
        }
    }
    async componentDidMount() {
        const recipeUrl = this.props.location.pathname;
        const last = recipeUrl.substring(recipeUrl.lastIndexOf("/") + 1, recipeUrl.length);
        const foundRecipe = await getmyrecipe(last);
        const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, chefId } = foundRecipe.data;
        this.setState({ ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, chefId, originalData: foundRecipe.data });
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

    edit = (editItem) => {
        const reference = editItem == 'recipeName' ? this.titleRef :
            editItem == 'img' ? this.imageRef :
                editItem == 'ingredients' ? this.ingredientsRef : this.directionsRef;
        this.setState({ edit: editItem === this.state.edit ? '' : editItem, reference: reference === this.state.reference ? '' : reference });

    };

    save = async (value) => {
        const { dispatch } = value;
        dispatch({ type: "LOADER", payload: { display: true } });

        const savedItem = await uploadRecipeEdit(value, this.state);
        const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, chefId } = savedItem;
        this.setState({ ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, chefId, originalData: savedItem });

        this.edit(this.state.edit);
        dispatch({ type: "LOADER", payload: { display: false } });

    }

    onSelectedText = (e) => {
        if (e.target.value !== '') {
            this.setState({ [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value });
        }
        if (e.charCode == 13) {
            this.addIngredient(e);
        }
    };

    componentDidUpdate() {
        const { cookingInstructions, recipeName, edit, reference } = this.state;
        if (reference !== '') {
            if (reference === this.titleRef) {
                reference.current.focus();
                reference.current.value = this.state.recipeName ? this.state.recipeName : recipeName;
            } else if (reference === this.ingredientsRef) {
                reference.current.focus();
            }
            else if (reference === this.directionsRef) {
                reference.current.focus();
                reference.current.value = this.state.cookingInstructions ? this.state.cookingInstructions : cookingInstructions;
            }
        }
    }

    addIngredient = (e) => {
        this.setState({
            ingredients: [...this.state.ingredients, { ingredient: this.state.ingredient }],
            ingredientButton: 'Save'
        });
    }

    editIngredient = (ingre) => {
        this.setState({
            ingredientButton: "Update", ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
    }

    deleteIngredient = (ingre) => {
        this.setState({
            ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
    }

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
        const pageVariant = {
            closed: {
                opacity: 0
            },
            open: {
                opacity: 1
            },
        };
        const pageTransition = {
            duration: .3
        }
        return <Consumer>
            {value => {
                if (this.state.recipeName) {
                    const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, edit, ingredient } = this.state;
                    const textSplit = cookingInstructions.split('\n');
                    const listItems = textSplit.map((textSplit, idx) =>
                        <li key={idx}>{textSplit}</li>
                    );
                    return <motion.div
                        id="card-recipe-id"
                        className="card card-recipe"
                        variants={pageVariant}
                        initial='closed'
                        animate='open'
                        exit='closed'
                        transition={pageTransition}
                    >
                        <div className='card-recipe-header'>
                            <div className='card-recipe-title-container'>

                                <React.Fragment>
                                    {edit !== 'recipeName' ? <label className="card-title card-recipe-title">{recipeName}</label> :
                                        <input ref={this.titleRef} type="text" name='recipeName' className="card-recipe-title-edit-input" onChange={this.onSelectedText.bind(this)} />}
                                </React.Fragment>

                                {edit !== 'recipeName' ? <div className='card-recipe-title-edit'><EditIcon editType={'recipeName'} that={this} /></div> : <div className="card-recipe-title-edit-save">
                                    <SaveOrDiscard that={this} value={value} name='recipeName' />
                                </div>}

                                <div className='w-100'>
                                    <span className="card-title card-recipe-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row card-graphics-container">
                            <EditIcon editType={'img'} that={this} />
                            {edit === 'img' ? <div className="card-recipe-image-edit-container" id="card-recipe-image-edit">
                                <input className="card-recipe-image-edit addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelectedText.bind(this)} />
                                <div className="card-recipe-image-edit-save">
                                    <SaveOrDiscard that={this} value={value} />
                                </div>
                            </div> : null}

                            <Link to={`/fullscreen`}>
                                {recipeImage ? <img id="card-recipe-image" className="card-img-top" src={recipeImage} alt="portrait of recipe" onClick={this.hide} /> :
                                    <img id="card-recipe-image" className="card-img-top" src="https://storage.googleapis.com/grandmas-recipes-dev/_resized_defaultRecipe.jpg" alt="default image" />}
                            </Link>

                        </div>
                        <div className="card-body card-recipe-body p-0">
                            <div className="card-body card-recipe-body">
                                <label>Ingredients</label>
                                <div className='card-recipe-body-edit'>
                                    <EditIcon editType={'ingredients'} that={this} />
                                    {edit === 'ingredients' ?
                                        <div className="card-recipe-body-edit-ingredient" id='card-recipe-id-edit'>
                                            <ModalRecipes display={true} name={this.state.recipeName} closeAction={() => { this.save(value); this.edit('ingredients') }} closeActionName={"Close"}>
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
                                        </div> : null
                                    }
                                </div>
                                {edit !== 'ingredients' && ingredients.length > 0 ? ingredients.map((item, idx) => {
                                    return <div className="ingredients-check-container" key={idx}>
                                        {this.state.checked.indexOf(item.ingredient) > -1 ? <svg className="bi bi-check check-mark" width="30px" height="30px" viewBox="0 0 20 20" fill="#877785" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M15.854 5.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L8.5 12.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                                        </svg> : null}
                                        <div className='custom-checkbox-container' id={item.ingredient} name={idx} onClick={this.checkBoxSelected} />
                                        <label className='custom-checkbox-label'>{item.ingredient}</label>

                                    </div>
                                }) : <span><i>No ingredients</i></span>}
                                <hr className='m-2' />
                                <label>Directions</label>
                                <div className='card-recipe-body-edit'>
                                    <EditIcon editType={'cookingInstructions'} that={this} />
                                </div>
                                {edit === 'cookingInstructions' ? <React.Fragment><textarea rows="10" cols="50" type="text" className="card-recipe-directions-edit" id="addrecipe-instructions" ref={this.directionsRef} placeholder="Directions on how to cook recipe" aria-label="Sizing example input" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                                    <div className="card-recipe-title-edit-save">
                                        <SaveOrDiscard that={this} value={value} name='cookingInstructions' />
                                    </div>
                                </React.Fragment>
                                    : <ul className="card-text card-recipe-text mt-3">{listItems}</ul>}
                                <hr className='m-2' />

                                <p className="card-author"> -{chefName}</p>
                            </div>
                        </div>
                    </motion.div >
                }
            }}
        </Consumer>
    }
}

export default RecipeCard;

const EditIcon = (props) => {
    const { editType, that } = props;
    return <div className='card-recipe-image-edit'
        onClick={that.edit.bind(this, editType)}
    >
        {editType !== 'image' ? <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd" />
        </svg> : <svg className="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
            </svg>}
    </div>
}


const SaveOrDiscard = (props) => {
    const { that, value, name } = props;
    return <div className='save-discard'>
        <button className='save-button' onClick={that.save.bind(this, value)}>Save</button>
        <button className='save-button' onClick={() => { that.edit(that.state.edit); that.setState({ [name]: that.state.originalData[name] }) }}>Close</button>
    </div>
}
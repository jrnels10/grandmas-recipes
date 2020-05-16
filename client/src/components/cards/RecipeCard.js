import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getmyrecipe } from './../../API/RecipeAPI';
import { Consumer } from '../../Context';
import RecipeOptions from './CardOptions/RecipeOptions';
import './recipe.css';
import ModalRecipes from '../tools/Modal';
import IngredientCards from '../addAndUpdate/IngredientCards';


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
        const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id } = foundRecipe.data;
        this.setState({ ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id });
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
        const reference = editItem == 'title' ? this.titleRef :
            editItem == 'image' ? this.imageRef :
                editItem == 'ingredients' ? this.ingredientsRef : this.directionsRef;
        this.setState({ edit: editItem === this.state.edit ? '' : editItem, reference: reference === this.state.reference ? '' : reference });

    };

    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.type === 'file' ? e.target.file : e.target.value });

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
                                    {edit !== 'title' ? <label className="card-title card-recipe-title w-100">{recipeName}</label> :
                                        <input ref={this.titleRef} type="text" name='recipeName' className="card-recipe-title-edit-input" onChange={this.onSelectedText.bind(this)} />}
                                    <span className="card-title card-recipe-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                                </React.Fragment>
                            </div>
                            <div className='card-recipe-title-edit'>
                                {edit !== 'title' ? <EditIcon editType={'title'} that={this} /> : <SaveOrDiscard that={this} />}
                            </div>
                        </div>
                        <div className="row card-graphics-container">
                            <EditIcon editType={'image'} that={this} />
                            {edit === 'image' ? <div className="card-recipe-image-edit-container" id="card-recipe-image-edit">
                                <input className="card-recipe-image-edit addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelectedText.bind(this)} />
                                <div className="card-recipe-image-edit-save">
                                    <SaveIcon that={this} />
                                    <DiscardIcon that={this} />
                                </div>
                            </div> : null}

                            <Link to={`/fullscreen`}>
                                <img id="card-recipe-image" className="card-img-top" src={recipeImage} alt="portrait of recipe" onClick={this.hide} />
                            </Link>

                        </div>
                        <div className="card-body card-recipe-body p-0">
                            <div className="card-body card-recipe-body">
                                <label>Ingredients</label>
                                <div className='card-recipe-body-edit'>
                                    <EditIcon editType={'ingredients'} that={this} />
                                    {edit === 'ingredients' ?
                                        <div className="card-recipe-body-edit-ingredient" id='card-recipe-id-edit'>
                                            <ModalRecipes display={true} name={this.state.recipeName} closeAction={() => this.edit('ingredients')} closeActionName={"Close"}>
                                                <div className='col-9 w-100 pl-0'>
                                                    <div className="input-group input-group-sm mb-3">
                                                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Ingredient</label>
                                                        <input type="text" className="ingredient-input" placeholder="Type in ingredient and amount" ref={this.ingredientsRef} aria-label="Sizing example input" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                                                        <hr className='sign-underline' />
                                                    </div>
                                                </div>
                                                <div className='col-3 w-100 pl-0'>
                                                    {this.state.ingredient.length > 0 ? <button className="btn signin-button" id="addrecipe-addingredient" onClick={this.addIngredient}>Add</button> : null}
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
                                }) : null}
                                <label>Directions</label>
                                <div className='card-recipe-body-edit'>
                                    <EditIcon editType={'directions'} that={this} />
                                </div>
                                {edit === 'directions' ? <textarea rows="4" cols="50" type="text" className="card-recipe-directions-edit" id="addrecipe-instructions" ref={this.directionsRef} placeholder="Directions on how to cook recipe" aria-label="Sizing example input" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                                    : <ul className="card-text card-recipe-text mt-3">{listItems}</ul>}
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


const SaveOrDiscard = (that) => {
    return <div className='save-discard'>
        <SaveIcon that={that} />
        <DiscardIcon that={that} />
    </div>

}

const SaveIcon = (props) => {
    return <div className="card-recipe-title-save">
        <button className='save-button'>Save</button>
    </div>
}


const DiscardIcon = (props) => {
    return <div className="card-recipe-title-discard">
        <svg className="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
        </svg>
    </div>
}
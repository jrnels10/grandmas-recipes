import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getmyrecipe, deleteMyRecipe, likemyrecipe } from './../../API/RecipeAPI';
import { Consumer } from '../../Context';
import './recipe.css';
import { ModalRecipes } from '../tools/Modal';
import { uploadRecipeEdit, deleteRecipe } from '../tools/Upload';
import { DeleteButton } from '../tools/Buttons';


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
            ingredient: '',
            liked: 12345, //this.props.recipe.liked
        }
    }
    async componentDidMount() {
        const recipeUrl = window.location.pathname;
        const last = recipeUrl.substring(recipeUrl.lastIndexOf("/") + 1, recipeUrl.length);
        const foundRecipe = await getmyrecipe(last);
        const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, chefId, recipeOwner, liked } = foundRecipe.data;
        this.setState({
            ingredients,
            recipeImage,
            cookingInstructions,
            chefName,
            recipeName,
            dateSubmitted,
            _id,
            chefId,
            liked,
            originalData: foundRecipe.data,
            heart: this.props.data.user.recipesLiked.find(recipe => recipe === _id),
            recipeOwner
        });
    }

    // findSelectedRecipe = async (dispatch) => {
    //     const recipeUrl = this.props.location.pathname;
    //     const last = recipeUrl.substring(redirectTo.lastIndexOf("/") + 1, recipeUrl.length);
    //     const foundRecipe = await getmyrecipe(last);
    //     dispatch({
    //         type: 'ITEM_SELECTED',
    //         payload: { selected: foundRecipe.data }
    //     });
    // };

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

    viewFullImage = (value) => {
        const { dispatch } = value;
        dispatch({ type: "FULLSCREEN_IMAGE", payload: { fullScreenImage: this.state.recipeImage } });
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
        if (reference !== '' && reference.current !== null) {
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

    toggleHeart = async (e) => {
        const initialHeart = this.state.heart;
        this.setState({ liked: initialHeart ? --this.state.liked : ++this.state.liked, heart: !initialHeart });
        await likemyrecipe(this.state._id, { userId: this.props.data.user.id })
    };


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
                    const { ingredients, recipeImage, cookingInstructions, chefName, recipeName, dateSubmitted, _id, edit, ingredient, recipeOwner, liked, heart } = this.state;

                    const likes = liked >= 1000 ? `${liked.toString().substring(0, 1) + "." + liked.toString().substring(1, 2)}k likes` : liked > 1 || liked === 0 ? `${liked} likes` : `${liked} like`;
                    const owner = recipeOwner === value.user.id;
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

                                {edit !== 'recipeName' ? <div className='card-recipe-title-edit'><EditIcon editType={'recipeName'} that={this} owner={owner} /></div> : <div className="card-recipe-title-edit-save">
                                    <SaveOrDiscard that={this} value={value} name='recipeName' />
                                </div>}

                                <div className='w-100 position-relative' style={{ height: '30px' }}>
                                    <span className="card-title card-recipe-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                                    <div className="card-mini-chef-heart-container">
                                        {heart ?
                                            <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clipRule="evenodd" />
                                            </svg> :
                                            <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clipRule="evenodd" />
                                            </svg>}
                                        {liked > 0 ?
                                            <span className='liked-number'>{likes}</span>
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row card-graphics-container">
                            <EditIcon editType={'img'} that={this} owner={owner} />
                            {edit === 'img' ? <div className="card-recipe-image-edit-container" id="card-recipe-image-edit">
                                <input className="card-recipe-image-edit addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelectedText.bind(this)} />
                                <div className="card-recipe-image-edit-save">
                                    <SaveOrDiscard that={this} value={value} />
                                </div>
                            </div> : null}

                            <Link to={`/fullscreen`}>
                                {recipeImage ? <img id="card-recipe-image" className="card-img-top" src={recipeImage} alt="portrait of recipe" onClick={this.viewFullImage.bind(this, value)} /> :
                                    <img id="card-recipe-image" className="card-img-top" src="https://storage.googleapis.com/grandmas-recipes-dev/_resized_defaultRecipe.jpg" alt="default image" />}
                            </Link>

                        </div>
                        <div className="card-body card-recipe-body p-0">

                            <div className="card-body card-recipe-body">
                                <label>Ingredients</label>
                                <div className='card-recipe-body-edit'>
                                    <EditIcon editType={'ingredients'} that={this} owner={owner} />
                                    {edit === 'ingredients' ?
                                        <div className="card-recipe-body-edit-ingredient" id='card-recipe-id-edit'>
                                            <ModalRecipes display={true} name={this.state.recipeName} ingredients={ingredients} closeAction={() => { this.save.bind(this); this.edit("ingredients") }} closeActionName={"Close"} />
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
                                    <EditIcon editType={'cookingInstructions'} that={this} owner={owner} />
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
                        {owner ? <DeleteButton approve={() => { deleteRecipe(_id, value.user.id, this) }} /> : null}
                    </motion.div >
                }
            }}
        </Consumer>
    }
}

export default RecipeCard;

const EditIcon = (props) => {
    const { editType, that, owner } = props;
    return owner ? <div
        className='card-recipe-image-edit'
        onClick={that.edit.bind(this, editType)}
    >
        {editType !== 'img' ? <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd" />
        </svg> : <svg className="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
            </svg>}
    </div> : null
}


const SaveOrDiscard = (props) => {
    const { that, value, name } = props;
    return <div className='save-discard'>
        <button className='save-button' onClick={that.save.bind(this, value)}>Save</button>
        <button className='save-button' onClick={() => { that.edit(that.state.edit); that.setState({ [name]: that.state.originalData[name] }) }}>Close</button>
    </div>
}
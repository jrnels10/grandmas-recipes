import React, { Component } from 'react';
import './modal.css'
import IngredientCards from '../addAndUpdate/IngredientCards';
// display, name, closeAction, children
export class ModalRecipes extends Component {
    ingredientsRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',
            ingredients: this.props.ingredients
        }
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

    addIngredient = (e) => {
        this.setState({
            ingredients: [...this.state.ingredients, { ingredient: this.state.ingredient }],
            ingredientButton: 'Save',
            ingredient: ''
        });
        this.ingredientsRef.current.focus();
        this.ingredientsRef.current.value = '';
    }

    editIngredient = (ingre) => {
        this.setState({
            ingredientButton: "Update", ingredient: ingre, ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
        this.ingredientsRef.current.focus();
        this.ingredientsRef.current.value = ingre;
    }

    deleteIngredient = (ingre) => {
        this.setState({
            ingredients: [...this.state.ingredients.filter(item => {
                return item.ingredient !== ingre
            })]
        });
    }

    onSelectedText = (e) => {
        if (e.target.value !== '') {
            this.setState({ [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value });
        }
        if (e.charCode == 13) {
            this.addIngredient(e);
        }
    };

    onClose = () => {
        this.props.closeAction(this.state.ingredients)
    }

    render() {
        return <div className={`modal ingredient-modal-${this.props.display}`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLongTitle">{this.props.name}</h6>
                        <button type="button" className="close" onClick={this.props.closeAction}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body row w-100 m-0">
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onClose.bind(this)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    }
};
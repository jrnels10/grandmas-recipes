import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {

        }
    }

    componentDidMount() {
        const { state: { recipe }, search } = this.props.history.location;

        // if (Object.keys(recipe).length > 0) {
        //     this.setState({
        //         dateUpdated: new Date(),
        //         updatedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
        //         update: true,
        //         ingredients: [...selected.ingredients],
        //         recipeId: selected._id,
        //         recipeDescription: selected.recipeDescription,
        //         recipeName: selected.recipeName,
        //         groups: [...selected.groups],
        //         cookingInstructions: selected.cookingInstructions,
        //         grandma_Id: selected.chefId
        //     });
        //     this.refs.theDiv.value = selected.recipeName;
        //     this.refs.theRecipeDescriptionDiv.value = selected.recipeDescription;
        //     this.refs.theInstructionsDiv.value = selected.cookingInstructions;
        //     this.refs.theDiv.focus();
        // }
        // else {
        //     this.focusDiv();
        //     const grandma_Id = window.location.pathname.split('/')[2];
        //     this.setState({ grandma_Id });
        // };
    };

    onSelected = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    render() {
        const { state: { recipe }, search } = this.props.history.location;
        const editItem = search.split('?')[1];
        return (
            editItem === 'image' ?
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Image</label>
                    <input className="sign-input addrecipe-custom-file-input" type="file" name='img' onChange={this.onSelected.bind(this)} />
                </div> :
                editItem === 'title' ? <div>Title</div> :
                    editItem === 'ingredients' ? <div>ingredients</div> :
                        editItem === 'directions' ? <div>directions</div> :
                            null
        );
    }
}

export default withRouter(UpdateRecipe);
import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { addNewRecipe } from './../../API/RecipeAPI';

const Units = ['tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'mL', 'L', 'dL', 'lb', 'oz', 'mg', 'g', 'kg', 'mm', 'cm', 'm', 'inch']

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = { ingredients: [] }
    }

    componentDidMount() {
        this.focusDiv();
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
        })
    }

    upload = async (e) => {
        const json = JSON.stringify(this.state);
        var bodyFormData = new FormData();
        bodyFormData.append('picture', this.state.chefImage);
        bodyFormData.append('accountType', this.props.data.user.method);
        bodyFormData.append('myRecipes', json);
        bodyFormData.append('private', true);
        // debugger
        const res = await addNewRecipe(bodyFormData, this.props.data.user.email);
        console.log(res)

        if (res.status === 200) {
            const { dispatch } = this.props.data;
            dispatch({ type: 'ADDED_MY_RECIPE', payload: { myRecipes: res.data.myRecipes } })
            this.setState({ updated: true });
            // this.props.reload();
        }
    }
    render() {
        console.log(this.props.data)
        let families = []
        this.props.data.user.myRecipes.map(item => {
            return item.groups.map(item => {
                families = [...new Set([...families, item.charAt(0).toUpperCase() + item.slice(1)])]
            })
        });
        return <PageWrapper>
            <div className='addrecipe-container'>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Recipe Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='recipeName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <div className="input-group input-group-sm mb-3">
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
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Families</span>
                    </div>
                    {families.length > 0 ? <select className="col-4 custom-select custom-select-sm"
                        name="groups"
                        value={this.state.selectSectionValue}
                        onChange={this.onSelectedText.bind(this)}>
                        {families.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select> : null}
                    <input type="text" className="form-control" placeholder="New family" aria-label="Sizing example input" name='groups' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Ingredient</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='ingredient' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedRecipeInfo.bind(this)} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Amount</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='amount' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedRecipeInfo.bind(this)} />
                    <select className="col-4 custom-select custom-select-sm"
                        name="units"
                        value={this.state.selectSectionValue}
                        onChange={this.onSelectedRecipeInfo.bind(this)}>
                        {Units.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select>
                </div>
                <button onClick={this.addIngredient}>Add ingredient</button>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Cooking Instructions</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='cookingInstructions' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <button className="btn btn-primary" onClick={this.upload}>Save</button>
            </div>
        </PageWrapper>
    }
}

export default AddRecipe;
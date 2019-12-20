import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { getmyrecipe } from '../../API/RecipeAPI';
import Ingredients from './Ingredients';
import Bio from './Bio';

class RecipeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { showRecipe: false }
    }

    async componentDidMount() {
        const url = window.location.pathname.split('/')[2]
        const record = await getmyrecipe(url);
        this.setState(record.data[0])
        console.log(this.state)
    }

    show = (e) => {
        const id = e.target.id;
        if (this.state.selectedItem === id) {
            this.setState({ [id]: false, selectedItem: '' })
        }
        else {
            this.setState({ [this.state.selectedItem]: false, selectedItem: '' }, () => {
                this.setState({ [id]: true, selectedItem: id })
            });
        }
    }

    viewImage = () => {
        this.setState({ imageEnlarge: !this.state.enlarge })
    }

    render() {
        console.log(this.props)
        const { recipeName, ingredients, groups, img, cookingInstructions, chefName, chefBio, showRecipe, bio } = this.state;
        return this.state.recipeName ? <PageWrapper>
            <div className="white-background">
                <div className="recipe-profile-container">
                    <label id="recipe-title">{recipeName}</label>
                    <span id="showRecipe" onClick={this.show.bind(this)}>Recipe</span>
                    <span id="bio" onClick={this.show.bind(this)}>Chef</span>
                    {showRecipe ? <Ingredients display={showRecipe} ingredients={ingredients} cooking={cookingInstructions} /> : null}
                    {bio ? <Bio display={bio} biography={chefBio} chefName={chefName} /> : null}
                </div>
                <button onClick={this.viewImage}>View Dish</button>
                <img className={`recipe-image image-enlarge-${this.state.imageEnlarge}`} src={img} />
            </div>
        </PageWrapper> : null;
    }
}

export default RecipeProfile;
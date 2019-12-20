import React, { Component } from 'react';

class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.state = { showIngredients: false }
    }
    componentDidMount() {
        let that = this;
        setTimeout(function () {
            that.setState({ showIngredients: true })
        }, 300)
    }
    render() {
        const { ingredients, cooking } = this.props;

        return <div className={`ingredients-container ${this.state.showIngredients}-ingredients`}>
            <ul>
                {ingredients.map(item => {
                    return <li key={item._id}>{item.ingredient}, {item.amount}{item.units}</li>
                })}
            </ul>
            <hr></hr>
            <p>{cooking}</p>
        </div>
    }
}

export default Ingredients;
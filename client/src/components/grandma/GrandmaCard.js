import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
import './grandma.css';

class GrandmaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    delayRedirect = event => {
        let to = event.target.pathname;
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(() => push(to), 300);
    }
    render() {
        const { chefImage, chefName, chefBio, author, _id } = this.props.chef;
        return <div className="card m-auto" style={{ width: '22rem' }}>
            <img className="card-img-top" src={chefImage} alt="portrait of chef" />
            <div className="card-img-top-shadow" />
            <h5 className="card-title">{chefName}</h5>
            <div className="card-body">
                <p className="card-text">{chefBio}</p>
                <p className="card-author"> -{author}</p>
                <div className="row w-100 mb-3">
                    <div className="col-6">
                        <Link className="nav-link p-0 text-white" to={`/addrecipe/${_id}`} >Add Recipe</Link>
                    </div>
                    <div className="col-6">
                        <Link className="nav-link p-0 text-white" to="/addrecipe" onClick={this.delayRedirect}>View Recipes</Link>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default GrandmaCard;
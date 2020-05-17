import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCardMini extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    openSelectedPage = (id, e) => {
        const redirectUrl = this.props.redirectUrl
    }
    render() {
        const { _id, name, image, likes } = this.props;
        return (
            <Link
                className="nav-link p-0 text-white"
                to={`${this.props.redirectUrl}`}>
                <div className="card-item" id={_id}>
                    <div className='card-item-label-container'>
                        <label>{name}</label>
                    </div>
                    <img src={image} />
                    <div>
                        <span className='liked-number'>{likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

export default RecipeCardMini;
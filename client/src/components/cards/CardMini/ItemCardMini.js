import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCardMini extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { _id, name, image, likes } = this.props;
        return (

            <div className="nav-link p-0 text-white">

                <div className="card-item" id={_id}>
                    <Link className='card-item-label-container' to={`${this.props.redirectUrl}`}>
                        <label>{name}</label>
                    </Link>
                    <img src={image} />
                    <div>
                        <span className='liked-number'>{likes}</span>
                    </div>
                </div>
            </div >

        )
    }
}

export default RecipeCardMini;
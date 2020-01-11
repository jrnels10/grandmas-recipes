import React, { Component } from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
} from "react-share";
import { Link, Route } from 'react-router-dom';
import './minirecipecard.css';
import { description } from 'joi';
import ModalRecipes from '../tools/Modal';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { description: false, heart: false, modal: false }
    }
    componentDidMount() {
        this.props.value.value.dispatch({
            type: 'VIEW_MY_RECIPE',
            payload: { selected: this.props.recipe }
        })
    }
    toggle = (title) => {
        console.log(title)
        this.setState({ [title]: !this.state[title] })
    }
    toggleHeart = (e) => {
        this.setState({ heart: !this.state.heart })
    }
    render() {
        const { heart, description, modal } = this.state;
        const { recipeName, img, _id } = this.props.recipe;
        const recipePrivate = this.props.recipe.private;
        return <div className="card mini-recipe-card" >
            <label className="card-title mini-recipe-card-title">{recipeName}</label>
            <svg className="bi bi-three-dots-vertical mini-three-dot-icon" width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.5 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
            </svg>
            <Link className="nav-link p-0 text-white" to={`/recipe/selectedrecipe/${_id}`} >
                <img className="mini-card-recipe-img" src={img} alt="recipe" />
            </Link>
            <div className={`mini-recipe-card-description-${description ? 'full' : 'short'}`}>
                <p className="mini-recipe-card-description">Description of meal Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="mini-recipe-card-actions row">
                <div className="mini-recipe-card-heart-container col-2">
                    {heart ?
                        <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clipRule="evenodd" />
                        </svg> :
                        <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clipRule="evenodd" />
                        </svg>}
                </div>
                <div className="mini-share col-8">
                    <FacebookShareButton url="https://google.com">
                        <FacebookIcon size={27} round={true} />
                    </FacebookShareButton>
                    <EmailShareButton url='https://google.com'>
                        <EmailIcon size={27} round={true} />
                    </EmailShareButton>
                    <WhatsappShareButton url="https://google.com">
                        <WhatsappIcon size={25} round={true} />
                    </WhatsappShareButton>

                </div>

                {!description ? <svg className="bi bi-chevron-down mini-chevron-down col-2" onClick={this.toggle.bind(this, 'description')} id='description' width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.646 6.646a.5.5 0 01.708 0L10 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clipRule="evenodd" />
                </svg> : <svg className="bi bi-chevron-up mini-chevron-down col-2" onClick={this.toggle.bind(this, 'description')} id='description' width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L10 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clipRule="evenodd" />
                    </svg>}
            </div>
        </div>
    }
}

export default RecipeCard;
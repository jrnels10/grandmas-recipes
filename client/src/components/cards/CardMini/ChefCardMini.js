import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Options from './../CardOptions/ChefOptions';
import { NavigateButton } from './../../tools/Buttons';
import { motion } from 'framer-motion';

import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon
} from "react-share";
import './minicard.css'

class ChefCardMini extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: false,
            heart: false,//props.value.user.chefsLiked.includes(props.chef.chefId),
            modal: false,
            likedRecipes: [],// props.value.user.recipesLiked,
            liked: 12345, //this.props.recipe.liked
            isOpen: false
        }
    }

    setIsOpen = () => {
        const { dispatch } = this.props.value;
        this.setState({ isOpen: !this.state.isOpen });
        dispatch({
            type: 'ITEM_SELECTED',
            payload: { selected: this.props.chef }
        });
    }
    toggle = (title) => {
        this.setState({ [title]: !this.state[title] })
    };

    toggleHeart = async (e) => {
        const initialHeart = this.state.heart;
        this.setState({ liked: initialHeart ? --this.state.liked : ++this.state.liked, heart: !initialHeart });
        // await likemyrecipe(this.props.recipe._id, { userId: this.props.value.user.id })
    };



    render() {
        const { heart, description, liked } = this.state;
        const { chefId, chefName, chefImage, chefBio, dateSubmitted, chefRecipes, chefPrivate } = this.props.chef;
        const { dispatch } = this.props.value;
        const inviteFamilyLink = `${window.location.origin}/familychef/${chefId}`;
        const pageVariant = {
            closed: {
                // height: '100%',
                // width: '100%',
                // margin: 'auto',
                // marginBottom: '40px'
                opacity: 0
            },
            open: {
                // height: 'auto',
                // width: '70vw',
                // display: 'flex',
                // justifyContent: 'center',
                // position: 'relative',
                // marginBottom: '40px'
                opacity: 1
            },
        };
        const pageTransition = {
            duration: .3
        }

        return <motion.div
            className="card card-mini-chef"
            variants={pageVariant}
            initial='closed'
            animate='open'
            exit='closed'
            transition={pageTransition}
        >
            <div className='card-mini-chef-header'>
                <div className='card-mini-chef-title-container'>
                    <label className="card-title card-mini-chef-title w-100">{chefName}</label>
                    <span className="card-title card-mini-chef-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                </div>
                {/* <Options options={{ value: this.props.value, chef: this.props.chef }} /> */}
            </div>
            <Link className="nav-link p-0 text-white" onClick={this.setIsOpen.bind(this)} to={`/familychefs/selected/${chefId}`} >
                <img
                    className="card-mini-chef-img"
                    src={chefImage}
                    alt="chef"
                />
            </Link>
            <div className="card-mini-chef-actions">
                <div className='row p-2 w-100 m-0'>
                    <div className="card-mini-chef-heart-container">
                        {heart ?
                            <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clipRule="evenodd" />
                            </svg> :
                            <svg className="bi bi-heart-fill mini-heart" onClick={this.toggleHeart} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clipRule="evenodd" />
                            </svg>}
                        {liked > 0 ?
                            <span className='liked-number'>{liked >= 1000 ? `${liked.toString().substring(0, 1) + "." + liked.toString().substring(1, 2)}k` : liked} {liked > 1 ? "likes" : "like"}</span>
                            : null}
                    </div>
                    <div className='card-mini-chef-share'>
                        <FacebookShareButton url={inviteFamilyLink}  >
                            <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                        <EmailShareButton url={inviteFamilyLink}  >
                            <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                        <WhatsappShareButton url={inviteFamilyLink}>
                            <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                    </div>
                </div>
                <div className={`card-mini-chef-open`}>
                    <NavigateButton customClassName='card-mini-chef-open-button' pathTo={`/recipe/selectedrecipe/${chefId}`} value={this.props.value} selected={null}>
                        Open
                        <svg className="bi bi-arrow-right card-mini-chef-open-button-arrow" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clipRule="evenodd" />
                        </svg>
                    </NavigateButton>
                </div>
            </div>
        </motion.div >
    }
}

export default ChefCardMini;
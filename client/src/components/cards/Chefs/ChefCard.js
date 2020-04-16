import React, { Component } from 'react';
import { Consumer } from '../../../Context';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackButton } from '../../tools/Buttons';
import Family from '../../../Images/FamilyIcon';
import Recipe from '../../../Images/RecipeIcon';
import Share from '../../../Images/ShareIcon';
import MiniRecipeCard from './../CardMini/MiniRecipeCard';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon
} from "react-share";


import './chef.css'

const ChefAction = (actionType, action) => {
    return actionType === action ? { y: -35, borderRadius: '50%', backgroundColor: '#ffaaa5', fill: '#610500' } :
        actionType === '' ? { y: 0, borderRadius: '0%', backgroundColor: '#698474', fill: '#000000' } :
            { y: 0, borderRadius: '0%', backgroundColor: '#fcf8f3', fill: '#000000' }
}

class ChefCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: false,
            heart: false,//props.value.user.chefsLiked.includes(props.chef.chefId),
            modal: false,
            likedRecipes: [],// props.value.user.recipesLiked,
            liked: 12345, //this.props.recipe.liked
            actionType: ''
        }
    }

    chefAction = (actionType) => {
        this.setState({ actionType: this.state.actionType === actionType ? '' : actionType })
    }
    backPage = () => {
        this.props.history.goBack()
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const { heart, description, liked, actionType } = this.state;
                    const { chefId, chefName, chefImage, chefBio, dateSubmitted, chefRecipes, chefPrivate } = value.selected;
                    const inviteFamilyLink = `${window.location.origin}/familychef/${chefId}`;
                    const pageVariant = {
                        closed: {
                            opacity: 1
                            // height: '100%',
                            // width: '100%',
                            // margin: 'auto',
                            // borderRadius: '0px'
                        },
                        open: {
                            opacity: 0
                            // height: '70vh',
                            // width: '70vw',
                            // display: 'flex',
                            // position: 'relative',
                            // marginBottom: '40px'
                        },
                        headerIn: {
                            borderRadius: '0px'
                        },
                        headerOut: {
                            borderRadius: ['15px', '15px', '0px', '0px']

                        },
                        titleOut: {
                            opacity: 0,
                            textAlign: 'left',
                            duration: 1000
                        },
                        titleIn: {
                            opacity: 1,
                            textAlign: 'center',
                            duration: 1000
                        }
                    }
                    const pageTransition = {
                        duration: .3
                    }
                    return <motion.div
                        className="card card-chef"
                        initial='open'
                        animate='closed'
                        exit='open'
                        variants={pageVariant}
                        transition={pageTransition}
                    >
                        <BackButton goBack={this.backPage} />
                        <motion.div
                            className='card-selected-chef-header'
                            initial='headerOut'
                            animate='headerIn'
                            exit='headerOut'
                            variants={pageVariant}
                            transition={pageTransition}>
                            <motion.div
                                className='card-selected-chef-title-container'
                                initial='titleOut'
                                animate='titleIn'
                                exit='titleOut'
                                variants={pageVariant}
                                transition={pageTransition}>
                                <label className="card-title card-selected-chef-title w-100" > {chefName} </label>
                                <span className="card-title card-selected-chef-date">Submitted {new Date(dateSubmitted).toDateString()}</span>
                            </motion.div>
                            {/* <Options options={{ value: this.props.value, chef: this.props.chef }} /> */}
                        </motion.div>
                        {/* <Link className="nav-link p-0 text-white" onClick={this.selected.bind(this)} to={`/recipe/selectedrecipe/${chefId}`} > */}
                        <motion.img
                            animate={actionType !== '' ? { height: '60px' } : { height: '450px' }}
                            className="card-selected-chef-img"
                            src={chefImage} alt="recipe" />
                        {/* </Link> */}
                        <div className="card-selected-chef-actions">
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
                            <motion.div
                                animate={actionType !== '' ? { height: '540px', backgroundColor: '#fcf8f3' } : { height: 'auto', backgroundColor: '#698474' }}
                                className='card-selected-actions row'>
                                <div className='col-12'>
                                    <motion.div className='row' animate={actionType !== '' ? { borderBottom: '1px solid rgba(0,0,0,0.4)' } : { borderBottom: '1px solid rgba(0,0,0,0.0)' }}>
                                        <div className='col action-button' animate={actionType !== '' ? { opacity: 0 } : { opacity: 1 }} onClick={this.chefAction.bind(this, 'family')}>
                                            <motion.div
                                                animate={ChefAction(actionType, 'family')}
                                                className='icon-background'>
                                                <Family action={actionType} />
                                            </motion.div>
                                        </div>
                                        {/* <div className='col action-button' onClick={this.chefAction.bind(this, 'recipe')}>
                                            <motion.div
                                                animate={ChefAction(actionType, 'recipe')}
                                                className='icon-background'>
                                                <Recipe action={actionType} />
                                            </motion.div>
                                        </div> */}
                                        <div className='col action-button' onClick={this.chefAction.bind(this, 'share')}>
                                            <motion.div
                                                animate={ChefAction(actionType, 'share')}
                                                className='icon-background'>
                                                <Share action={actionType} />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                    <motion.div className='row' animate={actionType !== '' ? { opacity: 1, transition: { delay: .3 } } : { opacity: 0 }} style={actionType !== '' ? { display: 'block' } : { display: 'none' }}>
                                        {chefRecipes.map(recipe => {
                                            return <div className='card w-25' key={recipe.id}>hello</div>
                                        })}

                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div >
                }
                }</Consumer >
        )
    }
}



export default withRouter(ChefCard);
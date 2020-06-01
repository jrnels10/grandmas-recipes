import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import { NavigateButton } from './../../tools/Buttons';
import { motion } from 'framer-motion';
import Family from '../../../Images/FamilyIcon';
import Recipe from '../../../Images/RecipeIcon';
import Share from '../../../Images/ShareIcon';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon
} from "react-share";
import './minicard.css';
import ItemCardMini from './ItemCardMini';

const ChefAction = (actionType, action) => {
    return actionType === action ? { y: -35, borderRadius: '50%', backgroundColor: '#ffaaa5', fill: '#610500' } :
        actionType === '' ? { y: 0, borderRadius: '0%', backgroundColor: '#698474', fill: '#000000' } :
            { y: 0, borderRadius: '0%', backgroundColor: '#fcf8f3', fill: '#000000' }
}
class ChefCardMini extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: false,
            heart: false,//props.value.user.chefsLiked.includes(props.chef.chefId),
            modal: false,
            likedRecipes: [],// props.value.user.recipesLiked,
            liked: 12345, //this.props.recipe.liked
            isOpen: false,
            actionType: ''
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



    chefAction = (actionType) => {
        this.setState({ actionType: this.state.actionType === actionType ? '' : actionType })
    }

    render() {
        const { heart, description, liked, actionType } = this.state;
        const { chefId, chefName, chefImage, chefBio, dateSubmitted, chefRecipes, chefPrivate } = this.props.chef;
        const { dispatch } = this.props.value;
        const inviteFamilyLink = `${window.location.origin}/familychef/${chefId}`;
        const pageVariant = {
            closed: {
                opacity: 0
            },
            open: {
                opacity: 1
            },
        };
        const pageTransition = {
            duration: .3
        }
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 500
        };
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

            </div>
            <img
                className="card-mini-chef-img"
                src={chefImage}
                alt="chef"
            />
            {/* </Link> */}
            <div className="card-mini-chef-actions">
                <div className='row p-2 w-100 m-0 card-mini-chef-like-and-share'>

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
                    animate={actionType !== '' ? { height: '300px', backgroundColor: '#fcf8f3', borderRadius: '13px' } : { height: 'auto', backgroundColor: '#698474', borderRadius: '20px' }}
                    className='card-selected-actions row'>
                    <div className='col-12'>
                        <motion.div className='row' animate={actionType !== '' ? { borderBottom: '1px solid rgba(0,0,0,0.4)' } : { borderBottom: '1px solid rgba(0,0,0,0.0)' }}>
                            <motion.div className='col action-button' animate={actionType !== '' ? { border: '2px solid #fcf8f3' } : { border: '2px solid #ffd3b6' }} onClick={this.chefAction.bind(this, 'family')}>
                                <motion.div
                                    animate={ChefAction(actionType, 'family')}
                                    className='icon-background'>
                                    <Family action={actionType} />
                                </motion.div>
                            </motion.div>
                            <motion.div className='col action-button' animate={actionType !== '' ? { border: '2px solid #fcf8f3' } : { border: '2px solid #ffd3b6' }} onClick={this.chefAction.bind(this, 'recipe')}>
                                <motion.div
                                    animate={ChefAction(actionType, 'recipe')}
                                    className='icon-background'>
                                    <Recipe action={actionType} />
                                </motion.div>
                            </motion.div>

                            {/* <motion.div className='col action-button' animate={actionType !== '' ? { border: '2px solid #fcf8f3' } : { border: '2px solid #ffd3b6' }} onClick={this.chefAction.bind(this, 'share')}>
                                <motion.div
                                    animate={ChefAction(actionType, 'share')}
                                    className='icon-background'>
                                    <Share action={actionType} />
                                </motion.div>
                            </motion.div> */}

                        </motion.div>
                        <motion.div className='row' animate={actionType !== '' ? { opacity: 1, transition: { delay: .3 } } : { opacity: 0 }} style={actionType !== '' ? { display: 'block' } : { display: 'none' }}>
                            {actionType === 'recipe' ? <React.Fragment>
                                <NavigateButton customClassName='dashboard-button w-100 mt-2' pathTo={`/addrecipe/${chefId}`}>Add new recipe</NavigateButton>
                                <Slider {...settings}>
                                    {chefRecipes.map(recipe => {
                                        const likes = recipe.liked >= 1000 ? `${liked.toString().substring(0, 1) + "." + recipe.liked.toString().substring(1, 2)}k likes` : recipe.liked > 1 || recipe.liked === 0 ? `${recipe.liked} likes` : `${recipe.liked} like`;

                                        return <ItemCardMini key={recipe._id} _id={recipe._id} name={recipe.recipeName} image={recipe.recipeImage} likes={likes} redirectUrl={`/recipe/selectedrecipe/${recipe._id}`} />
                                    })}
                                </Slider>
                            </React.Fragment> : actionType === 'family' ? <React.Fragment>
                                <NavigateButton customClassName='dashboard-button w-100 mt-2' pathTo={`/addfamily/${chefId}`}>Add new family</NavigateButton>
                                {this.props.families.length > 0 ?
                                    <Slider {...settings}>
                                        {this.props.families.map(family => {
                                            const { familyId, familyBio, familyOwnerName, familyName, familyMembers, familyImage } = family;
                                            return <ItemCardMini key={familyId} _id={familyId} name={familyName} image={familyImage} likes={null} members={familyMembers} redirectUrl={`/recipe/selectedrecipe/${familyId}`} />
                                        })}
                                    </Slider> : 'No Families'}
                            </React.Fragment> : null}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div >
    }
}

export default ChefCardMini;
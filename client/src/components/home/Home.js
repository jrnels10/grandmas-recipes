import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';
import DashBoard from './../dashboard/Dashboard';
import { horizontalPageTransition } from './../tools/AppFunctions';
import { motion } from 'framer-motion';

import './homev2.css';

// import './home.css'


class Home extends Component {

    state = {
        open: true,
    }


    closeSign = () => {
        this.setState({
            open: true
        })
    }
    componentDidMount = () => {
        const { value, redirectTo, redirectedFrom } = this.props;
        if (value.redirectTo === '') {
            value.dispatch({
                type: "REDIRECT-FROM",
                payload: {
                    redirectedFrom: redirectedFrom,
                    redirectTo: redirectTo
                }
            })
        }
    }

    render() {
        console.log(this.props)
        const pageVariant = {
            in: {
                opacity: 1,
                x: 0
            },
            out: {
                opacity: 0,
                x: "-100vw"
            }
        };
        const pageTransition = {
            transition: "linear"
        }

        return <motion.div
            className="w-100 h-100 row m-0"
            initial='out'
            animate='in'
            exit='out'
            variants={pageVariant}
            transition={pageTransition}
        >
            {/* {!this.props.value.isAuthenticated ? */}
            <React.Fragment>
                <div className='recipe-logo-container'>
                    <label className={`navbar-brand-home`}>Family Recipes</label>
                </div>

                <div className="login-container">

                    <button
                        className={`btn signin-button-v2`}
                        onClick={this.sign}>
                        <Link className="nav-link p-0 sign-in-v2" to="/signin" >Sign In
                                        <svg className="bi bi-arrow-right sign-in-arrow" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </button>
                    <div className='w-100 m-2'>
                        <span className='sign-up-link-span'>Dont have an account? <Link className="sign-up-link " to="/signup" >Sign Up</Link></span>
                    </div>
                </div>
            </React.Fragment>
            {/* : <DashBoard data={this.props.value} />} */}
            <div className="row"></div>
        </motion.div>
        //     }}
        // </Consumer>
        // )
    }
};
export default Home;
import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';



import './home.css'

export default class Home extends Component {

    state = {
        open: true,
    }


    closeSign = () => {
        this.setState({
            open: true
        })
    }

    redirectIfAuthenticated = (authenticated) => {
        debugger
        return authenticated ? this.props.push('/dashboard') : null
    }

    render() {
        return (
            <Consumer>
                {value => {
                    if (this.props.redirectTo && value.redirectTo === '') {
                        value.dispatch({
                            type: "REDIRECT-FROM",
                            payload: {
                                redirectedFrom: this.props.redirectedFrom,
                                redirectTo: this.props.redirectTo
                            }
                        })
                    }
                    return <div className="w-100 h-100 row m-0">
                        {!value.isAuthenticated ?
                            <React.Fragment>
                                <div className="login-container row w-100 m-0 pl-2 p-0 mt-3">
                                    <div className="w-50 text-center float-left">
                                        <button
                                            className={`btn signin-button`}
                                            onClick={this.sign}>
                                            <Link className="nav-link p-0 text-white" to="/signin" >Sign In</Link>
                                        </button>
                                    </div>

                                    <div className="w-50 text-center float-left">

                                        <button
                                            className={`btn signin-button`}
                                            onClick={this.sign}>
                                            <Link className="nav-link p-0 text-white" to="/signup" >Sign Up</Link>
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment> : null}
                        <div className="row"></div>
                    </div>
                }}
            </Consumer>
        )
    }
}
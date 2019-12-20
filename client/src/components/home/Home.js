import React, { Component } from 'react';
import SignIn from '../sign/SignIn';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';
import homePic from './../../Images/Nelson2.png'



import './home.css'

export default class Home extends Component {

    state = {
        open: true,
    }

    sign = () => {
        console.log("Sign Up clicked")
        this.setState({ open: !this.state.open });
    }

    closeSign = () => {
        console.log('test')
        this.setState({
            open: true
        })
    }
    delayRedirect = event => {
        let to = event.target.pathname;
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(() => push(to), 300);
    }


    render() {
        const open = this.state.open ? 'fade-out' : 'fade-in'
        return (
            <Consumer>
                {value => {
                    return <div className="w-100 h-100 row m-0" >
                        {!value.isAuthenticated ?
                            <React.Fragment>
                                <img id='image-home' src={homePic} />
                                <div className="login-container">
                                    <button
                                        className={`btn w-25 btn-signup login-buttons ${open}`}
                                        onClick={this.sign}>
                                        <Link className="nav-link p-0 text-white" to="/signin" onClick={this.delayRedirect}>Sign In</Link>
                                    </button>
                                    <button
                                        className={`btn w-25 btn-outline-warning login-buttons ${open}`}
                                        onClick={this.sign}>
                                        <Link className="nav-link p-0 text-white" to="/signup" onClick={this.delayRedirect}>Sign Up</Link>
                                    </button>
                                </div>
                            </React.Fragment> : null}
                        <div className="row"></div>
                    </div>
                }}
            </Consumer>
        )
    }
}
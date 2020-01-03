import React, { Component } from 'react';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';



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

                                <div className="login-container row w-100 m-0 pl-2 p-0 mt-3">
                                    <div className="w-50 text-center float-left">
                                        <button
                                            className={`btn btn-signup signin-button  ${open}`}
                                            onClick={this.sign}>
                                            <Link className="nav-link p-0 text-white" to="/signin" onClick={this.delayRedirect}>Sign In</Link>
                                        </button>
                                    </div>

                                    <div className="w-50 text-center float-left">

                                        <button
                                            className={`btn signin-button  ${open}`}
                                            onClick={this.sign}>
                                            <Link className="nav-link p-0 text-white" to="/signup" onClick={this.delayRedirect}>Sign Up</Link>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context';
import { withRouter } from 'react-router-dom';
import ChefIcon from './../../Images/ChefIcon';
import axios from 'axios';

import './navbarv2.css';

class Navbar extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            redirect: false,
            homePage: true,
            isTop: true
        };
        this.signOut = this.signOut.bind(this);
    }
    signOut = (dispatch, e) => {

        localStorage.removeItem('JWT_TOKEN');
        this.setState({ redirect: true })
        dispatch({
            type: "SIGN_OUT",
            payload: {
                email: '',
                token: '',
                isAuthenticated: false,
                errorMessage: '',
                show: true

            }
        });
        this.props.toggleNav();

        axios.defaults.headers.common['Authorization'] = '';
        this.hide(e);
    }
    componentDidMount() {
        window.location.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 30;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop: !this.state.isTop })
            }
        });

    }

    redirect = (e) => {
        this.hide(e);
        e.target.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
        this.props.toggleNav();
    }
    hide = (e) => {
        this.setState({ show: false })
    }

    backPage = () => {
        this.props.history.goBack()
    }
    render() {
        return (
            <Consumer>
                {value => {
                    // console.log(this.props.history)
                    const url = this.props.history.location.pathname;
                    const { dispatch } = value;
                    const home = value.isAuthenticated ? "blueish" : "no-color";
                    const show = this.props.display ? 'open' : 'close';
                    // debugger
                    return <React.Fragment>
                        <div className={`top-nav-${show}`}>
                            {this.props.display ?
                                <div className='row'>
                                    <div className='col'>
                                        <Link className="nav-link" onClick={this.redirect} to="/dashboard">
                                            <svg className="bi bi-house icon-house" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className='col'>
                                        <Link className="nav-link" onClick={this.redirect} to="/familychefs">
                                            <ChefIcon />
                                        </Link>
                                    </div>
                                    <div className='col profile-icon-container'>
                                        <svg className="bi bi-people-circle icon-profile" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                                            <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {!value.isAuthenticated ?
                                        null :
                                        <div className='col'>
                                            <Link className="nav-link" to="/" onClick={this.signOut.bind(this, dispatch)}>
                                                <svg className="bi bi-box-arrow-right icon-house" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M13.646 13.354a.5.5 0 010-.708L16.293 10l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M6.5 10a.5.5 0 01.5-.5h9a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M4 15.5A1.5 1.5 0 012.5 14V6A1.5 1.5 0 014 4.5h7A1.5 1.5 0 0112.5 6v1.5a.5.5 0 01-1 0V6a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V14a1.5 1.5 0 01-1.5 1.5H4z" clipRule="evenodd" />
                                                </svg>
                                            </Link>
                                        </div>}
                                </div>
                                : null}
                        </div>
                    </React.Fragment>
                }
                }
            </Consumer >
        )
    }
};

export default withRouter(Navbar);
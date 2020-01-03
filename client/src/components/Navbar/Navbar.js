import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context';
import axios from 'axios';

import './navbar.css';

export default class Navbar extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            redirect: false,
            homePage: true
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
                show: false
            }
        });
        axios.defaults.headers.common['Authorization'] = '';
        this.hide(e);
        // return <Redirect to='/home'/>;
        // this.props.history.push('/home');
    }
    componentDidMount() {
        window.location.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
    }

    redirect = (e) => {
        this.hide(e);
        // this.setState({ show: !this.state.show });
        e.target.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
    }
    hide = (e) => {
        // console.log(e)
        // e.stopPropagation();
        // var elems = document.querySelectorAll(".show");

        // [].forEach.call(elems, function (el) {
        //     el.classList.remove("show");
        // });
        this.setState({ show: false })
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    const home = value.isAuthenticated ? "blueish" : "no-color";
                    const show = this.state.show ? 'open' : 'close';
                    return <React.Fragment>
                        <nav className={`navbar navbar-${show}`} style={{ zIndex: '5000' }}>
                            <label className="navbar-brand">Grandmas Recipes</label>
                            <Link className="navbar-brand" onClick={this.redirect.bind(this)} to="/"></Link>
                            <button className={`navbar-toggler`} type="button" onClick={() => { this.setState({ show: !this.state.show }) }} aria-expanded="false" aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-list" width="1.5em" height="1.5em" viewBox="0 0 20 20" fill="#f7c9b6">
                                    <path fillRule="evenodd" d="M4.5 13.5A.5.5 0 015 13h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 9h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 5h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className={`navbar-custom-${show} ${home}`} id="navbarSupportedContent">
                                {/* <FilterPeaks data={value}/> */}
                                <ul className={`navbar-nav ul-${show} mr-auto text-${home}`}>
                                    {this.state.show ?
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" onClick={this.redirect} to="/myrecipes">My recipes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" onClick={this.redirect} to="/dashboard">Profile</Link>
                                            </li>
                                        </React.Fragment>
                                        : null}
                                </ul>
                                <ul className={`navbar-nav ul-${show} mr-auto`}>
                                    {this.state.show ?
                                        <React.Fragment>
                                            {!value.isAuthenticated ?
                                                [<li className="nav-item" key='signUp'>
                                                    <Link className="nav-link" onClick={this.redirect} to="/signup">Sign Up</Link>
                                                </li>,
                                                <li className="nav-item" key='signIn'>
                                                    <Link className="nav-link" onClick={this.redirect} to="/signin">Sign In</Link>
                                                </li>] : null}
                                            <li className="nav-item">

                                                {value.isAuthenticated ? <Link className="nav-link" to="/" onClick={this.signOut.bind(this, dispatch)}>Sign Out</Link> : null}
                                            </li>
                                        </React.Fragment>
                                        : null}
                                </ul>
                            </div>
                        </nav>
                    </React.Fragment>
                }}
            </Consumer>
        )
    }
}
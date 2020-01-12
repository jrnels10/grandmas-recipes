import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './navbar.css';

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
                    const show = this.state.show ? 'open' : 'close';
                    return <React.Fragment>
                        <nav className={`navbar navbar-${show} nav-scroll-${this.state.isTop}`} style={{ zIndex: '5000' }}>
                            {url === '/dashboard' || url === '/' ? null :
                                <svg className="bi bi-arrow-left" onClick={this.backPage} width="50px" height="40px" viewBox="0 0 20 20" fill={`${this.state.show || !this.state.isTop ? '#f7c9b6' : '#877785'}`} xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                </svg>}
                            <label className={`navbar-brand-${show}`}>Family Recipes</label>
                            <button className={`navbar-toggler`} type="button" onClick={() => { this.setState({ show: !this.state.show }) }} aria-expanded="false" aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`bi bi-list `} width="1.5em" height="1.5em" viewBox="0 0 20 20" fill={`${this.state.show || !this.state.isTop ? '#f7c9b6' : '#877785'}`}>
                                    <path fillRule="evenodd" d="M4.5 13.5A.5.5 0 015 13h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 9h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 5h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className={`test navbar-custom-${show} ${home}`} id="navbarSupportedContent">
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
};

export default withRouter(Navbar);
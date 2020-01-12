import React, { Component } from 'react';
import { Consumer } from './../../Context';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import PageWrapper from './../tools/PageWrapper';

import './SignUpAndSignIn.css';

export default class SignIn extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            open: false,
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    onSubmit = async (value, e) => {
        const { dispatch, axiosServerUrl } = value;
        // console.log(this.state)
        e.preventDefault();
        // Step 1) User the data and to make HTTP request to our BE and send it along
        // Step 2) Take the BE's response (jwtToken)
        // Step 3) Dispatch 'user just signed up'
        // Step 4) Save the jwtToken into our localStorage
        try {
            const res = await axios.post(`${axiosServerUrl}/users/signin`, { email: this.state.email, password: this.state.password })
            dispatch({
                type: "SIGN_IN",
                payload: {
                    email: this.state.email,
                    token: res.data.token,
                    isAuthenticated: true,
                    errorMessage: '',
                    home: false
                }
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;

            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
            this.setState({ errorMessage: 'Email or password incorrect' })
            dispatch({
                type: "AUTH_ERROR",
                payload: {
                    errorMessage: 'Email or password incorrect'
                }
            });
        }

    }

    async responseGoogle(value, res) {
        // console.log(res)

        const { dispatch, axiosServerUrl } = value;
        try {
            const data = await axios.post(`${axiosServerUrl}/users/oauth/google`, { access_token: res.tokenId });
            // console.log(data);
            // debugger
            dispatch({
                type: "SIGN_IN",
                payload: {
                    token: data.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', data.data.token);
            axios.defaults.headers.common['Authorization'] = data.data.token;
            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    }

    async responseFacebook(value, res) {
        // console.log(res)
        const { dispatch, axiosServerUrl } = value;
        try {
            const data = await axios.post(`${axiosServerUrl}/users/oauth/facebook`, { access_token: res.accessToken });
            dispatch({
                type: "SIGN_UP",
                payload: {
                    token: data.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', data.data.token);
            axios.defaults.headers.common['Authorization'] = data.data.token;

            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, errorMessage: '' })

    }

    close = () => {
        // console.log("close");
        this.setState({ open: false })
        let that = this;
        setTimeout(function () {
            that.props.history.push('/');
        }, 250)
    }

    componentDidMount() {
        let that = this;
        setTimeout(function () {
            that.setState({ open: true })
        }, 1)
    }


    render() {
        return (
            <Consumer>
                {value => {
                    const open = !this.state.open ? "open" : "close";
                    // console.log(value)
                    return <PageWrapper>
                        <div className={`signin-${open} signin-menu`}>
                            <div className={`w-100 fade-${open} sign-container`}>
                                <span className="m-2 pb-4" onClick={this.close}><i className="fas fa-arrow-circle-right fa-lg"></i></span>
                                <form className={`mt-3`} onSubmit={this.onSubmit.bind(this, value)}>
                                    <div className="form-group-sm">
                                        <label className="sign-input-label" htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            className="form-control-sm sign-input"
                                            id="exampleInputEmail1"
                                            type="email"
                                            name="email"
                                            onChange={this.onChange}
                                            aria-describedby="emailHelp"
                                            placeholder="John@smith.com"
                                        />
                                        <hr className='sign-underline' />
                                    </div>
                                    <div className="form-group">
                                        <label className="sign-input-label" htmlFor="exampleInputPassword1 text-white">Password</label>
                                        <input
                                            className="form-control-sm sign-input"
                                            id="exampleInputPassword1"
                                            type="password"
                                            name='password'
                                            onChange={this.onChange}
                                            placeholder="mysecretpassword" />
                                        <hr className='sign-underline' />
                                    </div>
                                    <div className='row w-100 m-0 pl-2 p-0 mt-3'>
                                        <div className="w-50 text-center float-left">
                                            <button type="submit" className="btn btn-primary signin-button">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                                {this.state.errorMessage ? <div className='alert alert-danger'>{value.errorMessage}</div> : null}
                                <div className='text-white pl-2 mt-5'><small>
                                    Or sign in using with Google
                            </small>
                                </div>
                                <div className='row w-50 m-0 pl-2 p-0 mt-3'>
                                    {/* <div className="w-50 m-auto text-center">
                                        <FacebookLogin
                                            appId='1431908256951062'
                                            autoLoad={false}
                                            isMobile={false}
                                            textButton=" Facebook"
                                            fields="name,email,picture"
                                            callback={this.responseFacebook.bind(this, value)}
                                            cssClass="btn facebook-login"
                                            icon="fa-facebook fa-lg"
                                        />
                                    </div> */}
                                    <div className="w-100 m-auto text-center">
                                        <GoogleLogin
                                            clientId={`267196671122-298u06lbfo5ho1ollta67bm337ovluj9.apps.googleusercontent.com`}
                                            buttonText="Google"
                                            onSuccess={this.responseGoogle.bind(this, value)}
                                            onFailure={this.responseGoogle.bind(this, value)}
                                            className='btn google-login'
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PageWrapper>
                }}
            </Consumer>
        );
    }
}
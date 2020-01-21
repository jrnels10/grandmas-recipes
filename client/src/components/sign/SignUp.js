import React, { Component } from 'react';
import { Consumer } from './../../Context';
import './SignUpAndSignIn.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import PageWrapper from './../tools/PageWrapper';


export default class SignUp extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            errorMessage: ''
        };
    }

    onSubmit = async (value, e) => {
        const { dispatch, axiosServerUrl, redirectTo } = value;

        e.preventDefault();
        // Step 1) User the data and to make HTTP request to our BE and send it along
        // Step 2) Take the BE's response (jwtToken)
        // Step 3) Dispatch 'user just signed up'
        // Step 4) Save the jwtToken into our localStorage
        try {
            const res = await axios.post(`${axiosServerUrl}/users/signup`, {

                // const res = await axios.post('https://fourteener-community.herokuapp.com/users/signup', {
                profilePicture: 'default',
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            });
            dispatch({
                type: "SIGN_UP",
                payload: {
                    email: this.state.email,
                    token: res.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
            return redirectTo !== '' ? this.props.history.push(redirectTo) :
                await this.props.history.push('/dashboard');

        } catch (err) {
            console.log(err)
            this.setState({ errorMessage: 'Email already in use' })
            dispatch({
                type: "AUTH_ERROR",
                payload: {
                    errorMessage: 'Email already in use'
                }
            });
        }

    }

    async responseGoogle(value, res) {
        const { dispatch, axiosServerUrl, redirectTo } = value;

        try {
            const data = await axios.post(`${axiosServerUrl}/users/oauth/google`, { access_token: res.accessToken });
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
            return redirectTo !== '' ? await this.props.history.push(redirectTo) :
                await this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    }
    async responseFacebook(value, res) {
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
        this.setState({ open: false })
        this.props.history.push('/');
    }

    render() {
        return (
            <Consumer>
                {value => {
                    // const { dispatch } = value;
                    const open = !this.state.open ? "close" : "open";
                    return <div className={` signin-menu signup-${open} `}>
                        <div className={`w-100 signup-container`}>
                            <span className="m-2" onClick={this.close}><i className="fas fa-arrow-circle-right fa-lg"></i></span>
                            <form className={`mt-2`} onSubmit={this.onSubmit.bind(this, value)}>
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
                                        placeholder="14ersRcool" />
                                    <hr className='sign-underline' />
                                </div>
                                <div className="form-group">
                                    <label className="sign-input-label" htmlFor="exampleInputFirstName1">First Name</label>
                                    <input
                                        className="form-control sign-input"
                                        id="exampleInputFirstName1"
                                        type="text"
                                        name="firstName"
                                        onChange={this.onChange}
                                        placeholder="Enter your first name"
                                    />
                                    <hr className='sign-underline' />
                                </div>
                                <div className="form-group">
                                    <label className="sign-input-label" htmlFor="exampleInputLastName1">Last Name</label>
                                    <input
                                        className="form-control sign-input"
                                        id="exampleInputLastName1"
                                        type="text"
                                        name='lastName'
                                        onChange={this.onChange}
                                        placeholder="Enter your last name" />
                                    <hr className='sign-underline' />
                                </div>

                                <div className='row w-100 m-0 pl-2 p-0 mt-3'>
                                    <div className="w-50 text-center float-left">
                                        <button type="submit" className="btn signin-button">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                            {this.state.errorMessage ? <div className='alert alert-danger'>{value.errorMessage}</div> : null}
                            <div className='text-white pl-2 mt-2'><small>
                                Or sign up using Google
                            </small>
                            </div>
                            <div className='row w-100 m-0 pl-2 p-0 mt-3'>
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
                                <div className="w-50 m-auto text-center">
                                    <GoogleLogin
                                        clientId={`267196671122-298u06lbfo5ho1ollta67bm337ovluj9.apps.googleusercontent.com`}
                                        buttonText="Google"
                                        onSuccess={this.responseGoogle.bind(this, value)}
                                        onFailure={this.responseGoogle}
                                        className='btn google-login'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }}
            </Consumer>
        );
    }
}



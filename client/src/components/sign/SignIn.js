import React, { Component } from 'react';
import { Consumer } from './../../Context';
import './SignUpAndSignIn.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import homePic from './../../Images/Nelson2.png'


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
        console.log(value)
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
        const { dispatch, axiosServerUrl } = value;
        console.log(dispatch, res)
        try {
            const data = await axios.post(`${axiosServerUrl}/users/oauth/google`, { access_token: res.accessToken });
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
                    return <div className={`signin-${open} signin-menu`}>
                        {/* <img id='image-home' src={homePic} /> */}

                        <div className={`w-100 fade-${open}`}>
                            <span className="m-2" onClick={this.close}><i className="fas fa-arrow-circle-right fa-lg"></i></span>
                            <form className={`mt-2`} onSubmit={this.onSubmit.bind(this, value)}>
                                <div className="form-group-sm">
                                    <label className="text-white w-100 font-weight-bold ml-2 mb-1" htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        className="form-control-sm sigin-input"
                                        id="exampleInputEmail1"
                                        type="email"
                                        name="email"
                                        onChange={this.onChange}
                                        aria-describedby="emailHelp"
                                        placeholder="John@smith.com"
                                    />
                                    <hr></hr>
                                </div>
                                <div className="form-group">
                                    <label className="text-white w-100 font-weight-bold ml-2 mb-1" htmlFor="exampleInputPassword1 text-white">Password</label>
                                    <input
                                        className="form-control-sm sigin-input"
                                        id="exampleInputPassword1"
                                        type="password"
                                        name='password'
                                        onChange={this.onChange}
                                        placeholder="14ersRcool" />
                                    <hr></hr>
                                </div>

                                <button type="submit" className="btn btn-primary signin-button ml-2">Sign In</button>
                            </form>
                            {this.state.errorMessage ? <div className='alert alert-danger'>{value.errorMessage}</div> : null}
                            <div className='text-white pl-2 mt-2'><small>
                                Or sign in using Google
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
                                    // icon="fa-facebook"
                                    />
                                </div> */}
                                <div className="w-50 text-center">
                                    <GoogleLogin
                                        clientId={`267196671122-t1r725c4lmflnnmola4mb0s1mv7gb2cg.apps.googleusercontent.com`}
                                        buttonText="Google"
                                        onSuccess={this.responseGoogle.bind(this, value)}
                                        onFailure={this.responseGoogle}
                                        className='btn google-login ml-5'
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
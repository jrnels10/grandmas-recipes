import React, { Component } from 'react';
import axios from 'axios';
import { secret } from './API/UsersAPI';

const Context = React.createContext();
const reducer = (state, action) => {
    // debugger
    switch (action.type) {
        // where the different actions take place.
        case 'SIGN_UP':
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
            }
        case 'SIGN_IN':
            return {
                ...state,
                email: action.payload.email,
                _id: action.payload._id,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
            }
        case 'AUTH_ERROR':
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        case 'USER_INFO':
            let userInfo = state;
            userInfo.user = action.payload;
            return {
                ...state
            }
        case 'ADDED_MY_RECIPE':
            state.user.myRecipes = action.payload.myRecipes;
            return {
                ...state
            }
        case 'VIEW_MY_RECIPE':
            state.recipe.selected = action.payload.selected;
            return {
                ...state
            }
        case 'SIGN_OUT':
            return {
                ...state,
                email: '',
                token: '',
                firstName: '',
                lastName: '',
                profilePicture: '',
                isAuthenticated: false,
                errorMessage: ''
            }

        case 'LOADER':
            return {
                ...state,
                loader: action.payload.loader,
            }
        default:
            return state;
    }
}

// this.setState(prevState => ({
//     input: {
//         ...prevState.input,
//         [stateKey]: wtr
//     }
// }))

// create a main location for the state that can 
// be accessed by any component directly

export class Provider extends Component {
    state = {
        user: {
            email: '',
            firstName: '',
            lastName: '',
            profilePicture: '',
            homeTown: '',
            homeState: '',
            method: '',
            _id: '',
            myRecipes: [
                // { id: '1', recipeName: "Recipe One", groups: [], img: "img-link", private: true },
                // { id: '2', recipeName: "Recipe Two", groups: [], img: "img-link", private: false },
                // { id: '3', recipeName: "Recipe Three", groups: [], img: "img-link", private: true },

            ],
            myGroups: []
        },
        recipe: {
            selected: {
                groups: ["Nelson"],
                ingredients: [{
                    _id: "5e10cbdee149f9307cf6508f",
                    ingredient: "test",
                    amount: 2,
                    units: "tsp"
                }],
                _id: "5e10cbdee149f9307cf6508e",
                recipeName: "test recipe 3",
                cookingInstructions: "cook it",
                img: "https://storage.cloud.google.com/grandmas-recipes/coke.jpg",
                private: true
            }
        },
        loader: true,
        isAuthenticated: false,
        token: '',
        facebookappId: "2368972536494612",
        googleClientId: "267196671122-kijg7hhm848n7klsgsiqav74vebejt45.apps.googleusercontent.com",
        axiosServerUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com'
        ,
        dispatch: action => this.setState(state => reducer(state, action))
    }
    async componentDidMount() {
        this.environment();
        const jwtToken = localStorage.getItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = jwtToken;
        if (jwtToken) {
            await secret();

            this.setState({ token: jwtToken, isAuthenticated: true, loader: false })

        }
        else {
            // this.props.history.push('/')
        }
    }
    environment = () => {
        return process.env.NODE_ENV === "development" ? null : this.setState({
            facebookappId: "2368972536494612",
            googleClientId: "267196671122-12ovuas1pjla6r5dbhd7p5avighbhbdq.apps.googleusercontent.com",
            axiosServerUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com'
        })
    }
    render() {
        return (
            < Context.Provider value={this.state} >
                {this.props.children}
            </Context.Provider >
        )
    }
}

export const Consumer = Context.Consumer;
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './components/home/Home';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import Profile from './components/User/User';
import { Provider } from './Context';
import authGuard from './components/HOC/authGuard';
import DashBoard from './components/dashboard/Dashboard';
import AddRecipe from './components/addrecipe/AddRecipe';
import RecipeProfile from './components/recipe/RecipeProfile';


ReactDOM.render(
    <Provider>
        <BrowserRouter >
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/profile" component={authGuard(Profile)} />
                    <Route exact path="/dashboard" component={authGuard(DashBoard)} />
                    <Route path="/dashboard/:id" component={authGuard(RecipeProfile)} />
                    <Route exact path="/addrecipe" component={authGuard(AddRecipe)} />
                    <Route exact path="/signin" component={SignIn} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// serviceWorker.register();

registerServiceWorker();
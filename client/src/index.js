import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './components/home/Home';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import { Provider } from './Context';
import authGuard from './components/HOC/authGuard';
import DashBoard from './components/dashboard/Dashboard';
import AddRecipe from './components/Recipe/AddRecipe';
import RecipeCard from './components/cards/RecipeCard';
import CardContainer from './components/cards/CardContainer';


ReactDOM.render(
    <Provider>
        <BrowserRouter >
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/dashboard" component={authGuard(DashBoard)} />
                    <Route path="/familychefs" component={authGuard(CardContainer)} />
                    <Route path="/addrecipe/:id" component={authGuard(AddRecipe)} />
                    <Route path={`/recipe/selectedrecipe/:recipeId`} component={authGuard(RecipeCard)} />
                    <Route exact path="/signin" component={SignIn} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
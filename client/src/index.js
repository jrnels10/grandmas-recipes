import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './components/home/Home';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import { Provider } from './Context';
import authGuard from './components/HOC/authGuard';
import DashBoard from './components/dashboard/Dashboard';
import AddRecipe from './components/recipeCards/NewRecipe';
import RecipeCard from './components/cards/RecipeCard';
import CardContainer from './components/cards/CardContainer';
import AddChef from './components/addAndUpdate/AddChef';
// import AddToFamily from './components/Family/AddToFamily';
import SingleChefCard from './components/cards/SingleChefCard';
import FullScreen from './components/tools/FullScreen';

ReactDOM.render(
    <Provider>
        <BrowserRouter >
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/dashboard" component={authGuard(DashBoard)} />
                    <Route path="/familychefs" component={authGuard(CardContainer)} />
                    <Route path="/addnewchef" component={authGuard(AddChef)} />
                    <Route path="/updatechef" component={authGuard(AddChef)} />
                    <Route path="/addrecipe/:id" component={authGuard(AddRecipe)} />
                    <Route path="/familychef/:id" component={SingleChefCard} />
                    <Route path={`/recipe/selectedrecipe/:recipeId`} component={RecipeCard} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/fullscreen" component={FullScreen} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './components/home/Home';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import { Provider } from './Context';
import authGuard from './components/HOC/authGuard';
import DashBoard from './components/dashboard/Dashboard';
import AddRecipe from './components/addAndUpdate/NewRecipe';
import RecipeCard from './components/cards/RecipeCard';
import CardsHome from './components/cards/CardsHome';
import AddChef from './components/addAndUpdate/AddChef';
import Analytics from './components/Analytics/Analytics';
import SingleChefCard from './components/cards/SingleChefCard';
import FullScreen from './components/tools/FullScreen';
import FamilyHome from './components/Family/FamilyHome';
import InvitationToFamily from './components/Family/InvitationToFamily';
import { AnimatePresence } from 'framer-motion';



ReactDOM.render(
    <Provider>
        <BrowserRouter >
            <App>
                <div className="scrollable-div">
                    <AnimatePresence exitBeforeEnter>
                        <Switch location={window.location} key={window.location.pathname}>
                            <Route exact path="/" component={authGuard(Home)} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/dashboard" component={authGuard(DashBoard)} />
                            <Route exact path="/familychefs" component={authGuard(CardsHome)} />
                            <Route exact path="/addnewchef" component={authGuard(AddChef)} />
                            <Route exact path="/familyhome" component={authGuard(FamilyHome)} />
                            <Route exact path="/familyinvite/:id/:id" component={authGuard(InvitationToFamily)} />
                            <Route exact path="/updatechef" component={authGuard(AddChef)} />
                            <Route exact path="/addrecipe/:id" component={authGuard(AddRecipe)} />
                            <Route exact path="/updaterecipe" component={authGuard(AddRecipe)} />
                            <Route exact path="/familychef/:id" component={SingleChefCard} />
                            <Route exact path={`/recipe/selectedrecipe/:recipeId`} component={RecipeCard} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/fullscreen" component={FullScreen} />
                            <Route exact path="/admin" component={Analytics} />
                        </Switch>
                    </AnimatePresence>
                </div>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
// registerServiceWorker();


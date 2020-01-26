import React, { Component } from 'react';
import { Consumer } from './../../Context';
import Home from './../home/Home';


export default (OriginalComponent) => {
    class MixedComponent extends Component {

        render() {
            return <Consumer>
                {value => {

                    const { isAuthenticated } = value;
                    // console.log(isAuthenticated)
                    return isAuthenticated ? <OriginalComponent data={value} /> : <Home value={value} redirectedFrom={document.referrer} redirectTo={window.location} />
                }}
            </Consumer>
        }
    }
    return MixedComponent;
}
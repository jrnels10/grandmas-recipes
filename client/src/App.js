import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';

import './app.css';



export default class App extends Component {

    render() {

        return (
            <div className='h-100 w-100 container-fluid p-0 m-0' id='app-div'>
                <Navbar />
                {/* <div className="w-100 m-0 p-0 h-100" id="body-container"> */}
                {this.props.children}
                {/* </div> */}
            </div>
        )
    }
}
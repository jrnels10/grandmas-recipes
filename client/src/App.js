import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import PageWrapper from './components/tools/PageWrapper';

import './app.css';



export default class App extends Component {

    render() {

        return (
            <div className='h-100 w-100 container-fluid p-0 m-0' id='app-div'>
                <Navbar />
                <PageWrapper>
                    {this.props.children}
                </PageWrapper>
            </div>
        )
    }
}
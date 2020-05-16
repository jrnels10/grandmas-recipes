import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import PageWrapper from './components/tools/PageWrapper';
import { withRouter } from 'react-router-dom';
import { BackButton } from './components/tools/Buttons';

import './app.css';



class App extends Component {
    state = { show: false }

    toggleNavBar = () => {
        this.setState({ show: !this.state.show })
    }
    backPage = () => {
        this.props.history.goBack()
    }
    render() {
        // const show = this.state.show ? 'open' : 'close';
        const url = this.props.history.location.pathname;
        console.log(this.props)
        return (
            <div className='h-100 w-100 container-fluid p-0 m-0' id='app-div'>
                <Navbar display={this.state.show} toggleNav={this.toggleNavBar} />
                <PageWrapper navOpen={this.state.show}>
                    {url === '/dashboard' || url === '/' ? null :
                        <BackButton goBack={this.backPage} />
                    }
                    <button className={`navbar-toggler navbar-toggler-button`} type="button" onClick={this.toggleNavBar.bind(this)} aria-expanded="false" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`bi bi-list `} width="1.5em" height="1.5em" viewBox="0 0 20 20" fill={`#f7c9b6`}>
                            <path fillRule="evenodd" d="M4.5 13.5A.5.5 0 015 13h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 9h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 5h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {this.props.children}
                </PageWrapper>
            </div>
        )
    }
};
export default withRouter(App);
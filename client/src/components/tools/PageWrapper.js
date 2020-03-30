import React, { Component } from 'react';
import './pagewrapper.css';
import { withRouter } from 'react-router-dom';
import bckgrndImage from './../../Images/photoshop_knife.png'
class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { isTop: 0 }
    }
    componentDidMount() {
        window.location.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
        window.addEventListener('scroll', () => {
            console.log("test")
            const isTop = window.scrollY < 30;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop: !this.state.isTop })
            }
        });


    }

    render() {
        return <div className={`page-wrapper-container page-wrapper-${this.props.navOpen ? 'open' : "close"}`} >
            <div className="background" />
            <div className="page-wrapper-content">
                {this.props.children}
            </div>
        </div>
    }
}

export default withRouter(PageWrapper);
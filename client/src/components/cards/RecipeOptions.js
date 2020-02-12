import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon
} from "react-share";
import { NavigateButton } from './../tools/Buttons'

class RecipeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = { options: false }
    }

    toggleOptions = () => {
        this.setState({ options: !this.state.options })
    }

    fullScreen = (props) => {
        const { value: { dispatch }, chef: { image } } = props.options;
        dispatch({ type: 'FULLSCREEN_IMAGE', payload: { fullScreenImage: image } })
        this.props.history.push('/fullscreen');
    }

    render() {
        const privateStatus = this.props.options.private;
        const { options } = this.state;
        return <div className={`recipe-header-options `} >
            {options ?
                <svg className="bi bi-x x-icon" onClick={this.toggleOptions} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clipRule="evenodd" />
                </svg> :
                <svg className="bi bi-three-dots-vertical three-dot-icon" onClick={this.toggleOptions} width="1em" height="1em" viewBox="0 0 20 20" fill="#f7c9b6" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.5 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                </svg>}
            <div className={`option-${options}`}>
                <div className={`options-delay-${options}`}>
                    {options ?
                        <div className={`container-fluid options-diplay`}>
                            <NavigateButton customClassName='dashboard-button' pathTo={'/updatechef'} type={'edit'} value={this.props.options.value} selected={this.props.options.chef}> Edit</NavigateButton>
                            <div className='row w-100 m-0 p-0' onClick={this.fullScreen.bind(this, this.props)}>
                                <span className="privacy-label">View Image Full Screen</span>
                                <svg className="bi bi-arrows-fullscreen" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5zm4.5 7.5a.5.5 0 00-.5.5v3.5H12a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.146 11.11a.5.5 0 000 .708l4.5 4.5a.5.5 0 00.708-.707l-4.5-4.5a.5.5 0 00-.708 0zM3.682 3.646a.5.5 0 000 .708l4.5 4.5a.5.5 0 10.707-.708l-4.5-4.5a.5.5 0 00-.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.5 4a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v4a.5.5 0 001 0V4.5H8a.5.5 0 00.5-.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='row w-100 m-0 p-0'>
                                <span className="privacy-label">Private Recipe</span>
                                {
                                    privateStatus ? <svg className="bi bi-person-fill" onClick={this.toggleinformation} width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5 16s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H5zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg> : <svg className="bi bi-people-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                                        </svg>
                                }
                            </div>
                            <div className='row w-100 m-0 p-0'>
                                <span className="w-100 privacy-label">Share Recipe</span>
                                <FacebookShareButton url="https://google.com">
                                    <FacebookIcon size={27} round={true} />
                                </FacebookShareButton>
                                <EmailShareButton url='https://google.com'>
                                    <EmailIcon size={27} round={true} />
                                </EmailShareButton>
                                <WhatsappShareButton url="https://google.com">
                                    <WhatsappIcon size={25} round={true} />
                                </WhatsappShareButton>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    }
}

export default withRouter(RecipeOptions);





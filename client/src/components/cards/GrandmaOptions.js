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
import { NavigateButton } from '../tools/Buttons'

class RecipeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: false,
            privateStatus: this.props.options.private
        }
    }

    toggleOptions = () => {
        this.setState({ options: !this.state.options })
    }

    render() {
        const privateStatus = this.props.options.private;
        const inviteFamilyLink = `${window.location.origin}/familychef/${this.props.options.chef.chefId}`;
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
                            <NavigateButton customClassName='dashboard-button' pathTo={'/updatechef'} type={'editChef'} value={this.props.options.value} selected={this.props.options.chef}>
                                Edit
                                <svg className="bi bi-gear" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8.505 2.93A.5.5 0 019 2.5h2a.5.5 0 01.495.43l.266 1.858c.234.079.46.173.68.282l1.502-1.127a.5.5 0 01.653.047l1.414 1.414a.5.5 0 01.047.653L14.93 7.56c.109.218.203.445.282.68l1.859.265A.5.5 0 0117.5 9v2a.5.5 0 01-.43.495l-1.858.266c-.079.234-.173.46-.282.68l1.127 1.502a.5.5 0 01-.047.653l-1.414 1.414a.5.5 0 01-.653.047L12.44 14.93a5.484 5.484 0 01-.68.282l-.265 1.859A.5.5 0 0111 17.5H9a.5.5 0 01-.495-.43l-.266-1.858a5.485 5.485 0 01-.68-.282l-1.502 1.127a.5.5 0 01-.653-.047L3.99 14.596a.5.5 0 01-.047-.653L5.07 12.44a5.467 5.467 0 01-.282-.68l-1.859-.265A.5.5 0 012.5 11V9a.5.5 0 01.43-.495l1.858-.266c.079-.234.173-.46.282-.68L3.943 6.058a.5.5 0 01.047-.653L5.404 3.99a.5.5 0 01.653-.047L7.56 5.07c.218-.109.445-.203.68-.282l.265-1.859zm5.834 9.556l-.433-.25c.188-.328.337-.682.438-1.056a.5.5 0 01.412-.364l1.744-.25V9.434l-1.744-.25a.5.5 0 01-.412-.364 4.472 4.472 0 00-.438-1.057.5.5 0 01.033-.549l1.058-1.41-.801-.8-1.41 1.057a.5.5 0 01-.55.033 4.47 4.47 0 00-1.056-.438.5.5 0 01-.364-.412l-.25-1.744H9.434l-.25 1.744a.5.5 0 01-.364.412 4.47 4.47 0 00-1.057.438.5.5 0 01-.549-.033l-1.41-1.058-.8.801 1.057 1.41a.5.5 0 01.033.55 4.47 4.47 0 00-.438 1.056.5.5 0 01-.412.364l-1.744.25v1.132l1.744.25a.5.5 0 01.412.364c.101.374.25.728.438 1.057a.5.5 0 01-.033.549l-1.058 1.41.801.8 1.41-1.057a.5.5 0 01.55-.033c.328.188.682.337 1.056.438a.5.5 0 01.364.412l.25 1.744h1.132l.25-1.744a.5.5 0 01.364-.412 4.49 4.49 0 001.057-.438.5.5 0 01.549.033l1.41 1.058.8-.801-1.057-1.41.4-.3z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M7.5 10a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM10 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                                </svg>
                            </NavigateButton>
                            <NavigateButton customClassName='dashboard-button' pathTo={'/fullscreen'} type={'fullscreenChef'} value={this.props.options.value} selected={this.props.options.chef}>
                                View Image Full Screen
                                <svg className="bi bi-arrows-fullscreen" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5zm4.5 7.5a.5.5 0 00-.5.5v3.5H12a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.146 11.11a.5.5 0 000 .708l4.5 4.5a.5.5 0 00.708-.707l-4.5-4.5a.5.5 0 00-.708 0zM3.682 3.646a.5.5 0 000 .708l4.5 4.5a.5.5 0 10.707-.708l-4.5-4.5a.5.5 0 00-.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.5 4a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v4a.5.5 0 001 0V4.5H8a.5.5 0 00.5-.5z" clipRule="evenodd" />
                                </svg>

                            </NavigateButton>
                            <NavigateButton customClassName='dashboard-button' pathTo={'/familyhome'} type={'familyHome'} value={this.props.options.value} selected={this.props.options.chef}>
                                View families
                                <svg className="bi bi-people" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M17 16s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002zM9.022 15h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C15.688 12.629 14.718 12 13 12c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002zM13 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm-7.064 4.28a5.873 5.873 0 00-1.23-.247A7.334 7.334 0 007 11c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 017 15c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM6.92 12c-1.668.02-2.615.64-3.16 1.276C3.163 13.97 3 14.739 3 15h3c0-1.045.323-2.086.92-3zM3.5 7.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                                </svg>
                            </NavigateButton>
                            {/* {
                                privateStatus ? <svg className="bi bi-person-fill" onClick={this.toggleinformation} width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 16s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H5zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg> : <svg className="bi bi-people-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                                    </svg>
                            } */}
                            {this.props.options.chef ?
                                <React.Fragment>
                                    <FacebookShareButton url={inviteFamilyLink}  >
                                        Share to Facebook
                                <FacebookIcon size={35} />
                                    </FacebookShareButton>
                                    <EmailShareButton url={inviteFamilyLink}  >
                                        Share by Email
                                <EmailIcon size={45} />
                                    </EmailShareButton>
                                    <WhatsappShareButton url={inviteFamilyLink}>
                                        Share by Whatsapp
                                <WhatsappIcon size={35} />
                                    </WhatsappShareButton>
                                </React.Fragment>
                                : null}
                        </div>
                        : null}
                </div>
            </div>
        </div>
    }
}

export default withRouter(RecipeOptions);





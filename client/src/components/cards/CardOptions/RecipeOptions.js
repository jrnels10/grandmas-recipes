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
import { NavigateButton } from './../../tools/Buttons'

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
        const { value, image, recipe } = this.props.options;
        const privateStatus = this.props.options.private;
        const inviteFamilyLink = `${window.location.origin}/familychef/${recipe._id}`;
        const { options } = this.state;
        return <div className={`${this.props.className}`} >
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
                        <div className={`container-fluid options-display`}>
                            <NavigateButton customClassName='recipe-option-button' pathTo={'/updateRecipe'} type={'editRecipe'} value={value} selected={recipe}>
                                Edit
                                <svg className="bi bi-gear" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8.505 2.93A.5.5 0 019 2.5h2a.5.5 0 01.495.43l.266 1.858c.234.079.46.173.68.282l1.502-1.127a.5.5 0 01.653.047l1.414 1.414a.5.5 0 01.047.653L14.93 7.56c.109.218.203.445.282.68l1.859.265A.5.5 0 0117.5 9v2a.5.5 0 01-.43.495l-1.858.266c-.079.234-.173.46-.282.68l1.127 1.502a.5.5 0 01-.047.653l-1.414 1.414a.5.5 0 01-.653.047L12.44 14.93a5.484 5.484 0 01-.68.282l-.265 1.859A.5.5 0 0111 17.5H9a.5.5 0 01-.495-.43l-.266-1.858a5.485 5.485 0 01-.68-.282l-1.502 1.127a.5.5 0 01-.653-.047L3.99 14.596a.5.5 0 01-.047-.653L5.07 12.44a5.467 5.467 0 01-.282-.68l-1.859-.265A.5.5 0 012.5 11V9a.5.5 0 01.43-.495l1.858-.266c.079-.234.173-.46.282-.68L3.943 6.058a.5.5 0 01.047-.653L5.404 3.99a.5.5 0 01.653-.047L7.56 5.07c.218-.109.445-.203.68-.282l.265-1.859zm5.834 9.556l-.433-.25c.188-.328.337-.682.438-1.056a.5.5 0 01.412-.364l1.744-.25V9.434l-1.744-.25a.5.5 0 01-.412-.364 4.472 4.472 0 00-.438-1.057.5.5 0 01.033-.549l1.058-1.41-.801-.8-1.41 1.057a.5.5 0 01-.55.033 4.47 4.47 0 00-1.056-.438.5.5 0 01-.364-.412l-.25-1.744H9.434l-.25 1.744a.5.5 0 01-.364.412 4.47 4.47 0 00-1.057.438.5.5 0 01-.549-.033l-1.41-1.058-.8.801 1.057 1.41a.5.5 0 01.033.55 4.47 4.47 0 00-.438 1.056.5.5 0 01-.412.364l-1.744.25v1.132l1.744.25a.5.5 0 01.412.364c.101.374.25.728.438 1.057a.5.5 0 01-.033.549l-1.058 1.41.801.8 1.41-1.057a.5.5 0 01.55-.033c.328.188.682.337 1.056.438a.5.5 0 01.364.412l.25 1.744h1.132l.25-1.744a.5.5 0 01.364-.412 4.49 4.49 0 001.057-.438.5.5 0 01.549.033l1.41 1.058.8-.801-1.057-1.41.4-.3z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M7.5 10a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM10 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                                </svg>
                            </NavigateButton>
                            <NavigateButton customClassName='recipe-option-button' pathTo={'/fullscreen'} type={'fullscreenRecipe'} value={value} selected={{ image }}>
                                View Image Full Screen
                                <svg className="bi bi-arrows-fullscreen" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5zm4.5 7.5a.5.5 0 00-.5.5v3.5H12a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M11.146 11.11a.5.5 0 000 .708l4.5 4.5a.5.5 0 00.708-.707l-4.5-4.5a.5.5 0 00-.708 0zM3.682 3.646a.5.5 0 000 .708l4.5 4.5a.5.5 0 10.707-.708l-4.5-4.5a.5.5 0 00-.707 0z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M8.5 4a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v4a.5.5 0 001 0V4.5H8a.5.5 0 00.5-.5z" clipRule="evenodd" />
                                </svg>

                            </NavigateButton>

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





import React, { Component } from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon
} from "react-share";
import Slider from "react-slick";


class Family extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const settings = {
            arrows: true,
            dots: false,
            infinite: true,
            autoPlay: true,
            speed: 500,
            className: "family-slider",
            slidesToShow: this.props.myFamilies.length > 1 ? 2 : 1
        };
        return <Slider {...settings}>
            {this.props.myFamilies.map((family, idx) => {
                const { familyName, familyMembers, familyBio, familyId } = family;
                const inviteFamilyLink = `${window.location.origin}/familyinvite/${this.props.user._id}/${familyId}`;
                return <div key={idx} className="card family-card " style={{ width: "18rem" }}>
                    {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
                    <div className="card-body">
                        <h5 className="card-title">{familyName}</h5>
                        <p className="card-text">{familyMembers.length} family members</p>
                        <p className="card-text">{familyBio}</p>
                    </div>
                    <React.Fragment>
                        <FacebookShareButton url={inviteFamilyLink}  >
                            Share to Facebook
                                <FacebookIcon size={25} />
                        </FacebookShareButton>
                        <EmailShareButton url={inviteFamilyLink}  >
                            Share by Email
                                <EmailIcon size={35} />
                        </EmailShareButton>
                        <WhatsappShareButton url={inviteFamilyLink}>
                            Share by Whatsapp
                                <WhatsappIcon size={25} />
                        </WhatsappShareButton>
                    </React.Fragment>
                </div>
            })}
        </Slider>
    }
}

export default Family;
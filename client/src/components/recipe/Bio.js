import React, { Component } from 'react';

class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = { showBio: false }
    }
    componentDidMount() {
        let that = this;
        setTimeout(function () {
            that.setState({ showBio: true })
        }, 300)
    }
    render() {
        const { chefName, biography, chefImage } = this.props;

        return <div className={`ingredients-container ${this.state.showBio}-ingredients`}>
            <div className="chef-biography">
                {/* <img src={chefImage} /> */}
                <p>{biography}</p>
            </div>
        </div>
    }
}

export default Bio;
import React, { Component } from 'react';

class ViewImage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <img className='full-screen-image' onClick={this.props.hideImage} src={this.props.image} />
    }
}

export default ViewImage;
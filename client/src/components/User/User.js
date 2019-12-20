import React, { Component } from 'react';
import moment from 'moment';

import './user.css';

export default class Profile extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            users: []
        };
    }

    async componentWillMount() {

    }

    findUsers = (id) => {
        console.log(id)
    }

    render() {
        const users = this.state.users;
        return (
            <div className="">
                Profile
            </div>)
    }
};

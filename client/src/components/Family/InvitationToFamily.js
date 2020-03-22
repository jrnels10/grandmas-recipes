import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { findMyUser, secret } from './../../API/UserAPI';
import { findMyFamily, addNewfamilyMember } from './../../API/FamilyAPI';

class InviteConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: true
        }
    }
    async componentDidMount() {
        const string = window.location.pathname
        var ids = string.split('/');
        const res = await secret();
        const user = await findMyUser(ids[2]);
        const family = await findMyFamily(ids[3]);
        this.setState({ currentUser: res.data.profile.id, user: user, family: family.data });
    };

    addUser = async (accept) => {
        if (accept) {
            const res = await addNewfamilyMember(this.state.currentUser, {
                "familyId": this.state.family._id,
                "newFamilyMember": this.state.user.data._id
            });
            return res.status === 200 ? this.props.history.push('/dashboard') :
                res.error ? this.setState({ error: res.error }) : null;
        } else {
            this.setState({ question: false })
        }
    }
    render() {
        return <PageWrapper>
            <div className='invitation-div'>

                <h4>Welcome to Family Recipes</h4>
                {this.state.user ? <span>{this.state.user.data[this.state.user.data.method].firstName} would like you to join family, {this.state.family.familyName}</span> : null}

                {this.state.question ? <React.Fragment>
                    <h4>Would you like to join?</h4>
                    <button onClick={this.addUser.bind(this, true)}>Yes</button>
                    <button onClick={this.addUser.bind(this, false)}>No</button></React.Fragment> : <h1>You suck!</h1>}
                {this.state.error ? <span className='text-danger'>{this.state.error}</span> : null}
            </div>
        </PageWrapper>
    }
}

export default InviteConfirm;
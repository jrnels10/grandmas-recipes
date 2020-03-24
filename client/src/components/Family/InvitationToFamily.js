import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { Consumer } from '../../Context';
import { withRouter } from 'react-router-dom';
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

    addUser = async (accept, dispatch) => {
        dispatch({ type: "LOADER", payload: { display: true } });
        if (accept) {
            const res = await addNewfamilyMember(this.state.currentUser, {
                "familyId": this.state.family._id,
                "newFamilyMember": this.state.user.data._id
            });
            dispatch({ type: "LOADER", payload: { display: false } });
            this.props.history.push('/dashboard')
        } else {
            this.setState({ question: false })
        }
    }
    render() {
        return <Consumer>
            {value => {
                return <PageWrapper>
                    <div className='invitation-div text-center'>

                        <h4>Welcome to Family Recipes! A place where you can share family recipes with your family members, relatives and friends .</h4>
                        {this.state.user ? <h4>{this.state.user.data[this.state.user.data.method].firstName} has created a family to store and share recipes and they would like you to join their family, {this.state.family.familyName}</h4> : null}

                        {this.state.question ? <div className="w-100 text-center">
                            <h4>Would you like to join?</h4>
                            <button className='btn signin-button w-75 mt-3 text-center m-auto' onClick={this.addUser.bind(this, true, value.dispatch)}>Yes</button>
                            <button className='btn signin-button w-75 mt-3 text-center m-auto' onClick={this.addUser.bind(this, false, value.dispatch)}>No</button>
                        </div> :
                            <div className="w-100 text-center">
                                <h4>Ok... no hard feelings. We will just let {this.state.user.data[this.state.user.data.method].firstName} that you did not want to be a part of their family. I'm sure they'll understand.</h4>
                                <button className='btn signin-button w-75 mt-3 text-center m-auto' onClick={this.addUser.bind(this, true)}>On second thought... Yes!!!</button>
                                <button className='btn signin-button w-75 mt-3 text-center m-auto' onClick={this.addUser.bind(this, false)}>No! {this.state.user.data[this.state.user.data.method].firstName} is no family of mine</button>
                            </div>

                        }
                        {this.state.error ? <span className='text-danger'>{this.state.error}</span> : null}
                    </div>
                </PageWrapper>
            }}
        </Consumer >
    }
}

export default withRouter(InviteConfirm);
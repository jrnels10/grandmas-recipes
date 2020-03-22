import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { createFamily } from '../../API/FamilyAPI';
import { withRouter } from 'react-router-dom';


class CreateFamily extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: false })
    }

    upload = async (e) => {
        let res;

        const newFamily = {
            familyOwnerName: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
            familyOwner: this.props.data.user.id,
            chefName: this.props.data.selected.chefName,
            chefId: this.props.data.selected.chefId,
            familyBio: this.state.familyBio,
            submittedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
            familyName: this.state.familyName
        };
        const json = JSON.stringify(newFamily);
        let bodyFormData = new FormData();
        bodyFormData.append('picture', null);
        bodyFormData.append('myFamily', json);
        const { dispatch } = this.props.data;
        dispatch({ type: "LOADER", payload: { display: true } });

        res = await createFamily(this.props.data.user.id, bodyFormData);

        if (res.status === 200) {
            dispatch({ type: "LOADER", payload: { display: false } });
            // dispatch({ type: 'ADDED_MY_RECIPE', payload: { user: res.data } })
            this.setState({ updated: true });
            this.props.cancel()
        }
        else if (res.error) {
            this.setState({ error: true, errorKey: res.error.details[0].path[0] })
            dispatch({ type: "LOADER", payload: { display: false } });
        };
    };

    cancel = () => {
        this.props.cancel()
    }
    render() {
        return <div className='addrecipe-container'>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Family Name</label>
                <input type="text" className="sign-input w-100" aria-label="Sizing example input" ref="familyNameDiv" placeholder="Type family name here" tabIndex={0} name='familyName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                <hr className='sign-underline' />
                {this.state.errorKey === 'familyName' ? <p className="text-danger">required</p> : null}
            </div>
            <div className="input-group input-group-sm mb-3">
                <label className="sign-input-label" htmlFor="exampleInputEmail1">Family Biography</label>
                <textarea rows="4" cols="50" type="text" className="sign-input" id="familyBio" placeholder="A story about the family" aria-label="Sizing example input" ref="familyBioDiv" tabIndex={0} name='familyBio' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
            </div>
            <button className="btn w-100 signin-button" onClick={this.upload}>Create Family</button>
            <button className="btn btn-danger mt-2 w-100 " onClick={this.cancel}>Cancel</button>

            {/* <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Families</label>
                    {families.length > 0 ? <select className="col-4 custom-select custom-select-sm"
                        name="familyName"
                        value={this.state.selectSectionValue}
                        onChange={this.onSelectedText.bind(this)}>
                        {families.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select> : null}
                    <input type="text" className="sign-input w-100" placeholder="Family Name" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='familyName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                    <hr className='sign-underline' />
                </div> */}

        </div >
    }
}

export default withRouter(CreateFamily);
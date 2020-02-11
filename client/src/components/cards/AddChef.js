import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { addNewChef } from '../../API/ChefAPI';
import { withRouter } from 'react-router-dom';

// import './../recipe/addrecipe.css';

class AddChef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSubmitted: new Date(),
            submittedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`
        }
    }

    componentDidMount() {
        this.focusDiv();

    }

    focusDiv() {
        this.refs.theDiv.focus();
    }

    onSelected = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    upload = async (e) => {
        const { dispatch } = this.props.data;
        dispatch({ type: "LOADER", payload: { display: true } });
        const json = JSON.stringify(this.state);
        var bodyFormData = new FormData();
        bodyFormData.append('picture', this.state.chefImage);
        bodyFormData.append('myChef', json);
        bodyFormData.append('private', true);
        try {
            const res = await addNewChef(bodyFormData, this.props.data.user.id).catch(error => {
                console.log('error:', error)
                dispatch({ type: "LOADER", payload: { display: false } });
            });
            if (res.status === 200) {
                dispatch({ type: "LOADER", payload: { display: false } });
                dispatch({ type: 'ADDED_MY_RECIPE', payload: { user: res.data } })
                this.setState({ updated: true });
                this.props.history.push('/dashboard');
            }
            else if (res.status === 400) {
                console.log('403 error')

                dispatch({ type: "LOADER", payload: { display: false } });
            }
        } catch (error) {
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    render() {
        let families = [];
        return <PageWrapper>
            <div className='addrecipe-container'>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Chef Name</label>
                    <input type="text" className="sign-input" aria-label="Sizing example input" ref="theDiv" placeholder="Grandma Nelson" tabIndex={0} name='chefName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                    <hr className='sign-underline' />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Families</label>
                    {families.length > 0 ? <select className="col-4 custom-select custom-select-sm"
                        name="familyName"
                        value={this.state.selectSectionValue}
                        onChange={this.onSelectedText.bind(this)}>
                        {families.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select> : null}
                    <input type="text" className="sign-input" placeholder="Family Name" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='familyName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                    <hr className='sign-underline' />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Chef Portrait</label>
                    <input className="sign-input addrecipe-custom-file-input" type="file" name='chefImage' onChange={this.onSelected.bind(this)} />

                </div>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Biography</label>
                    <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="Biography about the chef" aria-label="Sizing example input" ref="theDiv" tabIndex={0} name='chefBio' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <button className="btn w-100 signin-button" onClick={this.upload}>Save Chef</button>
            </div >
        </PageWrapper >
    }
}

export default withRouter(AddChef);
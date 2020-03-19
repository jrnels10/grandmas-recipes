import React, { Component } from 'react';
import PageWrapper from '../tools/PageWrapper';
import { addNewChef, updateMyChef, deleteMyChef } from '../../API/ChefAPI';
import { withRouter } from 'react-router-dom';

// import './../recipe/addrecipe.css';

async function chefNew(state, props) {
    const { chefImage, chefName, chefBio, familyName, submittedBy, dateSubmitted, update } = state;
    const newChef = { chefName, chefBio, familyName, submittedBy, dateSubmitted }
    const { dispatch } = props;
    dispatch({ type: "LOADER", payload: { display: true } });
    const json = JSON.stringify(newChef);
    var bodyFormData = new FormData();
    bodyFormData.append('picture', chefImage);
    bodyFormData.append('myChef', json);
    bodyFormData.append('private', true);
    return bodyFormData
}

async function updateChef(state, props) {
    const { chefId, chefImage, chefName, chefBio, familyName, updatedBy, dateUpdated } = state;
    const updatedChef = { chefId, chefName, chefBio, familyName, updatedBy, dateUpdated };
    const json = JSON.stringify(updatedChef);
    var bodyFormData = new FormData();
    bodyFormData.append('picture', chefImage);
    bodyFormData.append('myChef', json);
    bodyFormData.append('private', true);
    return bodyFormData
}

class AddChef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false
        }
    }

    componentDidMount() {
        this.focusDiv();
        console.log("add chef mounted")
        if (this.props.data.selected.chef) {
            const { chefName, chefBio, chefId, familyName } = this.props.data.selected.chef;
            this.setState({
                chefName: chefName,
                chefBio: chefBio,
                chefId: chefId,
                dateUpdated: new Date(),
                updatedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
                update: true
            });
            this.refs.chefNameDiv.value = chefName;
            this.refs.chefBioDiv.value = chefBio;
        } else {
            this.setState({
                dateSubmitted: new Date(),
                submittedBy: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
                update: false
            })
        }
    }

    focusDiv() {
        this.refs.chefNameDiv.focus();
    }

    onSelected = (e) => {
        this.setState({ [e.target.name]: e.target.files[0], error: false })
    }

    onSelectedText = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: false })
    }

    upload = async (e) => {
        let res;
        const { update } = this.state;
        const { dispatch } = this.props.data;
        dispatch({ type: "LOADER", payload: { display: true } });
        if (update) {
            res = await updateMyChef(await updateChef(this.state, this.props.data.selected.chef), this.props.data.user.id);
        } else {
            res = await addNewChef(await chefNew(this.state, this.props.data), this.props.data.user.id);
        }
        if (res.status === 200) {
            dispatch({ type: "LOADER", payload: { display: false } });
            dispatch({ type: 'ADDED_MY_RECIPE', payload: { user: res.data } })
            this.setState({ updated: true });
            this.props.history.push('/familychefs');
        }
        else if (res.error) {
            this.setState({ error: true, errorKey: res.error.details[0].path[0] })
            dispatch({ type: "LOADER", payload: { display: false } });
        };
    };

    delete = async () => {
        const res = await deleteMyChef(this.state.chefId, this.props.data.user.id);
        if (res.status === 200) {
            this.props.history.push('/familychefs');
        } else if (res.error) {
            console.log(res)
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal, error: false })
    }
    render() {
        let families = [];
        return <PageWrapper>
            <div className='addrecipe-container'>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Chef Name</label>
                    <input type="text" className="sign-input w-100" aria-label="Sizing example input" ref="chefNameDiv" placeholder="Grandma Nelson" tabIndex={0} name='chefName' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                    <hr className='sign-underline' />
                    {this.state.errorKey === 'chefName' ? <p className="text-danger">required</p> : null}
                </div>

                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Chef Portrait</label>
                    <input className="sign-input addrecipe-custom-file-input" type="file" name='chefImage' onChange={this.onSelected.bind(this)} />

                </div>
                <div className="input-group input-group-sm mb-3">
                    <label className="sign-input-label" htmlFor="exampleInputEmail1">Biography</label>
                    <textarea rows="4" cols="50" type="text" className="sign-input" id="addrecipe-instructions" placeholder="Biography about the chef" aria-label="Sizing example input" ref="chefBioDiv" tabIndex={0} name='chefBio' aria-describedby="inputGroup-sizing-sm" onChange={this.onSelectedText.bind(this)} />
                </div>
                <button className="btn w-100 signin-button" onClick={this.upload}>Save Chef</button>
                {this.state.update ? <button className="btn btn-danger mt-2 w-100 " onClick={this.delete}>Delete Chef</button> : null}
            </div >
        </PageWrapper >
    }
}

export default withRouter(AddChef);
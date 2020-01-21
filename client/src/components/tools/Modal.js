import React, { Component } from 'react';
import './modal.css'
// display, name, closeAction, children
class ModalRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // display, name closeAction, children
        console.log(this.props)
        return <div className={`modal ingredient-modal-${this.props.display}`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLongTitle">{this.props.name}</h6>
                        <button type="button" className="close" onClick={this.props.closeAction}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body row w-100 m-0">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeAction}>{this.props.closeActionName ? this.props.closeActionName : 'Save'}</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ModalRecipes;
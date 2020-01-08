import React, { Component } from 'react';
import './pagewrapper.css';
import { withRouter } from 'react-router-dom';
class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    backPage = () => {
        this.props.history.goBack()
    }
    render() {
        console.log(this.props.history)
        return <div className="page-wrapper-container">
            {/* <svg className="bi bi-arrow-left" onClick={this.backPage} width="50px" height="40px" viewBox="0 0 20 20" fill="#877785" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
            </svg> */}
            {/* <svg class="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clip-rule="evenodd" />
            </svg> */}
            {this.props.children}
        </div>
    }
}

export default withRouter(PageWrapper);
import React, { Component } from 'react';
import { Consumer } from '../../Context';
import PageWrapper from '../tools/PageWrapper';
import FamilyCard from './FamilyCard';

import './family.css'
import CreateFamily from './CreateFamily';

class FamilyHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createFamily: false
        }
    }
    toggleDiv = () => {
        this.setState({ createFamily: !this.state.createFamily })
    }

    render() {
        return <Consumer>
            {value => {
                return <PageWrapper>
                    <h4>My Families</h4>
                    <FamilyCard myFamilies={value.user.families} user={value.user} />
                    {this.state.createFamily ? null : <div className="w-100 text-center">
                        <button className='btn signin-button w-75 mt-3 text-center m-auto' onClick={this.toggleDiv}>Create new family</button>
                    </div>
                    }
                    {this.state.createFamily ?
                        <CreateFamily data={value} cancel={this.toggleDiv} />
                        : null}
                </PageWrapper>
            }
            }
        </Consumer >
    }
}

export default FamilyHome;
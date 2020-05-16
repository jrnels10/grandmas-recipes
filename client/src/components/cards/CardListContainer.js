import React, { Component } from 'react';
import ChefCardMini from './CardMini/ChefCardMini';

import { NavigateButton } from '../tools/Buttons';

class CardListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedRecipes: []
        }
    }


    render() {
        const { children, value } = this.props;
        return children ?
            <React.Fragment>

                {children.map((chef, idx) => {
                    const families = value.user.families.filter(family => {
                        return chef.chefId === family.chefId
                    });
                    return <ChefCardMini key={idx} chef={chef} value={value} families={families} />
                })}
            </React.Fragment>
            : <NavigateButton pathTo={'/addnewchef'}>Add new Chef</NavigateButton>
    }
}

export default CardListContainer;
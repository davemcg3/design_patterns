import React from 'react';
import PortfolioValue from './PortfolioValue.js';
import Instructions from './Instructions.js';

class Subheader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              { this.props.cards.length > 0 ? <PortfolioValue cards={this.props.cards} isNumeric={this.props.isNumeric} /> : <Instructions /> }
            </div>
        );
    }
}

export default Subheader;

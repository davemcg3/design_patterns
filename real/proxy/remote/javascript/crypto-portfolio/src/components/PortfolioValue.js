import React from 'react';

class PortfolioValue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Portfolio Value: { this.props.cards.map( card => (this.props.isNumeric(card.value)) ? card.value : 0 ).reduce(function (
                      accumulator,
                      currentValue,
                      currentIndex,
                      array
                    ) {
                      return accumulator + currentValue;
                    }).toLocaleString("us-US", { style: "currency", currency: "USD" }) }</h2>
            </div>
        );
    }
}

export default PortfolioValue;

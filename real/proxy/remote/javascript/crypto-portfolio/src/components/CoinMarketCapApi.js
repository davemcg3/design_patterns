import React from 'react';

class CoinMarketCapApi extends React.Component {

  constructor(props) {
    super(props);
    console.log('api props: ' + props);
    console.log(props);
    console.log(props.cards);
    this.state = {
      cards: props.cards
    };
    console.log(this.state.cards);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {this.state.cards.map((item, i) => (
          <p>{i}: {item["currency"]} {item["quantity"]}</p>
        ))}
      </div>
    );
  }

}

export default CoinMarketCapApi;

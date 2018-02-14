import React from 'react';

class CoinMarketCapApi extends React.Component {

  constructor(props) {
    super(props);
    // console.log('api props: ' + props);
    // console.log(props);
    // console.log(props.cards);
    this.state = {
      cards: props.cards,
      prices: [],
      priceList: {}
    };
    // console.log(this.state.cards);
    this.getCORS();
  }

  getCORS() {
    var self = this;
    var url = "https://api.coinmarketcap.com/v1/ticker/";
    // console.log('sending request...');
    var xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9 //untested by me because I don't have to support IE right now
    xhr.open('GET', url);
    xhr.onloadend = function() { self.handleResponse(xhr) };
    xhr.send();
  }

  handleResponse(xhr) {
    var self = this;
    // console.log('handling response for ', xhr);
    // var response = xhr.response || xhr.responseText; //TODO: double check what you get with IE. I think the || is not what I want
    if (xhr.readyState===4) {
      // console.log('response received');
      this.setState({priceList: JSON.parse(xhr.response)});
      // console.log(this.state.priceList);
      this.setPricesOnCards(this.state.cards);

      setTimeout(this.getCORS.bind(this), 300000);
    }
    // should deal with failure states too at some point
  }

  setPricesOnCards(cards) {
    var self = this;
    // console.log('running api.setPricesOnCards');
    // console.log(cards);

    this.setState({cards: cards}, function() {
      var arr = [];
      // console.log(this.state.cards);
      this.state.cards.forEach(function(card) {
        // console.log(card);
        var cardLocation = self.state.cards.indexOf(card);
        // console.log('card: ' + cardLocation);
        // console.log('currency: ' + card.currency);
        var result = self.props.search(self.state.priceList, card.currency, ['id', 'name', 'symbol']);
        // console.log('result: ', result);
        if (result !== undefined) {
          card = Object.assign({}, card, {price: parseFloat(result.price_usd)});
        } else {
          card = Object.assign({}, card, {price: 'Could not find coin'});
        }
        card = self.calculateValueOnCard(card);
        card = self.setTitleOnCard(card, result);
        console.log(card);

        self.state.cards[cardLocation] = card;
        if (result) arr.push(result);
      });
      this.setState({prices: arr});

      // console.log(this.state);
      this.props.callback(this.state.cards);
    });
  }

  calculateValueOnCard(card) {
    var value = (this.props.isNumeric(card.price)) ? card.quantity * card.price : 'Could not determine value';
    card = Object.assign({}, card, {value: value});
    return card;
  }

  setTitleOnCard(card, remoteReturn) {
    if (remoteReturn !== undefined){
      console.log('remoteReturn:', remoteReturn);
      card = Object.assign({}, card, {displayTitle: (remoteReturn.name + ' (' + remoteReturn.symbol + ')')});
      console.log(card.displayTitle);
    }
    return card;
  }

  render() {
    return (
      <div>
        {/* <h1>Hello</h1>
        {this.state.cards.map((item, i) => (
          <p>{i}: {item["currency"]} {item["quantity"]} {item["price"]}</p>
        ))} */}
      </div>
    );
  }

}

export default CoinMarketCapApi;

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import CryptoCard from './CryptoCard'
import CoinMarketCapApi from './CoinMarketCapApi';
import Fab from './Fab.js'
import logo from '../logo.svg';

class LayoutTest extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        drawerActive: false,
        drawerPinned: false,
        sidebarPinned: false,
        cards: []
      };
      // this.addCard = this.addCard.bind(this);
      this.retrieve();
    }

    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    }

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }

    toggleSidebar = () => {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    }

    addCard = (settings) => {
      this.setState({ cards: this.state.cards.concat([
      {
        currency: settings.currency,
        quantity: settings.quantity,
        price: '',
        value: ''
      }
      ])}, function () {
        // console.log(this.state.cards);
        this.refs.api.setPricesOnCards(this.state.cards);
      });
    }

    updateCards = (cards) => {
      // console.log('in the layout callback, cards:', cards);
      this.setState(cards: cards);
    }

    reconfigureCard = (card) => {
      var result = this.search(this.state.cards, card.currency, 'currency');
      result.quantity = card.quantity;
      // force re-render
      this.setState(this.state);
    }

    search(source, name, field_to_check) {
        var results;

        name = name.toUpperCase();
        // console.log(field_to_check);
        // results = source.filter(function(entry) {
        // filter was inefficient because it would keep checking even if it found a result
        for (var j = 0; j < source.length; j++ ) {
          // want to check other fields besides just id
          // console.log('(' + (field_to_check instanceof Array) + '): ', field_to_check);
          // because `typeof(field_to_check)` returns object instead of Array, even though it's an Array
          if (field_to_check instanceof Array){
            var arr = [];
            // field_to_check.forEach(function(field) {
            // can't early exit a forEach without throwing an exception
            for (var i = 0; i < field_to_check.length; i++) {
              // console.log(field_to_check[i] + ': ' + source[j][field_to_check[i]]);
              if (source[j][field_to_check[i]].toUpperCase() === name) {
                return source[j];
              }
            }
            // return (arr.length > 0) ? arr : false;
          } else {
            if (source[j][field_to_check].toUpperCase() === name) {
              return source[j];
            }
          }
        }
        // console.log('filtered:', results);
        // return results[0];
    }

    componentDidUpdate() {
      this.store();
    }

    store() {
      if(typeof(Storage) !== "undefined") {
        // console.log(this.state.cards);
        localStorage.cards = JSON.stringify(this.state.cards);
      } else {
        console.log('Sorry, can\'t find a place to store your data!');
      }
    }

    retrieve () {
      if(typeof(Storage) !== "undefined") {
        if (localStorage.cards !== undefined) {
          // console.log("(" + typeof(localStorage.cards) + ") " + localStorage.cards);
          // this.setState({cards: localStorage.cards});
          this.state.cards = JSON.parse(localStorage.cards);
        }
      }
    }

    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }




    render() {
        return (
            <Layout>
                <NavDrawer active={this.state.drawerActive}
                    pinned={this.state.drawerPinned} permanentAt='xxxl'
                    onOverlayClick={ this.toggleDrawerActive }>
                    <p>
                        Navigation, account switcher, etc. go here.
                    </p>
                </NavDrawer>
                <Panel>
                    {/* <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } /> */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                      <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Crypto Portfolio</h1>
                      </header>
                      <p className="App-intro">
                        To get started, add a Card with your crypto and amount.
                      </p>
                      <h2>
                        Portfolio Value: { this.state.cards.map( card => (this.isNumeric(card.value)) ? card.value : 0 ).reduce(function (
                                            accumulator,
                                            currentValue,
                                            currentIndex,
                                            array
                                          ) {
                                            return accumulator + currentValue;
                                          }).toLocaleString('us-US', { style: 'currency', currency: 'USD' }) }</h2>
                      {/*<Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />*/}
                      {/*<Checkbox label='Show sidebar' checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />*/}
                      <div id="cardHolder">
                        {
                          this.state.cards.map((item, i) => (
                              <CryptoCard key={i} settings={item} reconfigureCard={this.reconfigureCard}/>
                          ))
                        }
                      </div>
                    </div>
                    <Fab callback={this.addCard}></Fab>
                    <CoinMarketCapApi cards={this.state.cards} callback={this.updateCards} ref="api" search={this.search} isNumeric={this.isNumeric}/>
                </Panel>
                <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
                    <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
                    <div style={{ flex: 1 }}>
                        <p>Supplemental content goes here.</p>
                    </div>
                </Sidebar>
            </Layout>
        );
    }
}

export default LayoutTest;

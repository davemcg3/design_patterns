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
        cards: [{ currency: 'Ripple', quantity: 1 }]
      };
      // this.addCard = this.addCard.bind(this);
    }

    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }

    toggleSidebar = () => {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    };

  addCard = (settings) => {
      this.setState({ cards: this.state.cards.concat([
      {
        currency: settings.currency,
        quantity: settings.quantity
      }
      ])});
    };


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
                    <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } />
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                      <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Crypto Portfolio</h1>
                      </header>
                      <p className="App-intro">
                        To get started, add a Card with your crypto and amount.
                      </p>
                      {/*<Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />*/}
                      {/*<Checkbox label='Show sidebar' checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />*/}
                      <div id="cardHolder">
                        {
                          this.state.cards.map((item, i) => (
                              <CryptoCard key={i} settings={item}/>
                          ))
                        }
                      </div>
                    </div>
                    <Fab callback={this.addCard}></Fab>
                    <CoinMarketCapApi cards={this.state.cards}/>
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

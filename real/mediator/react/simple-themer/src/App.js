import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js'
import Header from "./Header.js";
import Footer from "./Footer.js";
import Mediator from "./Mediator.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.registerWithMediator = this.registerWithMediator.bind(this);
    this.sendMessageToPeers = this.sendMessageToPeers.bind(this);
  }

  registerWithMediator(peer) {
    if (this.mediator === undefined)
      window.setTimeout(this.registerWithMediator.bind(null, peer),200); // this is a hack, use a lifecycle method!
    else
      this.mediator.registerPeer(peer)
  }

  sendMessageToPeers(message) {
    if (this.mediator === undefined)
      window.setTimeout(this.sendMessageToPeers.bind(null, message),200);
    else
      this.mediator.sendMessageToPeers(message)
  }

  render() {
    return (
      <div className="App">
        <Mediator ref={instance => { this.mediator = instance; }} />
        <Header registerWithMediator={this.registerWithMediator} sendMessageToPeers={this.sendMessageToPeers} />
        <div className="row">
          <Navigation registerWithMediator={this.registerWithMediator} sendMessageToPeers={this.sendMessageToPeers} />
          <div className="App-intro">
            <h1>Bacon Ipsum</h1>
            <p>Bacon ipsum dolor amet kevin shank pork frankfurter cow biltong bacon. Filet mignon brisket beef ribs ham. T-bone sausage pork chop spare ribs leberkas rump. Strip steak pork belly fatback frankfurter beef meatball. Buffalo ribeye alcatra capicola, biltong shoulder ground round turducken beef ribs sausage. Beef ribs tri-tip ribeye kevin boudin kielbasa.</p>

            <p>Jerky ball tip short ribs cupim, chuck shoulder shankle cow chicken beef spare ribs ribeye swine. Porchetta jowl filet mignon capicola, biltong ham tongue fatback ham hock. Pork loin filet mignon andouille, burgdoggen beef porchetta tenderloin chuck pig corned beef jowl. Bresaola tongue sausage, pork belly flank meatball chuck corned beef turducken doner boudin short ribs spare ribs. Beef rump porchetta tenderloin landjaeger. Porchetta filet mignon tail cupim.</p>

            <p>Jowl tri-tip rump fatback boudin. Prosciutto fatback shankle jowl landjaeger pork loin sausage tongue brisket pork chop beef ribs salami chuck porchetta. Pig alcatra tail filet mignon shoulder pork chop drumstick biltong. Pancetta pork loin beef ribs strip steak. Meatball pancetta tongue filet mignon short ribs boudin tenderloin landjaeger chicken drumstick, cupim t-bone kielbasa. Pastrami salami ham hock, chicken buffalo bresaola corned beef pork loin brisket porchetta beef ribs ground round. Turducken bacon beef pancetta leberkas porchetta pork belly chuck burgdoggen spare ribs ham.</p>

            <p>Pastrami tail tenderloin filet mignon. Doner landjaeger turducken kielbasa pork belly. Pork belly chuck strip steak pancetta pork drumstick shank pork loin hamburger ham hock. Landjaeger jerky tongue hamburger. Ham hock shank chicken, biltong jowl pig picanha hamburger pancetta.</p>

            <p>Chicken landjaeger venison, cow tongue frankfurter kevin. Sausage tail pig, tri-tip beef kevin prosciutto boudin flank salami. Ground round pork kevin pancetta bacon capicola meatball strip steak. Capicola jerky cupim pork chop hamburger. Pork loin bresaola shoulder doner chicken, turkey pork swine prosciutto alcatra salami short loin tri-tip. Ham strip steak kevin pork belly. Spare ribs shoulder tongue ham hock pig.</p>
          </div>
        </div>
        <Footer registerWithMediator={this.registerWithMediator} sendMessageToPeers={this.sendMessageToPeers} />
      </div>
    );
  }
}

export default App;

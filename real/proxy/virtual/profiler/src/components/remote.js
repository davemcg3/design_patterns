import React, { Component } from 'react';

export default class Remote extends Component{

  componentDidMount() {
    fetch("https://www.anapioficeandfire.com/api/houses?pageSize=50")
      .then(res => res.json())
      .then (
        res => {
          // console.log(res);
          // console.log('houses: ', res);
          var exclude = ["url"];
          res.forEach(function(house){
            // console.log(house);
            for(var attribute in house){
              if (house[attribute].toString().startsWith('https://www.anapioficeandfire.com/api/')) {
                // console.log(attribute + ': (' + typeof(house[attribute]) + ') ' + house[attribute]);
                // if (typeof(house[attribute]) === "object") console.log(house[attribute]);
                if (house.name == "House Ambrose") {
                  console.log('Array? ' + (house[attribute] instanceof Array));
                }
                if (house[attribute] instanceof Array) {
                  // var names = [];
                  var attributes = house[attribute];
                  house[attribute] = '';
                  // attributes.forEach(function(call) {
                  // console.log('attributes:', attributes);
                  for (var call in attributes) {
                    // console.log('call: ' + attributes[call]);
                    if (exclude.indexOf(attribute) === -1) {
                      fetch(attributes[call])
                          .then(res => res.json())
                          .then(res => {
                                // console.log(res);
                                // names.push(res.name);
                                if (house[attribute] !== '') {
                                  house[attribute] += ', '
                                }
                                house[attribute] += res.name;
                                // if (house.name == "House Ambrose") {
                                //   console.log('updated ' + attribute + ' to be ' + house[attribute]);
                                // }
                              }
                          );
                    }
                  };
                  // house[attribute] = names;
                } else {
                  if (exclude.indexOf(attribute) === -1) {
                    if (house.name == "House Ambrose") {
                      console.log(attribute + ': ' + house[attribute]);
                    }

                    fetch(house[attribute])
                        .then(res => res.json())
                        .then(res => {
                              house[attribute] = res.name;
                              if (house.name == "House Ambrose") {
                                // console.log(res);
                                // console.log('house: ', house);
                                console.log(attribute + ': ' + house[attribute]);
                                console.log('result name: ' + res.name);
                                console.log(house);
                                console.log('------');
                              }
                            }
                        );
                  }
                }
              }
            }
          });
           return ;
        }
      )
      .then(
        houses => this.props.profilesLoaded({ loading: false, houses }),
        error => this.props.profilesLoaded({ loading: false, error })
      );
  }

  render () {
    return (
      <div></div>
    )
  }

}

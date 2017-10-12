// written with the intention of extending Array.prototype to grab the key to a random thing off the array
function sample () {
  return Math.floor ( Math.random() * this.length );
};

export { sample }

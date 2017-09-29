//this would make a good abstract class for an interface to different storage mechanisms
//just using localstorage for now
class Storage {
  constructor () {
    this.storage = window.localStorage;
  }

  storeItem(key, value) {
    if (this.storage.setItem(key, value))
      return true;
    return false;
  }

  getItem(key) {
    return this.storage.getItem(key);
  }
}

export default Storage;

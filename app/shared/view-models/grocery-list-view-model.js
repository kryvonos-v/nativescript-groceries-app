var config = require('../../shared/config')
var fetchModule = require('fetch')
var ObservableArray = require('data/observable-array').ObservableArray

const BASE_URL = config.apiUrl + 'appdata/' + config.appKey + '/Groceries'

class GroceryListViewModel extends ObservableArray {
  constructor (items = []) {
    super(items)
  }
}

function getCommonHeaders () {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Kinvey ' + config.token
  }
}

function handleErrors (response) {
  if (!response.ok) {
    console.log(JSON.stringify(response))
    throw Error(response.statusText)
  }
  return response
}

module.exports = GroceryListViewModel

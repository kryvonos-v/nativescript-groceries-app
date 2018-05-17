const catchify = require('catchify')
const fetchModule = require('fetch')
const ObservableArray = require('data/observable-array').ObservableArray

const config = require('../../shared/config')
const sleep = require('../../shared/utils').sleep

const GROCERIES_URL = config.apiUrl + 'appdata/' + config.appKey + '/Groceries'

class GroceryListViewModel extends ObservableArray {
  constructor (items = []) {
    super(items)
  }

  empty () {
    this.length = 0
  }

  async load () {
    fetch(GROCERIES_URL, {
      headers: getCommonHeaders()
    })
      .then(handleErrors)
      .then(response => response.json())
      // TEMPORARY: API which is used in Groceries store, currently doesn't work.
      // That's why we will ignore wrong credentials error and return dummy data.
      .catch(async (error) => {
        if (error.message === 'Unauthorized') {
          // Using delay for simulating API response.
          await sleep(500)

          return [
            { _id: 1, Name: 'bread' },
            { _id: 2, Name: 'milk' },
            { _id: 3, Name: 'wine' },
            { _id: 4, Name: 'grapes' },
            { _id: 5, Name: 'olives' }
          ]
        }

        throw error
      })
      .then(groceries => {
        groceries.forEach(item => this.push({
          id: item._id,
          name: item.Name
        }))
      })
  }

  add (groceryName) {
    return fetch(GROCERIES_URL, {
      method: 'POST',
      body: JSON.stringify({
        Name: groceryName
      }),
      headers: getCommonHeaders()
    })
      .then(handleErrors)
      .then(reponse => response.json())
      // TEMPORARY: API which is used in Groceries store, currently doesn't work.
      // That's why we will ignore wrong credentials error and return dummy data.
      .catch(error => {
        if (error.message === 'Unauthorized') {
          const randomId = Math.round(Math.random() * 10000)

          return { _id: randomId }
        }

        throw error
      })
      .then(data => {
        this.push({
          id: data._id,
          name: groceryName
        })
      })
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
    throw new Error(response.statusText)
  }

  return response
}

module.exports = GroceryListViewModel

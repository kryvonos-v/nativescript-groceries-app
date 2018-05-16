var config = require('../../shared/config')
var observable = require('data/observable')

class User extends observable.Observable {
  constructor ({ email = '', message = '' } = {}) {
    super()

    this.email = email
    this.message = message
  }

  register () {
    return fetch(config.apiUrl + 'user/' + config.appKey, {
      method: 'POST',
      body: JSON.stringify({
        username: this.email,
        email: this.email,
        password: this.password
      }),
      headers: getCommonHeaders()
    })
    .then(handleErrors)
  }

  login () {
    return fetch(config.apiUrl + 'user/' + config.appKey + '/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.email,
        password: this.password
      }),
      headers: getCommonHeaders()
    })
    .then(response => response.json())
    .catch(handleErrors)
  }
}

function getCommonHeaders () {
  return {
    'Content-Type': 'application/json',
    Authorization: config.appUserHeader
  }
}

function handleErrors (response) {
  if (!response.ok) {
    console.log(JSON.stringify(response))
    throw Error(response.statusText)
  }

  return response
}

module.exports = User

const frame = require('ui/frame')
const Observable = require('data/observable')

let page = null
let user = new Observable.fromObject({
  email: '',
  password: ''
})

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = user
}

exports.signIn = function () {
  alert('Email: ' + user.email)
}

exports.register = function () {
  const topmost = frame.topmost()

  topmost.navigate('views/register/register')
}
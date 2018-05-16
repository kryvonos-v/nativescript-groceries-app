const frame = require('ui/frame')
const Observable = require('data/observable')
const UserViewModel = require('../../shared/view-models/user-view-model')

let page = null
let user = new UserViewModel()

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = user
}

exports.signIn = function () {
  user.login()
}

exports.register = function () {
  const topmost = frame.topmost()

  topmost.navigate('views/register/register')
}
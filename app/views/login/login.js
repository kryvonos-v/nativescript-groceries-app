const catchify = require('catchify')

const frame = require('ui/frame')
const dialogs = require('ui/dialogs')
const Observable = require('data/observable')
const UserViewModel = require('../../shared/view-models/user-view-model')

let page = null
let user = new UserViewModel()

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = user
}

exports.signIn = async function () {
  const [error, data] = await catchify(user.login())

  if (error || data.error) {
    await alert({
      message: 'Wrong email or password.',
      okButtonText: 'OK'
    })
  }

  // TEMPORARY: API which is used in Groceries store,
  // currently doesn't work. That's why we will put here
  // dummy data for sign in.
  if (user.email === 'vova@gm.com' && user.password === '123') {
    frame.topmost().navigate('views/list/list')
  }
}

exports.register = function () {
  const topmost = frame.topmost()

  topmost.navigate('views/register/register')
}
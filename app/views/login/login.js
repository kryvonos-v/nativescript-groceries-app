const catchify = require('catchify')

const frame = require('ui/frame')
const dialogs = require('ui/dialogs')
const Observable = require('data/observable')
const UserViewModel = require('../../shared/view-models/user-view-model')

const DUMMY_EMAIL = 'vova@gm.com'
const DUMMY_PASSWORD = '123'

let page = null
let user = new UserViewModel({
  email: DUMMY_EMAIL,
  password: DUMMY_PASSWORD
})

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = user
}

exports.signIn = async function () {
  // TEMPORARY: API which is used in Groceries store,
  // currently doesn't work. That's why we will put here
  // dummy data for sign in.
  if (
    user.email !== DUMMY_EMAIL &&
    user.password !== DUMMY_PASSWORD
  ) {
    const [error, data] = await catchify(user.login())

    if (error || data.error) {
      return await alert({
        message: 'Wrong email or password.',
        okButtonText: 'OK'
      })
    }
  }

  frame.topmost().navigate('views/list/list')
}

exports.register = function () {
  const topmost = frame.topmost()

  topmost.navigate('views/register/register')
}
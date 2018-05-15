const frame = require('ui/frame')

exports.pageLoaded = function () {
  console.log('Login page is loaded.')
}

exports.signIn = function () {
  alert('Signing in')
}

exports.register = function () {
  const topmost = frame.topmost()

  topmost.navigate('views/register/register')
}
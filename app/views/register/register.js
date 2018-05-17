const catchify = require('catchifys')
const dialogsModule = require('ui/dialogs')
const frameModule = require('ui/frame')

const UserViewModel = require('../../shared/view-models/user-view-model')
const user = new UserViewModel()

exports.pageLoaded = function (args) {
  const page = args.object
  page.bindingContext = user
}

async function completeRegistration () {
  const [error] = await user.register()

  if (error) {
    console.log(error)

    return await dialogsModule.alert({
      message: 'Unfortunately we were unable to create your account.',
      okButtonText: 'OK'
    })
  }

  await dialogsModule.alert('Your account was successfully created.')
  frameModule.topmost().navigate('views/login/login')
}

exports.register = function () {
  completeRegistration()
}

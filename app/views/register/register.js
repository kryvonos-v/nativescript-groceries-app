const catchify = require('catchify')
const dialogAlert = require('ui/dialogs').alert
const frameModule = require('ui/frame')

const UserViewModel = require('../../shared/view-models/user-view-model')
const userVm = new UserViewModel()

exports.pageLoaded = function (args) {
  const page = args.object
  page.bindingContext = userVm
}

async function completeRegistration () {
  const [error] = await catchify(userVm.register())

  if (error) {
    console.log(error)

    return await dialogAlert({
      message: 'Unfortunately we were unable to create your account.',
      okButtonText: 'OK'
    })
  }

  await dialogAlert('Your account was successfully created.')
  frameModule.topmost().navigate('views/login/login')
}

exports.register = async function () {
  if (userVm.isValidEmail()) {
    completeRegistration()
  } else {
    await dialogAlert({
      message: 'Enter a valid email address.',
      okButtonText: 'OK'
    })
  }
}

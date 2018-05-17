const catchify = require('catchify')
const dialogs = require('ui/dialogs')
const observable = require('data/observable')
const GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model')

let page = null

const groceryListVm = new GroceryListViewModel([
  { name: 'bread' },
  { name: 'milk' }
])
const vm = observable.fromObject({
  groceryList: groceryListVm,
  groceryName: ''
})

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = vm
}

exports.add = async function () {
  if (vm.groceryName.trim() === '') {
    return await dialogs.alert({
      message: 'Input grocery name',
      okButtonText: 'OK'
    })
  }

  page.getViewById('groceryInput').dismissSoftInput()

  const [error] = await catchify(groceryListVm.add(vm.groceryName))

  console.log('error', error)
  if (error) {
    await dialogs.alert({
      message: 'An error occurred while adding an item to your list.',
      okButtonText: 'OK'
    })
  } else {
    vm.groceryName = ''
  }
}
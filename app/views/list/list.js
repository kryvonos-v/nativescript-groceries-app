const catchify = require('catchify')
const dialogs = require('ui/dialogs')
const ListView = require('ui/list-view').ListView
const observable = require('data/observable')
const GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model')

let page = null

const groceryListVm = new GroceryListViewModel()
const vm = observable.fromObject({
  groceryList: groceryListVm,
  groceryName: '',
  loading: true
})

exports.pageLoaded = async function (args) {
  page = args.object
  page.bindingContext = vm

  const groceryListView = page.getViewById('groceryList')

  groceryListVm.empty()
  await groceryListVm.load()
  vm.loading = false

  groceryListView.animate({
    opacity: 1,
    duration: 400
  })

  // groceryListView.on(ListView.itemLoadingEvent, args => {
  //   args.ios.separatorInset = UIEdgeInsetsZero
  // })
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

  if (error) {
    await dialogs.alert({
      message: 'An error occurred while adding an item to your list.',
      okButtonText: 'OK'
    })
  } else {
    vm.groceryName = ''
  }
}
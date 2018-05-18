const socialShare = require('nativescript-social-share')
const catchify = require('catchify')
const dialogs = require('ui/dialogs')
const ListView = require('ui/list-view').ListView
const observable = require('data/observable')
const swipeDelete = require("../../shared/utils/ios-swipe-delete")
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

  if (page.ios) {
    swipeDelete.enable(groceryListView, index => 
      deleteGroceryItemByIndex(index)
    )
  }

  groceryListVm.empty()
  await groceryListVm.load()
  vm.loading = false

  groceryListView.animate({
    opacity: 1,
    duration: 400
  })
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

async function deleteGroceryItemByIndex (index) {
  vm.loading = true
  await groceryListVm.delete(index)
  vm.loading = false
}

exports.delete = async function (args) {
  const item = args.view.bindingContext
  const itemIndex = groceryListVm.indexOf(item)

  if (itemIndex === -1) return

  deleteGroceryItemByIndex(itemIndex)
}

exports.share = function () {
  const list = groceryListVm.map(item => item.name)

  socialShare.shareText(list.join(', '))
}
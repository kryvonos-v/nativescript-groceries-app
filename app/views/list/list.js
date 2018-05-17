const observable = require('data/observable')
const GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model')

let page = null

const groceryListVm = new GroceryListViewModel([
  { name: 'bread' },
  { name: 'milk' }
])
const vm = observable.fromObject({
  groceryList: groceryListVm 
})

groceryListVm.empty()

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = vm
}
const observable = require('data/observable')
const GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model')

let page = null
const vm = observable.fromObject({
  groceryList: new GroceryListViewModel([])
})

exports.pageLoaded = function (args) {
  page = args.object
  page.bindingContext = vm
}
# bamazonManager
Bamazon is an amazon-like storefront with the MySQL. The manager application allows the manager of bamazon to do the following:

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

[![Demo](https://i.imgur.com/0CJZC48.png)](https://www.youtube.com/watch?v=ukeLFSZy_Yc "Demo - Click to Watch!")

* Add to Inventory currently does not work as intended. The function is able to update an item based off the item name, however, when trying to update the quantity of that item, the function sets quantity to 0. This can be seen in the demo*


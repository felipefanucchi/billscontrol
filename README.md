# billscontrol
I'm going to develop this application, just for training. This is made with pure js, no longer using ES5 or 6, 
without any kind of superset like typescript or even without dependencies. 
Pure js. 
How i said above, just for training.
But i'm using the commom n the best practices in js programming, like, module patterns, objects, methods, IIFE, and i think the most important is that i'm working with controllers.

Enjoy the application.
I'll try to add some features like.
* Localstorage.
* Responsive Layout.
* PDF of each month.
* History of each month.
* Report of the year and month.

## Version 1
The first part of the application should be response to.
* Handle with all event listeners
* Get input values
* Add new item to our data structure
* Add new item to the UI
* Calculate Budget 
* Update UI

## Version 1.1.0
The second part of this app has a feature of, deleting an income or an expense and then the budget gets updated.

## Version 1.1.1
Now we can see better our values, i implemented a format for all of them.
For this, i used a fn in my UICtrl, that transform our value in a string with decimals and then, i've made an if statement to set the commas in the values. Actually onlye accepts value with three int and three decimals places.

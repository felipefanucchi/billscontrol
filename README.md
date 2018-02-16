# billscontrol
I'm going to develop this application, just for training. This is made with pure js, no longer using ES5 or 6, 
without any kind of superset like typescript or even without dependencies. 
Pure js. 
How i said above, just for training.
But i'm using the commom n the best practices in js programming, like, module patterns, objects, methods, IIFE, and i think the most important is that i'm working with controllers.

Enjoy the application.
I'll try to add some features like.
* Localstorage (Almost there);
* Responsive Layout;
* PDF of each month;
* History of each month;
* Report of the year and month;
* Each kind of expense or income will have categories that you're gonna choose;
* Repeat the same expense or income for more than a month;
* Select between countries and change monetary sistem.

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

## Version 1.1.2
The UX of the input fields has been improved. When you choose a expense all the fields gets a red border and when it's an income, it gets a green border.
Month and the current year now has been displayed in the budget section.

## Version 1.2.2
Localstorage has been implemente, it contains a few bugs, we're working on it.

## Authors

* **Felipe Fanuchi** - *Initial work* - [Kuat](https://github.com/felipefanucchi)
* **Filipe Souza** - *Contributor* - [Moratinho](https://github.com/Filipe-Souza)

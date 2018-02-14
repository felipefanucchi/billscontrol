// BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, description, value, percentage) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalInc) {
        if(totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type){
        var sum;
        sum = 0;

        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });

        data.totals[type] = sum;

        /*
            Incomes[100, 200, 300]
            sum = 0;
            sum = 0 + 100;
            sum = 100 + 200;
            sum = 300 + 300;
            sum = 600
        */
    }

    return{
        addItem: function(type, desc, val) {
            var newItem, ID;
            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create new item based on 'inc' or 'exp' type
            if(type === 'inc'){
                newItem = new Income(ID, desc, val); 
            } else if(type === 'exp') {
                newItem = new Expense(ID, desc, val); 
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);
            //Return the new element
            return newItem;
        },
        
        addLocal: function (type) {
            // Receive the type of the item (income/expense). 
            var itemStr, itemParse;
            data.allItems[type].map( (el, i) => {
                // Push the type to each item
                data.allItems[type].whichType = type;

                itemStr = JSON.stringify(data.allItems[type][i]);
                localStorage.setItem(`i-${type}-${i}`, itemStr);
            });
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(curr) {
                return curr.id;
            });

            index = ids.indexOf(id);

            if (index !== -1){ // -1 is what the method above returns if didn't find the index
                data.allItems[type].splice(index, 1);

                localStorage.removeItem(`i-${type}-${id}`);
            }
        },

        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

            // Expense = 100 and income 300, spent 33.33% - 100/300 - 0.333*100
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(curr) {
                curr.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function (curr) {
                return curr.getPercentage();
            });

            return allPerc;
        },

        getBudget: function () {
            return{
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage 
            }
        },

        data: function() {
           data
        }
    }

})();

// UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputBtnLocal: '.add__btn--local',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month' 
    },
    formatNumber,
    nodeListForEach;

    formatNumber = function(num, type) {
        /*
         * Received 2310 
         */
        var splitNum, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2); // Returns a string: 2310.00

        splitNum = num.split('.');
        int = splitNum[0]; // 10000
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            /**
             * int[0] = 1
             * int[int.length - 3] = 2 (int.length = 5)
             * first substr goes to the first element until the second.
             * int[int.length - 3] = 2
             * int[3]
             * second substr, goes to the second element until the third AHEAD
             */
        }

        dec = splitNum[1]; // 00

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    }

    // Creates a loop for each item of this nodelist.
    nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            /* 
             Call my callback fn, for each item in my nodelist
             My callback fn, is executed with two parameters.
             First parameter is my current index, nodelist on the position i
             And the second parameter it's the index only.
            */
            callback(list[i], i);
        }
    }

    return{
        getInput: function () {
            return{
                type: document.querySelector(DOMstrings.inputType).value, //Inc or Exp
                description: description = document.querySelector(DOMstrings.inputDescription).value,
                value: value = parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        localItems: function(obj) {
            // 1. Clear the current list.
            document.querySelector(DOMstrings.incomeContainer).textContent = "";
            document.querySelector(DOMstrings.expenseContainer).textContent = "";
            // 2. Fill the list with the Inc and Exp Array.

            // 3. While we filled the 
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);

            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription +', '+ DOMstrings.inputValue);
            // Trick to convert the nodeList in an Array
            fieldsArr = Array.prototype.slice.call(fields);

            fields.forEach(function(curr, i, arr) {
                curr.value = "";
            });

            fields[0].focus();
        },

        displayBudget: function(obj) {
            var type;
            (type >= 0) ? '+' : '-';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');

            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage +'%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields;

            fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            // Returns a node list.
            
            nodeListForEach(fields, function(curr, i) {
                if (percentages[i] > 0) {
                    curr.textContent = percentages[i] + '%';
                } else {
                    curr.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, currYear, currMonth, months;

            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' ,'October', 'November', 'December'];
            currYear = now.getFullYear();
            currMonth = now.getMonth();

            document.querySelector(DOMstrings.dateLabel).textContent = months[currMonth] + ' ' + currYear;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue),
                btns = document.querySelectorAll(DOMstrings.inputBtn);
            
            nodeListForEach(fields, function(curr) {
                curr.classList.toggle('red-focus');
            });
            
            nodeListForEach(btns, function(curr) {
                curr.classList.toggle('red')
            });
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function  (budgetCtrl, UICtrl) {
    /*  
     *   Connection between the two module upahead.
     *   They don't connect with each other,
     *   Because each one has your own responsability;
     *   And in our controller we make the connection of them,
     *   Passing into parameters
     */
    var ctrlAddItem, setupEventListeners, updateBudget, ctrlDeleteItem, updatePercentages, ctrlAddLocal;

    setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.inputBtnLocal).addEventListener('click', ctrlAddLocal);

        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13 || e.which === 13) { //Which for older browser
                ctrlAddItem();
            }

        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    }

    updateBudget = function() {
        var budget;
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the ui
        UICtrl.displayBudget(budget);
    };

    updatePercentages = function() {
        var percentages;
        // 1. Calculate Percentages
        budgetCtrl.calculatePercentages();

        // 2. Reade percentages from the budget controller
        percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the input data
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear all fields
            UICtrl.clearFields();

            // 5. Calculate n display the budget on the ui
            updateBudget();

            // 6. Calculate n update percentages
            updatePercentages();

            // 7. localStorage the items 
            budgetCtrl.addLocal(input.type);
        }
    }

    ctrlAddLocal = function() {
        var input;

        input = UICtrl.getInput();
        budgetController.addLocal(input.type);

        UICtrl.localItems();
    }

    ctrlDeleteItem = function(event) {
        var itemID, spliID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {

            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];
            numberID = parseInt(ID);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, numberID);

            // 2. Delete the item from the ui
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate n update percentages
            updatePercentages();
        }
    }

    return{
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIController);

controller.init();
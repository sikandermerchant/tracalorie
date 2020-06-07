///Storage Controller

///Item Controller
// ///This is the template for Module Pattern where you declare variable and functions which are private within an IIFE and the return variables and functions which are public also within the IIFE - immediately invoked function expression

const ItemCtrl = (function(){
///Declare private variables and functions - cannot be accessed outside the module.
  ///Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure/ State - this creation of states/structure is a prominent feature of JS frameworks like React and Angular, and the aim of this project is to give the feel of such a framework
  const data = {
    items: [
      {id:0, name: 'Steak Dinner', calories: 1200},
      {id:0, name: 'Cookie', calories: 400},
      {id:0, name: 'Chicken Wings', calories: 600}
    ],
    currentItem : null,///when we click on Update Icon, we want to make the item that is selected as the current item
    totalCalories: 0
  }

  return {
  //Declare public variables and methods to access the private ItemCtrl module vars/methods
    getItems: function(){
      return data.items;
    },
    logData : function(){
    return data;
    }
  }
})();


//UI Controller
const UICtrl = (function(){
  ///Declare private variables and functions - cannot be accessed outside the module.

  ///ids like item-list can be changed at any time and to change that all around our code is not efficient.Hence we create the UI Selector method to manage it througout the code from one source 
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name', 
    itemCaloriesInput: '#item-calories'
  }
    
  return {
    //Declare public variables and methods to access the private UICtrl module vars/methods

    ///Populate list items looping through each item and the adding them to the UI, similar to what we have done in earlier lessons
    populateItemList: function(items){
      let html = '';
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      });

      ///Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput : function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value, ///Since it is an input we always take .value of the querySelector
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    ///Get UI selectors public method to access the private UI Selectors function
    getSelectors : function() {
      return UISelectors;
    }

  }
  })();
  

///App Controller - It is the main controller which will have the other controllers passed in, also to invoke them
const App = (function(ItemCtrl, UICtrl){
  ///Load Event Listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit)
  }
  //Add item submit
  const itemAddSubmit = function(e){
  
    //Get form input from a UI controller
    const getFormInput = UICtrl.getItemInput();
      console.log(getFormInput);
    e.preventDefault();
  }

  
  //Declare private variables and functions - cannot be accessed outside the module.
    console.log(ItemCtrl.logData());
  return {
    //Declare public variables and methods to access the private App module vars/methods
    init: function(){ - ///this init loads as soon as the App is initialised so depending on what we want or the state change we want on load, we can add/modify this function.
      console.log('Initialising App....');
      ///fetch items from data structure
      const items = ItemCtrl.getItems();

      ///Populate List with items
      UICtrl.populateItemList(items);

      ///Load event listeners
      loadEventListeners();

    }
  }
  })(ItemCtrl,UICtrl);
  
  
  ////Initialise App
  App.init();
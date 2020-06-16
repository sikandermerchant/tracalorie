//UI Controller
const UICtrl = (function(){
  ///Declare private variables and functions - cannot be accessed outside the module.

  ///ids like item-list can be changed at any time and to change that all around our code is not efficient.Hence we create the UI Selector method to manage it througout the code from one source 
  const UISelectors = {
    itemList: '#item-list',
    listItems:'#item-list li', //this is the list of all lis in the ul(#item-list)
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name', 
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
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
    
    //Add new item to the UI list
    addListItem: function(item){

      //Show List Item as it will be hidden at the beginning or when there is no list item
      document.querySelector(UISelectors.itemList).style.display = 'block';
      ///Create li element
      const li = document.createElement('li');

      //Add Class
      li.className = 'collection-item';

      //Add ID
      li.id = `item-${item.id}`;///here the id will be the id from the Object item with properties of id, name and calories

      //Add HTML
      li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //Insert item to DOM
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },
    
    //Update the list item for the selected item
    updateListItem: function(item){
      //get list items from the DOM
      let listItems = document.querySelectorAll(UISelectors.listItems);
      ///This gives us a nodeList and we have to loop in through that. However we cannot use for-Each to loop through a nodeList. Hence this nodeList has to be converted into an array and then looped through using for-Each
      
      //Convert listItems nodeList to array
      listItems = Array.from(listItems);
      listItems.forEach(listItem => {
        //we want get the id attribute of listItem that we loopin and then check if it is equal to the id of that listItem, the one we want to update, using an if statement
        const itemID = listItem.getAttribute('id');
        if(itemID === `item-${item.id}`){
          //if it is equal then update the innerHTML of that listItem as below
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });

    },

    ///Delete list item
    deleteListItem : function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    //Clear All List Items from UI
    clearAllItems: function(){

      ///This can be done in couple of ways

      //First - select the itemList (ul element) and then set its style display to none
      // document.querySelector(UISelectors.itemList).style.display = 'none';

      //Second- There is another way of doing this is as follows, similar to updateList item

      let listItems = document.querySelectorAll(UISelectors.listItems);

      ///Convert list items nodeList to array
      listItems = Array.from(listItems);

      //Loop through each item of the array and remove them
      listItems.forEach(item => {
        item.remove();
      });

    },
    
    //Clear input item added
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    //Hide List when there is no item in the list
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    ///Show Total Calories on the DOM(UI)
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    //Make sure inputs are clear, Hide Update Meal and Delete Meal buttons 
    clearEditState : function(){

      //First make sure that the inputs are clear
      UICtrl.clearInput();

      //Hide update, delete and back buttons and only have add button
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';

    },

    //Show update, delete and back buttons when in Edit state
    showEditState : function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }, 

    //Add Item to be edited to the form
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState()
    },

    ///Get UI selectors public method to access the private UI Selectors function
    getSelectors : function() {
      return UISelectors;
    }

  }
  })();

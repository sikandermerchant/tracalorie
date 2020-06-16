///App Controller - It is the main controller which will have the other controllers passed in, also to invoke them
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  ///Load Event Listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    //Disable Submit on Enter keypress
    document.addEventListener('keypress',function(e){
      if(e.keyCode === 13 || e.which === 13){ ///condition for identifying if keypress was Enter - covers both old and new browsers
        e.preventDefault();
        return false;
      }
    });

    //Edit item event - here we have to use event delegation as the list item is dynamically generated. So we will set up the event listener on ul (item-list) element
    document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    //Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //ClearAll button event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  //Add item submit
  const itemAddSubmit = function(e){
  
    //Get form input from a UI controller
    const getFormInput = UICtrl.getItemInput();
      console.log(getFormInput);
      //Check for name and calorie input
      if(getFormInput.name !== '' && getFormInput.calories !== ''){
        ///Add Item to the data list
        const newItem = ItemCtrl.addItem(getFormInput.name,getFormInput.calories)
        //Add Item to the UI List
        UICtrl.addListItem(newItem);

        //Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Display Total Calories on DOM
        UICtrl.showTotalCalories(totalCalories);

        //We want to display total Calories when the app initializes and hence we will add it to init -  as below in the init section

        //Add Item to localStorage
        StorageCtrl.storeItem(newItem);

        //Clear Fields after Adding item
        UICtrl.clearEditState();
      }else{

      }
    e.preventDefault();
  };

  //Click to edit item
  const itemEditClick = function(e){

    //Here we delegate the click specifically to the edit icon
    if(e.target.classList.contains('edit-item')){

      //We aim to make this item(the selected one for edit as the current item)

      //For that first we get list item id (item-0, item-1, etc); this is the id attribute of the li element which is parent of the parent of the i element (pencil icon)
      const listID = e.target.parentNode.parentNode.id;
      console.log(listID);

      //To get just the id from the list id that we got above, we break the list ids into array (split it a the - of item-0 for e.g) so that we have the item and the id (e.g. 0) split
      const listIDArr = listID.split('-');
      console.log(listIDArr);

      //Get the actual id; we parseInt as we need it as a number (integer) and not a string
      const currentItemId = parseInt(listIDArr[1]);
      console.log(currentItemId);

      //Now that we have the id for the item to edit lets get the entire associated item to actually edit;
      //Get item to edit
      const itemToEdit = ItemCtrl.getItemByID(currentItemId);
      console.log(itemToEdit);

      //Set currentItem as the item to edit
      ItemCtrl.setCurrentItem(itemToEdit);

      ///Not that we have the item selected as the currentItem to be edited, we will bring back the buttons and populate the form inputs with the existing item name and calories content

      //Add item to form
      UICtrl.addItemToForm();

    }

    e.preventDefault();
  }
  ///Item Update Submit function
  const itemUpdateSubmit = function(e){
    const getUpdateInput = UICtrl.getItemInput();

    //Update item - using ItemCtrl
    const updateItem = ItemCtrl.updateItem(getUpdateInput.name,getUpdateInput.calories);

    //Update UI - using UICtrl
    UICtrl.updateListItem(updateItem);

    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Display Total Calories on DOM
    UICtrl.showTotalCalories(totalCalories);

    //Update Item in local storage
    StorageCtrl.updateItemFromStorage(updateItem);

    //Clear Fields after Adding item
    UICtrl.clearEditState();

    e.preventDefault();
  }

  //Item Delete Submit function
  const itemDeleteSubmit = function(e){
    //Get the current item - here we get the id of the current item
    const currentItem = ItemCtrl.getCurrentItem();

    ///Delete the current item from the data structure
    ItemCtrl.deleteItem(currentItem.id);

    ///Delete the item from UI (DOM) - using UICtrl
    UICtrl.deleteListItem(currentItem.id)

    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Display Total Calories on DOM
    UICtrl.showTotalCalories(totalCalories);

    //Delete Item in local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    //Clear Fields after deleting item
    UICtrl.clearEditState();

    e.preventDefault();
  }

  //ClearAll Items function
  const clearAllItemsClick = function(e){

    //Delete all items from data structure using ItemCtrl
    ItemCtrl.clearAllListItems();
  
    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Display Total Calories on DOM
    UICtrl.showTotalCalories(totalCalories);

    ///Clear all items from UI (DOM) - using UICtrl
    UICtrl.clearAllItems();
    
    //Clear all items in local storage
    StorageCtrl.clearAllItemsFromStorage();

    //Hide ul element after clearing all items
    UICtrl.hideList();

    e.preventDefault();
  }

  //Declare private variables and functions - cannot be accessed outside the module.
    console.log(ItemCtrl.logData());
  return {
    //Declare public variables and methods to access the private App module vars/methods
    init: function(){ - ///this init loads as soon as the App is initialized so depending on what we want or the state change we want on load, we can add/modify this function.

      ///Call clearEditState, which is the initial to be called when the application starts - when init loads
      UICtrl.clearEditState();

      console.log('Initializing App....');
      ///fetch items from data structure
      const items = ItemCtrl.getItems();

      //Check for existing list item and then populate it

      if(items.length === 0){
        //Hide any existing hideList (i.e.) the ul element if there are not items
        UICtrl.hideList();
      }else{
         ///Populate List with items
      UICtrl.populateItemList(items);
      }

      ///Load event listeners
      loadEventListeners();
      //As mentioned earlier, we are displaying Total Calories when the app initializes 

      //Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Display Total Calories on DOM(UI)
      UICtrl.showTotalCalories(totalCalories);
    }
  }
  })(ItemCtrl, StorageCtrl, UICtrl);
  
  
  ////Initialize App
  App.init();
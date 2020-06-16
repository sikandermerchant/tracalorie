///Storage Controller
//Declare variable and functions which are private within an IIFE and the return variables and functions which are public also within the IIFE - immediately invoked function expression
const StorageCtrl = (function(){


  //Public methods
    return{
      //Method to store item when added to the list
      storeItem: function(item){
        let items;
  
        //Check if there is any existing item in the local storage
        if(localStorage.getItem('items') === null){ ///items can be named anything
          //If true - create an empty items array
          items = [];
  
          ///The push the (item) passed into the storeItem function into this array
          items.push(item);
  
          //Set the item added in local storage as 'items'
          localStorage.setItem('items', JSON.stringify(items));///since local storage holds strings, we have to wrap the item (which is an Object) in JSON.stringify in order to correctly set it in local storage
  
        }else{
          //if there are existing items in local storage, load(pull) those out from the local storage
          items = JSON.parse(localStorage.getItem('items')); //by default the items that we get from local storage are stringifyed objects, so we will have to convert them back as objects to do any further operations (mutations). Hence wrap that with JSON.parse
  
          //Push the new item
          items.push(item);
  
          //Reset local storage
          localStorage.setItem('items', JSON.stringify(items));
        }
      },
      //Method to get items from localStorage
      getItemsFromStorage : function(){
        let items = [];
        if(localStorage.getItem('items') === null){
          items = [];
        }else{
          items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
      },
  
      //Method to update item in storage
      updateItemFromStorage : function(updatedItem){
        ///get items from local storage - once again this will be parsed by JSON.parse
        let items = JSON.parse(localStorage.getItem('items'));
  
        //We now want to loop through the items
        items.forEach((item, index) => { //we are passing the index of each array item so we can remove (splice it later) with its help
          //Check if the loop item id is equal to the updatedItem id that was passed in the updateItemStorage function
          if(updatedItem.id === item.id ){
          //if match found true then splice that item from the array using the splice method and replace it with the update item - more info on slice method and syntax on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            items.splice(index, 1, updatedItem);
          }
        });
        //Reset local storage with the new list of items(array) - once again we will stringify the object (array) so it can be stored in local storage as a string
        localStorage.setItem('items', JSON.stringify(items));
      },
  
      //Method to delete item from storage
      deleteItemFromStorage: function(id){
        //get items from local storage - once again this will be parsed by JSON.parse
        let items = JSON.parse(localStorage.getItem('items'));
  
        //We now want to loop through the items
        items.forEach((item,index) => { //we are passing the index of each array item so we can remove (splice it later) with its help
          //Check if the loop item id is equal to the updatedItem id that was passed in the updateItemStorage function
          if(id === item.id){
            //if match found true then splice that item from the array using the splice method to remove it from the list
            items.splice(index, 1);
          } 
        });
        //Reset local storage with the new list of items(array) - once again we will stringify the object (array) so it can be stored in local storage as a string
        localStorage.setItem('items', JSON.stringify(items));
      },
  
      //Method to clear all items in local storage
      clearAllItemsFromStorage: function(){
        localStorage.removeItem('items');
      }
    }
  })();
  
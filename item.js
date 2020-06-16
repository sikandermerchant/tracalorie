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
      //This below is a dummy item list which is grayed out as we want the app to load the items from local storage
      // items: [
      //   // {id:0, name: 'Steak Dinner', calories: 1200},
      //   // {id:2, name: 'Cookie', calories: 400},
      //   // {id:3, name: 'Chicken Wings', calories: 600}
      // ],
      items : StorageCtrl.getItemsFromStorage(),
      currentItem : null,///when we click on Update Icon, we want to make the item that is selected as the current item
      totalCalories: 0
    }
  
    return {
    //Declare public variables and methods to access the private ItemCtrl module vars/methods
      getItems: function(){
        return data.items;
      },
  
      addItem: function(name,calories){
  
        //create ID
        let ID
        if(data.items.length > 0){
          ID = data.items[data.items.length - 1].id + 1;///logic for autogenertaion of IDs
        }else{
          ID = 0;
        }
        //Calories to number since it is coming from a form and is a string
        calories = parseInt(calories);
  
        //Create new Item
        newItem = new Item(ID,name,calories);
  
        //push(add) new Item to the existing item list (array)
        data.items.push(newItem);
        return newItem;
      },
  
      updateItem: function(name,calories){
        //Calories to number since it is coming from a form and is a string
        calories = parseInt(calories);
        
        ///here we will loop through each item to match the item id to the current item id and then return it
        let found = null; ////variable declared to return the matched item (can be anything)
        //loop through each item
        data.items.forEach(item => {
          if(item.id === data.currentItem.id){
            item.name = name;
            item.calories = calories;
            found = item;
          }
        });
        return found;
      },
  
      deleteItem: function(id){
        ///Get ids - try something different here using maps instead of for-Each - The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. In this case it will loop through the data array for each item and return an array of ids for each item
        ids = data.items.map(item => {
          return item.id;
        });
  
        //Get index for the item id (passed in the deleteItem function to be deleted) from the array of ids
        const index = ids.indexOf(id);//The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
  
        ///Remove item - Once we find the index of the item we want to then splice it out from the data array thus removing the item
        data.items.splice(index, 1);
        //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
        //Syntax - let arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        //start - The index at which to start changing the array.
        //deleteCount (Optional)- An integer indicating the number of elements in the array to remove from start.
        //Return value - An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
        //More info on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  
      }, 
  
      clearAllListItems : function(){
        data.items = [];
      },
  
      getTotalCalories : function(){
        let total = 0;
        ///Loop through items to calculate total calories by adding calories for each item
        data.items.forEach(item => {
          total += item.calories;
        });
        //Set total calories in data structure
        data.totalCalories = total;
  
        //return total
        return data.totalCalories;
  
      },
  
      getItemByID : function(id){
        ///here we will loop through each item to match the id and then return it
        let found = null; ///variable declared to return the matched item (can be anything)
        //loop through each item
        data.items.forEach(item => {
          if(item.id === id){
            found = item;
          }
        });
        return found;
      },
  
      getCurrentItem: function(){
        return data.currentItem;
      },
  
      setCurrentItem: function(item){
        return data.currentItem = item;
      },
  
      logData : function(){
      return data;
      }
    }
  })();
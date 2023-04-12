function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
    })
  }
  
  function cutRestaurantList(list){
    console.log('fired cut list')
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const idx = getRandomIntInclusive(0, list.length - 1);
      return list[idx]
    })
  }
  
  function filterList(list, query) {
    return list.filter((item)=>{
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery)
    })
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    // Add a querySelector that targets your filter button here;
    const filterButton = document.querySelector('#filter_button');
    const generateListButton = document.querySelector('#generate');
    const loadDataButton = document.querySelector('#data_load');
  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
  
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('Loading data');
  
      loadAnimation.style.display = 'inline-block';
      
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      currentList = await results.json();
  
      
      console.table(currentList); 
    });
  
    filterButton.addEventListener("click", (event)=>{
      console.log('clicked filterButton');
    
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
      
      console.log(newList)
      injectHTML(newList)
    })
  
    generateListButton.addEventListener('click', (event)=>{
      console.log('generate new list')
      const restaurantsList = cutRestaurantList(currentList);
      injectHTML(restaurantsList);
    })
    /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
      When you have the contents of the form, use the placeholder at line 7
      to write a list filter
      Fire it here and filter for the word "pizza"
      you should get approximately 46 results
    */
  }
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
/*
Assignment: Climbing Project JS (Project1s)
Author: Brandon Lum
Course: SEI-Flex (2019)
*/

// console.log('Linked JS')


////////////////////////////////
// API Setup
////////////////////////////////

  // Weather 
  const weatherBase = `api.openweathermap.org/data/2.5/weather?`;
  const id = `NWY1MjU4NmU2NWQyNjhiYzQwMjRhNzFkN2E4NjgzODc=`;
  const dcId = window.atob(id);
  const fullId = `APPID=${dcId}`;
  const queryStarter = `q=`;
  let inputLocation = `new york`; // lowercase

  let fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullId;





////////////////////////////////
// Querying API
////////////////////////////////

  // Weather
  const getWeather = () => {
    console.log(fullWeatherPath) // Testing Weather path
  }




 $(() => {

   getWeather();
   
 })

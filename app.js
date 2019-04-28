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
  const weatherBase = `http://api.openweathermap.org/data/2.5/weather?`;
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
    console.log(fullWeatherPath); // Testing Weather path
    $.ajax({
      url: fullWeatherPath,
      type: "Get"//,
      // data: {
      //   "$limit": 1;
      // }
    }).then((weatherData) => {
      const $city = $('<h2>').text(inputLocation).css({'text-transform': 'capitalize'});
      let currentTempFah = convKeltoFah(weatherData.main.temp);
      let currentTempCel = convKeltoCel(weatherData.main.temp);
      let tempMinFah = convKeltoFah(weatherData.main.temp_min);
      let tempMaxFah = convKeltoFah(weatherData.main.temp_max);
      let tempMinCel = convKeltoCel(weatherData.main.temp_min);
      let tempMaxCel = convKeltoCel(weatherData.main.temp_max);
      const $currentTempCont = $('<div>').text(`Current Temp = ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
      const $tempMinMax = $('<div>').text(`Temp Range = ${tempMinFah + String.fromCharCode(176)}F/${tempMinCel + String.fromCharCode(176)}C - ${tempMaxFah + String.fromCharCode(176)}F/${tempMaxCel + String.fromCharCode(176)}C`);  
      $('.content-container').append($city).append($currentTempCont).append($tempMinMax)
    },
    (error) => {
      console.error(error)
    })
  }

  
  

////////////////////////////////
// Functions
////////////////////////////////

  // Convert
    // Kelvin to Fahrenheit
    const convKeltoFah = (tempKel) => {
      return ((tempKel-273.15)*(9/5)+32).toFixed(2); // convert from Kelvin to Fahrenheit
    };
    // Kelvin to Celcius
    const convKeltoCel = (tempKel) => {
      return (tempKel-273.15).toFixed(2); // convert from Kelvin to Celcius
    };

 $(() => {

   $('#nav-weather').on('click', (event) => {
     getWeather();
   })
   
 })

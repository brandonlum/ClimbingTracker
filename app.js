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
  const getWeather = (currLocation, displayLocation) => {
    inputLocation = currLocation;
    fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullId;
    // if (displayLocation == 1 && currLocation == "") {
    //   inputLocation = `new york`
    //   fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullId;
    // }
    console.log(fullWeatherPath); // Testing Weather path
    $.ajax({
      url: fullWeatherPath,
      type: "Get"//,
      // data: {
      //   "$limit": 1;
      // }
    }).then((weatherData) => {
      let currentTempFah = convKeltoFah(weatherData.main.temp);
      let currentTempCel = convKeltoCel(weatherData.main.temp);
      let tempMinFah = convKeltoFah(weatherData.main.temp_min);
      let tempMaxFah = convKeltoFah(weatherData.main.temp_max);
      let tempMinCel = convKeltoCel(weatherData.main.temp_min);
      let tempMaxCel = convKeltoCel(weatherData.main.temp_max);
      if (displayLocation == 1) {
        // if (currLocation == "") {
        //   const $unknownLocation = $('<h2>').text(`Please indicate location in Weather Information Section (Top Right)`);
        //   $('.content-container').append($unknownLocation)
        // }
        // else {
          const $city = $('<h2>').attr('id','cityName').text(inputLocation).css({'text-transform': 'capitalize'});
          const $currentTempCont = $('<div>').text(`Current Temp = ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
          const $tempMinMax = $('<div>').text(`Temp Range = ${tempMinFah + String.fromCharCode(176)}F/${tempMinCel + String.fromCharCode(176)}C - ${tempMaxFah + String.fromCharCode(176)}F/${tempMaxCel + String.fromCharCode(176)}C`);  
          $('.content-container').append($city).append($currentTempCont).append($tempMinMax)
        // }
      }
      else if (displayLocation == 2) {
        const $city = $('<h2>').attr('id','cityName').text(inputLocation).css({'text-transform': 'capitalize', 'font-size': '0.8em', 'text-align': 'center', 'margin': 'auto'});
        $('.weather-bar').text(`Current Temp: ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
        $('.weather-bar').prepend($city)
      }
    },
    (error) => {
      if (displayLocation == 2) {
        console.error(error)
        $('.weather-bar').text(`Incorrect Value, try again!`)
      }
      else {
        console.error(error)
        $('.content-container').text(`Please input city value in top right corner`)
      }
    })
  }
  
  
  
  // Weather Bar
  // const getWeatherBar = (currLocation) => {
  //   inputLocation = currLocation;
  //   fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullId;
  //   console.log(fullWeatherPath); // Testing Weather path
  //   $.ajax({
  //     url: fullWeatherPath,
  //     type: "Get"
  //   }).then((weatherData) => {
  //     const $city = $('<h2>').text(inputLocation).css({'text-transform': 'capitalize', 'font-size': '0.8em', 'text-align': 'center', 'margin': 'auto'});
  //     let currentTempFah = convKeltoFah(weatherData.main.temp);
  //     let currentTempCel = convKeltoCel(weatherData.main.temp);
  //     $('.weather-bar').text(`Current Temp: ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
  //     $('.weather-bar').prepend($city)
  //   },
  //   (error) => {
  //     console.error(error)
  //     $('.weather-bar').text(`Incorrect Value, try again!`)
  //   })
  // }

  
  

////////////////////////////////
// Functions
////////////////////////////////

  // Convert
    // Kelvin to Fahrenheit
    const convKeltoFah = (tempKel) => {
      return ((tempKel-273.15)*(9/5)+32).toFixed(0); // convert from Kelvin to Fahrenheit
    };
    // Kelvin to Celcius
    const convKeltoCel = (tempKel) => {
      return (tempKel-273.15).toFixed(0); // convert from Kelvin to Celcius
    };

 $(() => {

   $('form').on('submit', (event) => {
     $('.weather-bar').empty();
     event.preventDefault();
     getWeather($('input[type="text"]').val().toLowerCase(),2)
     $('input[type="text"]').val("")
     console.log($('.weather-bar').eq(0))
   })
   
   $('#nav-weather').on('click', (event) => {
     $('.content-container').empty();
     console.log($('#cityName').text())
     if ($('#cityName').text() == "") {
       const $unknownLocation = $('<h2>').text(`Please indicate location in Weather Information Section (Top Right)`);
       $('.content-container').append($unknownLocation)
     }
     else {getWeather($('#cityName').text(),1);}
     
   })
   
   
 })

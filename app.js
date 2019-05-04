/*
Assignment: Climbing Project JS (Project1s)
Author: Brandon Lum
Course: SEI-Flex (2019)
*/

// console.log('Linked JS')


////////////////////////////////
// API Setup
////////////////////////////////
  
  const idArr = [`NWY1MjU4NmU2NWQyNjhiYzQwMjRhNzFkN2E4NjgzODc=`, 'MjAwNDU1NDUxLWQ3ZWJjNzk3MmVjODEyODhlZTgxYjFkN2U4MWE3NDI1','MDgxNGM4N2I1ZjRjNGYyYTlkMGFkNDAyMTE2M2Y3YWU=']; // openWeather, Mountain Project, News
  
  // Weather 
  const weatherBase = `https://api.openweathermap.org/data/2.5/weather?`;
  const forecastBase = `https://api.openweathermap.org/data/2.5/forecast?`
  const fullWeatherId = `APPID=${window.atob(idArr[0])}`;
  const queryStarter = `q=`;
  const latStarter = `lat=`;
  const longStarter = `lon=`;
  let locationLat = `40`;
  let locationLong = `-74`
  let inputLocation = `new york`; // lowercase
  let currentPos = 0;

  let fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullWeatherId;
  let fullWeatherPathCurrCoord = weatherBase + latStarter + locationLat + `&` + longStarter + locationLong; 
  let fullWeatherPathForecast = forecastBase + queryStarter + inputLocation + `&` + fullWeatherId;

  
  
  // Mountain Project
  const mpBase = `https://www.mountainproject.com/data/`;
  const qGetRoutes = `get-routes?`;
  const qGetRoutesLatLong = `get-routes-for-lat-lon?`;
  let routeIds = `105748391,105750454,105749956`;
  let minDiff = `5.6`;
  let maxDiff = `5.10`;
  const difficultyRange = `minDiff=${minDiff}&maxDiff=${maxDiff}`;
  let maxDistance = `10`;
  const mpMaxDistance = `maxDistance=${maxDistance}`;
  const qRouteIds = `routeIds=${routeIds}`;
  const fullMPId = `key=${window.atob(idArr[1])}`;
  
  let fullMPPathRoutesLatLong = mpBase + qGetRoutesLatLong + fullMPId + `&` + latStarter + locationLat + `&` + longStarter + locationLong;
  let fullMPPathRoutes = mpBase + qGetRoutes + fullMPId + '&' + qRouteIds;
  
  
  
  // NewsAPI
  const newsBase = `https://newsapi.org/v2/`
  const newsQType = ['everything?','top-headlines?','sources?'];
  const fullNewsID = `apiKey=${window.atob(idArr[2])}`;
  let newsQuery = 'alpine climbing';
  let fullNewsPath = newsBase + newsQType[0] + fullNewsID + '&' + queryStarter + newsQuery;




////////////////////////////////
// Querying API
////////////////////////////////

  // Weather
  const getWeather = (currLocation, displayLocation) => {
    let $weatherIcon = '';
    if (displayLocation == 3) {
      locationLat = currentPos.latitude;
      locationLong = currentPos.longitude;
      fullWeatherPathCurrCoord = weatherBase + latStarter + locationLat + `&` + longStarter + locationLong; 
      // console.log(fullWeatherPathCurrCoord);
    }
    else {
      inputLocation = currLocation;
      fullWeatherPath = weatherBase + queryStarter + inputLocation + `&` + fullWeatherId;
      // console.log(fullWeatherPath); // Testing Weather path
    }
    $.ajax({
      url: fullWeatherPath,
      type: "Get"
    }).then((weatherData) => {
      let currentTempFah = convKeltoFah(weatherData.main.temp);
      let currentTempCel = convKeltoCel(weatherData.main.temp);
      let tempMinFah = convKeltoFah(weatherData.main.temp_min);
      let tempMaxFah = convKeltoFah(weatherData.main.temp_max);
      let tempMinCel = convKeltoCel(weatherData.main.temp_min);
      let tempMaxCel = convKeltoCel(weatherData.main.temp_max);
      let currentCond = weatherData.weather[0].main;
      let currCityName = weatherData.name;
      locationLat = weatherData.coord.lat;
      locationLong = weatherData.coord.lon;
      
      if (currentCond.toLowerCase() == "clear") {
        $weatherIcon = $('<span>').addClass("lnr lnr-sun weather-icon");
      }
      else if (currentCond.toLowerCase() == "clouds" ) {
        $weatherIcon = $('<span>').addClass("lnr lnr-cloud weather-icon");
      }
      else if (currentCond.toLowerCase() == "rain" || currentCond.toLowerCase() == "mist" || currentCond.toLowerCase() == "drizzle") {
        $weatherIcon = $('<div>').addClass("lnr lnr-drop weather-icon");
      }
      
      if (displayLocation == 1) {
        const $city = $('<h2>').attr('id','cityName').text(inputLocation).css({'text-transform': 'capitalize'});
        const $currentTempCont = $('<div>').text(`Current Temp: ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
        const $tempMinMax = $('<div>').text(`Low: ${tempMinFah + String.fromCharCode(176)}F/${tempMinCel + String.fromCharCode(176)}C - High: ${tempMaxFah + String.fromCharCode(176)}F/${tempMaxCel + String.fromCharCode(176)}C`);  
        $('.content-container').append($city).append($currentTempCont).append($tempMinMax)
      }
      else if (displayLocation == 2) {
        const $city = $('<h2>').attr('id','cityName').text(inputLocation).css({'text-transform': 'capitalize', 'font-size': '0.8em', 'text-align': 'center', 'margin': 'auto'});
        $('.weather-bar').text(`${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C - ${currentCond}`);
        $('.weather-bar').before($weatherIcon).prepend($city)
      }
      else if (displayLocation == 3) { // Display in Weather bar

        const $city = $('<h2>').attr('id','cityName').text(currCityName).css({'text-transform': 'capitalize', 'font-size': '0.8em', 'text-align': 'center', 'margin': 'auto'});
        $('.weather-bar').text(`${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C - ${currentCond}`);
        $('.weather-bar').before($weatherIcon).prepend($city)
      }
    },
    (error) => {
      if (displayLocation == 2 || displayLocation == 3) {
        console.error(error)
        $('.weather-bar').text(`Incorrect Value, try again!`)
      }
      else {
        console.error(error)
        $('.content-container').text(`Please input city value in top right corner`)
      }
    })
  }
  
  
  
  // Forecast
  const getWeatherForecast = (currLocation) => {
      inputLocation = currLocation;
      fullWeatherPathForecast = forecastBase + queryStarter + inputLocation + `&` + fullWeatherId;
      
      const $pageTitle = $('<h1>').text('Weather Forecast').css({display: 'flex', 'justify-content': 'center', width: '100%'});
      $('.content-container').append($pageTitle).css({display:'flex', 'flex-flow': 'row wrap'});
      
      
    $.ajax({
      url: fullWeatherPathForecast,
      type: "Get"
    }).then((weatherData) => {
      let currCityName = weatherData.city.name;
      const $city = $('<h2>').attr('id','cityName').text(inputLocation).css({'text-transform': 'capitalize', width: '80%', 'text-align': 'center', margin: '0 auto' });
      $('.content-container').append($city);
      const $forecastContainer = $('<div>').addClass('forecast-container').css({display: 'flex', 'flex-flow': 'row wrap', 'border': '1px solid black', 'justify-content': 'space-around', width: '80%', margin: '0 auto', 'text-align': 'center'});
      
      for (let i = 0; i < weatherData.list.length; i++) {
        let currentTempFah = convKeltoFah(weatherData.list[i].main.temp);
        let currentTempCel = convKeltoCel(weatherData.list[i].main.temp);
        let tempMinFah = convKeltoFah(weatherData.list[i].main.temp_min);
        let tempMaxFah = convKeltoFah(weatherData.list[i].main.temp_max);
        let tempMinCel = convKeltoCel(weatherData.list[i].main.temp_min);
        let tempMaxCel = convKeltoCel(weatherData.list[i].main.temp_max);
        let weatherDesc = weatherData.list[i].weather.description;
        let weatherDT = weatherData.list[i].dt_txt;
        let weatherDate = weatherData.list[i].dt_txt.split(' ')[0];
        // if (weatherData.list[i].dt_txt.split(' ')[1])
        let weatherTime = weatherData.list[i].dt_txt.split(' ')[1];
        
        const $dayContainer = $('<div>').addClass('day-container').attr('id',`forecastDay${weatherDate}`).css({'border': '1px solid black', margin: '5px'});
        
        const $currentTempCont = $('<div>').text(`Current Temp: ${currentTempFah + String.fromCharCode(176)}F/${currentTempCel + String.fromCharCode(176)}C`);
        const $tempMinMax = $('<div>').text(`Low: ${tempMinFah + String.fromCharCode(176)}F/${tempMinCel + String.fromCharCode(176)}C - High: ${tempMaxFah + String.fromCharCode(176)}F/${tempMaxCel + String.fromCharCode(176)}C`);  
        
        $($dayContainer).append(weatherDT).append($currentTempCont).append($tempMinMax).append(weatherDesc);
        $($forecastContainer).append($dayContainer);
      }
      $('.content-container').append($forecastContainer);
      $('.poweredby').append(`Powered by: OpenWeatherMap`)
    },
    (error) => {
      console.error(error)
      $('.content-container').text(`Please input city value in top right corner`)
    })
  }

  
  
  // Mountain Project
  const getRoutes = (options, lat, lon) => {
    fullMPPathRoutes = mpBase + qGetRoutes + fullMPId + '&' + qRouteIds;
    currentIndex = 0;
    if (options == 2) {
      locationLat = lat;
      locationLong = lon;
      fullMPPathRoutesLatLong = mpBase + qGetRoutesLatLong + fullMPId + `&` + latStarter + locationLat + `&` + longStarter + locationLong;
      // console.log(fullMPPathRoutesLatLong);
    }
    
    const $pageTitle = $('<h1>').text('Routes').css({display: 'flex', 'justify-content': 'center', width: '100%'});
    $('.content-container').append($pageTitle).css({display:'flex', 'flex-flow': 'row wrap'})
    const $climbingContainer = $('<div>').addClass('climbing-container').css({display: 'block', width: '80%', height: '80%', margin: '0 auto'});
    const $carouselContainer = $('<div>').addClass('carousel-container').css({display: 'flex', width: '80%', height: '80%', 'justify-content': 'space around', margin: '0 auto'});
      
    if (options == 1) {
      $.ajax({
        url: fullMPPathRoutes
      }).then((routeData) => {
        // console.log(fullMPPathRoutes);
        for (let i = 0; i < routeData.routes.length; i++) {
          let routeName = routeData.routes[i].name;
          let routeType = routeData.routes[i].type;
          let routeRating = routeData.routes[i].rating;
          let routeStars = routeData.routes[i].stars;
          let routePitches = routeData.routes[i].pitches;
          let routeLocations = routeData.routes[i].location;
          let routeImage = routeData.routes[i].imgSmallMed;
    
          const $routeName = $('<h2>').text(routeName);
          const $routeInformation = $('<p>').css({'white-space': 'pre-wrap'}).html(`Type: ${routeType} \n Difficulty: ${routeRating} \n Rating: ${routeStars} \n Pitches: ${routePitches} \n Where: ${routeLocations}`);
          const $routeImage = $('<img>').attr('src', routeImage).css({'max-width': '80%', 'max-height': '80%'});
          
          const $routeContainer = $('<div>').addClass('route-card').attr('id', routeName).css({border: `1px solid black`, padding: '10px', margin: `0 auto`, 'text-align': 'center', 'min-height': '500px'});
          $($routeContainer).append($routeName).append($routeInformation).append($routeImage);
          $($climbingContainer).append($routeContainer)
        }
        $($carouselContainer).append($divPreviousBtn).append($climbingContainer).append($divNextBtn);
        $('.content-container').append($carouselContainer)
        $('.poweredby').append(`Powered by: Mountain Project`)
      },
      (error) => {
        console.error(error);
      })
    }
    else 
    if (options == 2) {
      $.ajax({
        url: fullMPPathRoutesLatLong
      }).then((routeData) => {
        for (let i = 0; i < routeData.routes.length; i++) {
          let routeName = routeData.routes[i].name;
          let routeType = routeData.routes[i].type;
          let routeRating = routeData.routes[i].rating;
          let routeStars = routeData.routes[i].stars;
          let routePitches = routeData.routes[i].pitches;
          let routeLocations = routeData.routes[i].location;
          let routeImage = routeData.routes[i].imgSmallMed;
          
          const $routeName = $('<h2>').text(routeName);
          const $routeInformation = $('<p>').html(`Type: ${routeType} \n Difficulty: ${routeRating} \n Rating: ${routeStars} \n Pitches: ${routePitches} \n Where: ${routeLocations}`).css({'white-space': 'pre-wrap'});
          const $routeImage = $('<img>').attr('src', routeImage).css({'max-width': '80%', 'max-height': '80%'});
          
          const $routeContainer = $('<div>').addClass('route-card').attr('id', routeName).css({border: `1px solid black`, padding: '10px', margin: `auto`, 'text-align': 'center'});
          $($routeContainer).append($routeName).append($routeInformation).append($routeImage);
          $($climbingContainer).append($routeContainer)
        }
        $($divNextBtn).on('click', nextItem)
        $($divPreviousBtn).on('click', previousItem)
        
        $($carouselContainer).append($divPreviousBtn).append($climbingContainer).append($divNextBtn);
        $('.content-container').append($carouselContainer)
        $('.poweredby').append(`Powered by: Mountain Project`)
      },
      (error) => {
        console.error(error);
      
      })
    }
  }
  
  
  // NewsAPI
  const getNews = (option) => {
    currentIndex = 0;
    const $pageTitle = $('<h1>').text('News').css({display: 'flex', 'justify-content': 'center', width: '100%'});
    $('.content-container').append($pageTitle).css({display:'flex', 'flex-flow': 'row wrap'})
    const $newsContainer = $('<div>').addClass('news-container').css({display: 'block', width: '80%', height: '80%', margin: '0 auto'});
    const $carouselContainer = $('<div>').addClass('carousel-container').css({display: 'flex', width: '80%', height: '80%', 'justify-content': 'space around', margin: '0 auto'});
    $.ajax({
      url: fullNewsPath
    }).then((newsData) => {
      for (let i = 0; i < newsData.articles.length; i++) {
        let newsSource = newsData.articles[i].source.name;
        let newsAuthor = newsData.articles[i].author;
        let newsTitle = newsData.articles[i].title;
        let newsDescription = newsData.articles[i].description;
        let newsImg = newsData.articles[i].urlToImage;
        let newsContent = newsData.articles[i].content;
        let $newsLink = $('<a>').text(newsSource).attr('href', newsData.articles[i].url).css({border: '0', 'font-size': '0.9em', 'color': 'blue' })
        
        
        const $newsTitle = $('<h2>').text(newsTitle);
        const $newsInformation = $('<p>').html(`Author: ${newsAuthor} \n\n ${newsDescription}`).css({'white-space': 'pre-wrap'});
        const $newsContent = $('<p>').html(`${$newsTitle} \n ${newsContent}`).css({'white-space': 'pre-wrap'});
      
        const $articleContainer = $('<div>').addClass('article-container').attr('id', newsTitle).css({border: `1px solid black`, padding: '10px', margin: `auto`, 'text-align': 'center', 'font-size': '1.2em', 'background-image': `url(${newsImg})`, 'background-blend-mode': 'color', 'background-size': 'cover'});
      
        // const $articleContainerBack = $('<div>').addClass('article-container-back').attr('id', newsTitle).text(newsContent).css({border: `1px solid black`, padding: '10px', margin: `auto`, 'text-align': 'center', 'font-size': '1.2em', 'background-image': `url(${newsImg})`, 'background-blend-mode': 'color', 'background-size': 'cover'});
      
        $($articleContainer).append($newsTitle).append($newsInformation).append($newsLink)
        $($newsContainer).append($articleContainer)//.append($articleContainerBack)
        // $($newsContainer).on('click', flipCard)
      }
      $($divNextBtn).on('click', nextItem)
      $($divPreviousBtn).on('click', previousItem)
      
      $($carouselContainer).append($divPreviousBtn).append($newsContainer).append($divNextBtn);
      $('.content-container').append($carouselContainer) // ERROR
      // $('.poweredby').append(`Powered by: NewsAPI`)
    },
    (error) => {
      console.error(error);
    })
  }
  
  
  
////////////////////////////////
// Dom Elements
////////////////////////////////
  const $divNextBtn = $('<div>').addClass('carousel-button next').append($('<span>').addClass('lnr lnr-chevron-right')).css({display: 'block', 'max-width': '10%', margin: '0 auto'});

  const $divPreviousBtn = $('<div>').addClass('carousel-button previous').append($('<span>').addClass('lnr lnr-chevron-left')).css({display: 'block', 'max-width': '10%', margin: '0 auto'});



  
  
  
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
    
    
    
  // getCurrentPosition
    const positionSuccess = (position) => {
      currentPos = position.coords;
      console.log(currentPos.latitude, currentPos.longitude);
      getWeather(currentPos,3);
      getRoutes(2, currentPos.latitude, currentPos.longitude);
      return currentPos;
    }
    
    
    let currentIndex = 0;
    let maxIndex = 0;
    
  // Next 
    const nextItem = (event) => {
      maxIndex = $('.carousel-container').children().eq(1).children().length-1;
      console.log(currentIndex);
      console.log(maxIndex);
      $('.carousel-container').children().eq(1).children().eq(currentIndex).css({display: 'none'})
      if (currentIndex < maxIndex) {
        currentIndex++;
      }
      else {
        currentIndex = 0;
      }
      $('.carousel-container').children().eq(1).children().eq(currentIndex).css({display: 'block'})
    }
  
  
  // Previous
    const previousItem = (event) => {
      maxIndex = $('.carousel-container').children().eq(1).children().length-1;
      console.log(currentIndex);
      console.log(maxIndex);
      $('.carousel-container').children().eq(1).children().eq(currentIndex).css({display: 'none'})
      if (currentIndex <= 0) {
        currentIndex = maxIndex;
      }
      else {
        currentIndex--;
      }
      $('.carousel-container').children().eq(1).children().eq(currentIndex).css({display: 'block'})
    }
    
    
  // flipCard
    // const flipCard = () => {
    //   console.log($(event.target))
    //   // $(event.target).
    // }
    
    
  // Filter bar
    // const filter = (type) => {
    //   if (type == 'news') {
    // 
    //   }
    //   else if (type == 'routes') {
    //     const routeTypes = ['boulder','trad','sport']
    //     const $filterType = $('<select>').attr('name','Tyes').attr('id', 'routeFilterType')
    //     // const $option
    // 
    // 
    //     const $div = $('<div>')
    // 
    //     const $filterBar = $('<nav>').addClass('routefilterbar-container')
    //     $('.navbar-container').after($filterBar)
    //   }
    // 
    // }
    
    
    

 $(() => {
   
   navigator.geolocation.getCurrentPosition(positionSuccess);


   $('.location-container').on('submit', (event) => {
     $('.weather-bar').empty();
     $('.weather-icon').remove();
     event.preventDefault();
     getWeather($('input[type="text"]').val().toLowerCase(),2)
     $('input[type="text"]').val("")
     // console.log($('.weather-bar').eq(0))
   })
   
    // $('#searchBar').on('submit', (event) => {
    //   $('.content-container').empty();
    //   $('.poweredby').empty();
    //   event.preventDefault();
    // })
   
   
   
   $('#nav-news').on('click', (event) => {
     $('.content-container').empty();
     $('.poweredby').empty();
     getNews();
   })
   
   
   $('#nav-routes').on('click', (event) => {
     $('.content-container').empty();
     $('.poweredby').empty();
     getRoutes(2, locationLat, locationLong);
   })
   
   
   $('#nav-weather').on('click', (event) => {
     $('.content-container').empty();
     $('.poweredby').empty();
     console.log($('#cityName').text())
     if ($('#cityName').text() == "") {
       const $unknownLocation = $('<h2>').text(`Please indicate location in Weather Information Section (Top Right)`);
       $('.content-container').append($unknownLocation)
     }
     else {getWeatherForecast($('#cityName').text())};
   })
   
   
 })

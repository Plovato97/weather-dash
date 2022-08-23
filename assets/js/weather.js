var cityEl  = document.querySelector("#city")
var searchEl = document.querySelector("#search-btn")
var cityDate = document.querySelector("#cityDate")

var imgEl = document.querySelector("#current-img")
var tempEl = document.querySelector("#temperature")
var humidityEl = document.querySelector("#humidity")
var windEl = document.querySelector("#wind-speed")
var uvEl = document.querySelector("#UV-index")
var forecastContainerEl = document.querySelector("#forecast");
var forecastContainerHeadingEl = document.querySelector("#forecast-heading");

var searchHistoryButtonsEl = document.querySelector(".btn-secondary");
var searchHistoryContainerEl = document.querySelector("#search-history");
var citiesArray = [];


var weatherCall = function(cityName) {
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc";
fetch(apiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        displayWeather(data)

var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc`
        return fetch(uvIndex)
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (dataUv) {
        console.log(dataUv);
        forecastWeather(dataUv);   
    });

};

var citySearch = function(event) {
    event.preventDefault();
    
    var searchTerm = cityEl.value.trim();

    if (searchTerm) {
        weatherCall(searchTerm);
        cityEl.value = "";
    } else if (searchTerm === searchTerm) {
    console.log("Same City")
    }
     storeCities(searchTerm);
     loadCities();
};
  
var forecastWeather = function(dataUv) {
    forecastContainerEl.textContent = "";
    uvEl.textContent = "Current UVI index: " + dataUv.daily[0].uvi;

    if (dataUv.daily[0].uvi <= 4) {
        uvEl.setAttribute("class", "uvi-low p element");
      } else if (dataUv.daily[0].uvi <= 7) {
        uvEl.setAttribute("class", "uvi-moderate p-element");
      } else uvEl.setAttribute("class", "uvi-high p-element");

    forecastContainerHeadingEl.textContent = "5-Day Forecast";
  
    for (var i = 1; i < 6; i++) {
      var forecastUnixDate = dataUv.daily[i].dt;
  
      var date = new Date(forecastUnixDate * 1000);
      var month = date.getMonth();
      var day = date.getDate();
      var year = date.getFullYear();
  
      var forecastFormattedTime = parseInt(month) + 1 + "/" + day + "/" + year;
  
      var forecastDayEl = document.createElement("div");
      var forecastDateEl = document.createElement("p");
      var forecastIconEl = document.createElement("p");
      var forecastTempEl = document.createElement("p");
      var forecastWindSpeedEl = document.createElement("p");
      var forecastHumidityEl = document.createElement("p");
  
      forecastDateEl.classList.add("forecast-title")
      forecastDateEl.textContent = forecastFormattedTime;
      forecastIconEl.innerHTML = `<img src='http://openweathermap.org/img/wn/${dataUv.daily[i].weather[0].icon}@2x.png'/>`;
      forecastTempEl.textContent = `Temp: ${dataUv.daily[i].temp.day}°F`;
      forecastWindSpeedEl.textContent = `Windspeed: ${dataUv.daily[i].wind_speed} mph`;
      forecastHumidityEl.textContent = `Humidity: ${dataUv.daily[i].humidity}%`;
  
  
      forecastDayEl.appendChild(forecastDateEl);
      forecastDayEl.appendChild(forecastIconEl);
      forecastDayEl.appendChild(forecastTempEl);
      forecastDayEl.appendChild(forecastWindSpeedEl);
      forecastDayEl.appendChild(forecastHumidityEl);
      forecastContainerEl.appendChild(forecastDayEl);
    }
  };

  var displayWeather = function(data) {
    
    var searchValid = document.createElement("span");
        searchValid.textContent = data.name;
        searchValid.classList.add("d-flex", "card-title", "justify-content-start", "flex-row", "shadow-sm", "weather-title");
        cityDate.append(searchValid);
    
    var timeSet = document.createElement("h4")
        var currentDate = data.dt;
        var date = new Date(currentDate * 1000);
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        var forecastFormattedTime = parseInt(month) + 1 + "/" + day + "/" + year;
        timeSet.textContent = forecastFormattedTime;
        searchValid.append(timeSet)

  imgEl.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'/>`;
  tempEl.textContent = "Current temperature: " + data.main.temp + "°F";
  humidityEl.textContent = "Current humidity: " + data.main.humidity + "%";
  windEl.textContent = "Current wind speed: "  + data.wind.speed + "mph";
};

  var storeCities = function (city) {
    citiesArray = JSON.parse(localStorage.getItem("search-history")) || [];
    citiesArray.push(city);
    localStorage.setItem("search-history", JSON.stringify(citiesArray));
  };
  
  var loadCities = function () {
    var storedCities = JSON.parse(localStorage.getItem("search-history"));
  
    searchHistoryContainerEl.textContent = "";
  
    for (var i = 0; i < storedCities.length; i++) {
      var searchHistoryButtonEl = document.createElement("button");
      searchHistoryButtonEl.textContent = storedCities[i];
      searchHistoryButtonEl.setAttribute("data-search", storedCities[i]);
      searchHistoryButtonEl.setAttribute("class","btn btn-secondary btn-block p-2");
      searchHistoryButtonEl.setAttribute("type", "submit");
      searchHistoryButtonEl.setAttribute("id", "search-history-button");
      searchHistoryContainerEl.appendChild(searchHistoryButtonEl);
    }
  };
  
  $(document).ready(loadCities);


searchEl.addEventListener("click", citySearch);

document
  .querySelector("#search-history")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var city = event.target.dataset.search;
    console.log(city);
    weatherCall(city);
  });
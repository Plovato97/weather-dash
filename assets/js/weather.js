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
    } else
     window.alert("You must chose a city");
}

var displayWeather = function(data) {
var cityDisplay = {
    name:data.name,
};

    var searchValid = document.createElement("span");
        searchValid.textContent = cityDisplay.name;
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
  windEl.textContent = "Current windspeed: " + data.wind.speed + "mph";
};
    
var forecastWeather = function(dataUv) {

    uvEl.textContent = "Current UV index " + dataUv.current.uvi;
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


searchEl.addEventListener("click", citySearch);
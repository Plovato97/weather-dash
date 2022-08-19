var cityEl  = document.querySelector("#city")
var searchEl = document.querySelector("#search-btn")
var cityDate = document.querySelector("#cityDate")


var weatherCall = function(cityName) {
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8a42d43f7d7dc180da5b1e51890e67dc";
fetch(apiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        displayWeather(data);

var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
        return fetch(uvIndex)
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (dataUv) {
        console.log(dataUv);
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
        searchValid.classList.add("d-flex", "card-title", "justify-content-center", "justify-content-between", "shadow-sm", "weather-title");
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

}

searchEl.addEventListener("click", citySearch);
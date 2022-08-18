var weatherCall = "";
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
var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
        return fetch(uvIndex)
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    });
};

var citySearch = function(event) {
    event.preventDefault();
    
    var searchTerm = cityEl.value.trim();

    if (searchTerm) {
        weatherCall(searchTerm)
        searchTerm = "";
    }else console.warn("you must chose a city");



}

searchEl.addEventListener("click", citySearch)
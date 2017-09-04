$(document).ready(function () {
    // Init Page Function
    getUserLocation();

    // Setup Key Bindings
    $("#unitBtn").on("click", changeUnit_click);

    
});

// Global Variables
var _temp;

// Functions
function getUserLocation() {    
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = Math.floor(position.coords.latitude);
            long = Math.floor(position.coords.longitude);
            getWeatherData(lat, long);
        });
    }
};

function getWeatherData(lat, long) {
    $.ajax({
        url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long,
        contentType: "application/json",
        success: function (data) {
            _temp = data.main["temp"];
            sortData(data);
        }
    });
}

function sortData(data) {
    $("#tempPara").text(_temp + " °C");
    $("#locationPara").text(data.name + ", " + data.sys["country"]);
    $("#skyPara").text(data.weather[0].description);
    $("#windPara").text(data.wind["speed"] + " knots");
    $("#iconDiv").html("<img src='" + data.weather[0].icon + "'></img>");
}

function changeUnit_click() {   
    var currentUnit = $("#unitBtn").text();     
    var newTemp;

    if (currentUnit == "Celsius") {
        $("#unitBtn").text("Fahrenheit");
        newTemp = Math.floor(_temp * 9 / 5 + 32);
        $("#tempPara").text(newTemp + " °F");
    } else if (currentUnit == "Fahrenheit") {
        $("#unitBtn").text("Celsius");
        $("#tempPara").text(_temp + " °C");
    }
    return;
}
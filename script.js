document.addEventListener("DOMContentLoaded", function () {
    // Display weather for Faisalabad by default
    getWeather("Faisalabad", "current-weather");
    getWeatherForecast("Faisalabad", "tomorrows-weather");

    // Fetch weather for other cities
    var cities = ["Lahore", "Karachi", "Islamabad"];
    cities.forEach(function (city) {
        getWeatherPreview(city);
    });
});

function getWeather(city, elementId) {
    var apiKey = 'e37320785d23ccd0ac41357e18680a81'; 

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            displayWeather(response, elementId);
        }
    };
    xhr.send();
}

function getWeatherForecast(city, elementId) {
    var apiKey = 'e37320785d23ccd0ac41357e18680a81'; 

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            displayForecast(response, elementId);
        }
    };
    xhr.send();
}

function getWeatherPreview(city) {
    var apiKey = 'e37320785d23ccd0ac41357e18680a81'; 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            displayWeatherPreview(response, city);
        }
    };
    xhr.send();
}

function displayWeather(data, elementId) {
    var weatherInfo = document.getElementById(elementId);
    weatherInfo.innerHTML = `
        <p>${data.name}, ${data.sys.country}</p>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data, elementId) {
    var tomorrowData = data.list[8]; 
    var weatherInfo = document.getElementById(elementId);
    weatherInfo.innerHTML = `
        <p>${tomorrowData.dt_txt}</p>
        <p>${tomorrowData.weather[0].description}</p>
        <p>Temperature: ${(tomorrowData.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Humidity: ${tomorrowData.main.humidity}%</p>
        <p>Wind Speed: ${tomorrowData.wind.speed} m/s</p>
    `;
}

function displayWeatherPreview(data, city) {
    var weatherPreviews = document.getElementById("weather-previews");
    var weatherPreview = document.createElement("div");
    weatherPreview.classList.add("weather-preview");
    weatherPreview.innerHTML = `
        <p>${city}</p>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    weatherPreviews.appendChild(weatherPreview);
}

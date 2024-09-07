// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// My Key to the API
const apiKey = 'c736087210f54ed88b9133242240709';

// Fetch weather by city
function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Fetch forecast for the next days
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => console.log(err));
}

// Weather based on current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=6`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(err => console.log(err));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Display current weather and forecast
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');

    // Display current weather
    const currentWeather = `
        <h3>Current Weather in ${data.location.name}, ${data.location.region}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <p>Wind Speed: ${data.current.wind_kph} kph</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <img src="${data.current.condition.icon}" alt="weather icon">
    `;

    // Get today's date to compare with forecast days
    const today = new Date().toISOString().split('T')[0];  // Format: YYYY-MM-DD

    // Display the next days
    let forecastHTML = `<h3>5-Day Forecast (Starting Today):</h3>`;
    data.forecast.forecastday.forEach(day => {
        if (day.date > today) { 
            forecastHTML += `
                <div class="forecast-day">
                    <h4>${new Date(day.date).toDateString()}</h4>
                    <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                    <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    <p>Condition: ${day.day.condition.text}</p>
                    <img src="${day.day.condition.icon}" alt="weather icon">
                </div>
            `;
        }
    });

    // Combine current weather and forecast in one display
    weatherInfo.innerHTML = currentWeather + forecastHTML;
}


// Link to the PM Accelerator's LinkedIn page
function showInfo() {
    window.open('https://www.linkedin.com/company/pm-accelerator', '_blank');
}


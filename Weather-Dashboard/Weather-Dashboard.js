const API_KEY = "f0e0aa380e5deffdd0e737439f06d476";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Elements to update
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const searchHistory = document.getElementById("search-history");

async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(city);

    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    // Update all the DOM elements with weather data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function saveToHistory(city) {
    // Save to localStorage
    let history = JSON.parse(localStorage.getItem("recentSearches")) || [];

    // Remove city if it's already in the list
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add city to the front
    history.unshift(city);

    // Only keep the last 5 searches
    history = history.slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    // Load from localStorage and display
    let history = JSON.parse(localStorage.getItem("recentSearches")) || [];

    searchHistory.innerHTML = "";

    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });
        searchHistory.appendChild(li);
    });
}

// Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Initialize
loadHistory();
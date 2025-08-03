// Weather App JavaScript
const API_KEY = "56b314638acf037d7c049a3aa1b6e781"; // Replace with your actual OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const input_weather = document.getElementById("input_weather");
const searchbtn = document.getElementById("searchbtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const errormessage = document.getElementById("errorMessage");

// Weather Data Elements
const cityname = document.getElementById("cityname");
const temp = document.getElementById("temp");
const weatherDescription = document.getElementById("WeatherDescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");

// Event Listeners
searchbtn.addEventListener("click", handleSearch);
input_weather.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Function to hide all display sections
function hideAllSections() {
  weatherDisplay.style.display = "none";
  loading.style.display = "none";
  errormessage.style.display = "none";
}

// Function to show loading indicator
function showLoading() {
  hideAllSections();
  loading.style.display = "block";
}

// Function to show error message
function showError(message) {
  hideAllSections();
  errormessage.textContent = message;
  errormessage.style.display = "block";
}

// Main search handler function
function handleSearch() {
  const city = input_weather.value.trim();
  if (!city) {
    showError("Please enter a city.");
    return;
  }
  showLoading();
  fetchWeatherData(city);
}

// Fetch weather data from API
async function fetchWeatherData(city) {
  try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the city name.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your API key.");
      } else {
        throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
      }
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    showError(error.message);
  }
}

// Display weather data on the page
function displayWeatherData(data) {
  hideAllSections();
  weatherDisplay.style.display = "block";

  // Update DOM elements with weather data
  cityname.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  feelslike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windspeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
}

// Initialize the app by hiding all sections
hideAllSections();
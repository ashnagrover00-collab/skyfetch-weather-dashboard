// Your OpenWeatherMap API Key
const API_KEY = "0ee82d10b031690c52cb6e5cdd6761a5";  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
function getWeather(city) {
    // Build the complete URL
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Make API call using Axios
    axios.get(url)
        .then(function(response) {
            // Success! We got the data
            console.log('Weather Data:', response.data);
            displayWeather(response.data);
        })
        .catch(function(error) {
            // Something went wrong
            console.error('Error fetching weather:', error);
            document.getElementById('weather-display').innerHTML = 
                '<p class="loading">Could not fetch weather data. Please try again.</p>';
        });
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Call the function when page loads
getWeather('London');
getWeather('Paris');     // Try Paris
getWeather('New York');  // Try New York
getWeather('Tokyo');

// Convert to async/await
async function getWeather(city) {
    // Build the API URL (replace with your actual API key)
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Await axios request
        const response = await axios.get(url);

        // Log full response (for debugging)
        console.log("API Response:", response);

        // Call displayWeather with the response data
        displayWeather(response.data);

    } catch (error) {
        // Log error for debugging
        console.error("Error fetching weather:", error);

        // Call showError function
        showError("City not found. Please try again.");
    }
}

// Create showError function
function showError(message) {
    const weatherDisplay = document.getElementById("weather-display");

    const errorHTML = `
        <div class="error-message">
            <h3>⚠️ Oops!</h3>
            <p>${message}</p>
        </div>
    `;

    weatherDisplay.innerHTML = errorHTML;
}

// Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Function to handle search logic
function handleSearch() {
    const city = cityInput.value.trim(); // remove extra spaces

    if (city !== "") {
        getWeather(city);      // Call weather function
        cityInput.value = "";  // Clear input (nice UX)
    } else {
        showError("Please enter a city name.");
    }
}

// Add click event listener to search button
searchBtn.addEventListener("click", function () {
    handleSearch();
});

// BONUS: Add Enter key support
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

document.getElementById('weather-display').innerHTML = `
    <div class="welcome-message">
        <h2>🌤️ Welcome to the Weather App</h2>
        <p>Enter a city name to get started!</p>
    </div>
`;

// Show loading state
function showLoading() {
    const weatherDisplay = document.getElementById("weather-display");

    const loadingHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;

    weatherDisplay.innerHTML = loadingHTML;
}

async function getWeather(city) {
    // Show loading immediately
    showLoading();

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);

        // Replace loading with weather data
        displayWeather(response.data);

    } catch (error) {
        console.error("Error:", error);

        // Handle specific errors
        if (error.response && error.response.status === 404) {
            showError("City not found. Please check the spelling and try again.");
        } else {
            showError("Something went wrong. Please try again later.");
        }
    }
}

// Get references
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Centralized search handler
function handleSearch() {
    const city = cityInput.value.trim();

    // 1️⃣ Empty check
    if (!city) {
        showError("Please enter a city name.");
        cityInput.focus();
        return;
    }

    // 2️⃣ Minimum length check
    if (city.length < 2) {
        showError("City name too short. Please enter at least 2 characters.");
        cityInput.focus();
        return;
    }

    // If valid → fetch weather
    getWeather(city);
}

// Click event
searchBtn.addEventListener("click", handleSearch);

// Enter key support
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

async function getWeather(city) {
    showLoading();

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // Disable button
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 404) {
            showError("City not found. Please check the spelling and try again.");
        } else {
            showError("Something went wrong. Please try again later.");
        }
    } finally {
        // Re-enable button
        searchBtn.disabled = false;
        searchBtn.textContent = "🔍 Search";
    }
}

// function displayWeather(data) {
//     const weatherDisplay = document.getElementById("weather-display");

//     const weatherHTML = `
//         <div class="weather-card">
//             <h2>${data.name}, ${data.sys.country}</h2>
//             <h3>${Math.round(data.main.temp)}°C</h3>
//             <p>${data.weather[0].description}</p>
//         </div>
//     `;

//     weatherDisplay.innerHTML = weatherHTML;

//     // ✅ Focus back to input for quick new search
//     cityInput.focus();
// }
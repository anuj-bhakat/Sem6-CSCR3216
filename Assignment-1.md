
# Assignment - 1
# The JavaScript Developer's Handbook & Capstone Integration

**Target Audience:** Junior Developers onboarding to Modern JS
Standards\
**Philosophy:** Write code for humans first, computers second.

------------------------------------------------------------------------

# Part 1: The Core Engine (ES6+ Fundamentals)

## 1. Scope & Declaration: var vs let vs const

### The Logic

Variable declaration signals intent.

-   `const` → Default. Prevents reassignment. Encourages immutability.
-   `let` → Use when value must change.
-   `var` → Legacy. Avoid.

### ❌ The Bad Way

``` javascript
console.log(username);
var username = "Coder123";

if (true) {
  var username = "Hacker";
}

console.log(username);
```

### ✅ The Pro Way

``` javascript
const profile = "Coder123";

if (true) {
  const profile = "Hacker";
  console.log("Inside:", profile);
}

console.log("Outside:", profile);
```

------------------------------------------------------------------------

## 2. Modern Functions: Arrow Functions & this

### ❌ Dynamic `this`

``` javascript
function User(name) {
  this.name = name;

  setTimeout(function() {
    console.log("Hello " + this.name);
  }, 1000);
}
```

### ✅ Lexical `this`

``` javascript
function User(name) {
  this.name = name;

  setTimeout(() => {
    console.log(`Hello ${this.name}`);
  }, 1000);
}

const double = num => num * 2;
```

------------------------------------------------------------------------

## 3. Array Mastery

``` javascript
const cart = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Mouse", price: 50, inStock: false },
  { name: "Keyboard", price: 100, inStock: true }
];
```

### ❌ Imperative

``` javascript
let total = 0;
let names = [];

for (let i = 0; i < cart.length; i++) {
  if (cart[i].inStock) {
    names.push(cart[i].name);
    total += cart[i].price;
  }
}
```

### ✅ Declarative

``` javascript
const stockNames = cart
  .filter(item => item.inStock)
  .map(item => item.name);

const totalCost = cart
  .filter(item => item.inStock)
  .reduce((acc, item) => acc + item.price, 0);
```

------------------------------------------------------------------------

## 4. Objects & Destructuring

``` javascript
const user = { id: 1, name: "Alice", details: { age: 25, city: "NY" } };

const { name, details: { city } } = user;

const defaultSettings = { theme: "light", notifications: true };
const userSettings = { theme: "dark" };

const finalConfig = { ...defaultSettings, ...userSettings };
```

------------------------------------------------------------------------

# Part 2: The Interface (DOM & Storage)

## Selection & Modification

``` javascript
const btn = document.querySelector('[data-action="submit"]');

btn.classList.add('loading');
btn.innerText = "Processing...";
```

------------------------------------------------------------------------

## Event Delegation

``` javascript
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log("Clicked:", e.target.innerText);
  }
});
```

------------------------------------------------------------------------

## LocalStorage

``` javascript
localStorage.setItem("user", JSON.stringify(userObj));

const user = JSON.parse(localStorage.getItem("user"));
```

------------------------------------------------------------------------

# Part 3: The Data Flow (Async JavaScript)

## Async/Await with Error Handling

``` javascript
const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.weather.com/v1/${city}`
    );

    if (!response.ok) {
      throw new Error(`City not found (${response.status})`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("App Error:", error);
    alert("Sorry! We couldn't find that weather report.");
  }
};
```

------------------------------------------------------------------------

# Part 4: Capstone Mini-Project -- CryptoTracker

## Project Overview

CryptoTracker is a Single Page Application that:

-   Fetches live cryptocurrency prices from the CoinGecko API
-   Allows users to search coins
-   Dynamically renders results
-   Saves favorite coins to LocalStorage
-   Handles API errors gracefully

Public API Used: https://api.coingecko.com/api/v3

------------------------------------------------------------------------

# Project Structure

index.html\
style.css\
app.js

------------------------------------------------------------------------

# index.html

``` html
<!DOCTYPE html>
<html>
<head>
  <title>CryptoTracker</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>CryptoTracker</h1>

  <input type="text" id="search-input" placeholder="Search crypto (e.g., bitcoin)">
  <button id="search-btn">Search</button>

  <h2>Results</h2>
  <div id="results"></div>

  <h2>Favorites</h2>
  <div id="favorites"></div>

  <script src="app.js"></script>
</body>
</html>
```

------------------------------------------------------------------------

# style.css

``` css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}
```

------------------------------------------------------------------------

# app.js

``` javascript
// DOM Cache
const dom = {
  input: document.querySelector('#search-input'),
  btn: document.querySelector('#search-btn'),
  results: document.querySelector('#results'),
  favorites: document.querySelector('#favorites')
};

// State Initialization
let state = {
  favorites: JSON.parse(localStorage.getItem('crypto_favs')) || []
};

// Save to LocalStorage
const saveState = () => {
  localStorage.setItem('crypto_favs', JSON.stringify(state.favorites));
};

// Render Favorites
const renderFavorites = () => {
  dom.favorites.innerHTML = state.favorites.map(coin => `
    <div class="card">
      <strong>${coin.name}</strong> - $${coin.price}
      <button onclick="removeFavorite('${coin.id}')">Remove</button>
    </div>
  `).join('');
};

// Add Favorite
const addFavorite = (coin) => {
  const exists = state.favorites.some(f => f.id === coin.id);
  if (!exists) {
    state.favorites.push(coin);
    saveState();
    renderFavorites();
  } else {
    alert("Already added!");
  }
};

// Remove Favorite
const removeFavorite = (id) => {
  state.favorites = state.favorites.filter(f => f.id !== id);
  saveState();
  renderFavorites();
};

window.removeFavorite = removeFavorite;

// Render Results
const renderResults = (coins) => {
  dom.results.innerHTML = coins.map(coin => `
    <div class="card">
      <strong>${coin.name}</strong> 
      <p>Price: $${coin.current_price}</p>
      <button onclick='addFavorite({
        id: "${coin.id}", 
        name: "${coin.name}", 
        price: "${coin.current_price}"
      })'>Add to Favorites</button>
    </div>
  `).join('');
};

window.addFavorite = addFavorite;

// Search Logic
const searchCrypto = async () => {
  const query = dom.input.value.trim().toLowerCase();
  if (!query) return;

  dom.results.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();

    const filtered = data.filter(coin =>
      coin.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      dom.results.innerHTML = "<p>No coins found.</p>";
      return;
    }

    renderResults(filtered.slice(0, 10));

  } catch (error) {
    console.error(error);
    dom.results.innerHTML = 
      "<p>Network error. Please try again later.</p>";
  }
};

// Event Listeners
dom.btn.addEventListener('click', searchCrypto);
dom.input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchCrypto();
});

// Initialize
renderFavorites();
```

------------------------------------------------------------------------

# Technical Checklist

✔ Live API Data\
✔ Search Interaction\
✔ Dynamic DOM Rendering\
✔ LocalStorage Persistence\
✔ Error Handling

------------------------------------------------------------------------

# How I Built This

1.  Initialized state from LocalStorage.
2.  Created reusable render functions.
3.  Implemented async search with try/catch.
4.  Prevented duplicate favorites using `.some()`.
5.  Saved state after every mutation.


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

The HTML structure has been created in [`index.html`](index.html) with the CryptoTracker interface.

------------------------------------------------------------------------

# style.css

The styling has been created in [`style.css`](style.css).

------------------------------------------------------------------------

# app.js

The JavaScript logic has been created in [`app.js`](app.js) with the following features:

- DOM cache for efficient element selection
- State management with LocalStorage persistence
- Favorites functionality (add/remove)
- Async API calls to CoinGecko
- Search with filtering
- Error handling

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

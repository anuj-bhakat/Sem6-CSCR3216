const searchInput = document.querySelector("#s"),
  searchButton = document.querySelector("#b"),
  resultsContainer = document.querySelector("#r"),
  favoritesContainer = document.querySelector("#f");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const saveFavorites = () => localStorage.setItem("favorites", JSON.stringify(favorites));
const renderCards = (coins) =>
  coins
    .map(
      (coin) =>
        `<div class="card"><h3>${coin.name}</h3><p class="p">$${coin.price}</p><button class="remove" onclick="removeFavorite('${coin.id}')">Remove</button></div>`,
    )
    .join("");
const renderFavorites = () => (favoritesContainer.innerHTML = favorites.length ? renderCards(favorites) : "<p>No favorites</p>");
const addFavorite = (id, name, price) => {
  if (!favorites.some((coin) => coin.id === id)) {
    favorites.push({ id, name, price });
    saveFavorites();
    renderFavorites();
  }
};
const removeFavorite = (id) => {
  favorites = favorites.filter((coin) => coin.id !== id);
  saveFavorites();
  renderFavorites();
};
window.removeFavorite = removeFavorite;
window.addFavorite = addFavorite;
searchButton.onclick = searchInput.onkeydown = (event) => {
  if (event.key && event.key !== "Enter") return;
  searchInput.value &&
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => response.json())
      .then(
        (coins) =>
          (resultsContainer.innerHTML = coins
            .filter((coin) => coin.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            .slice(0, 10)
            .map(
              (coin) =>
                `<div class="card"><h3>${coin.name}</h3><p class="p">$${coin.current_price}</p><button class="add" onclick='addFavorite("${coin.id}","${coin.name}",${coin.current_price})'>Add</button></div>`,
            )
            .join("")),
      );
};
renderFavorites();

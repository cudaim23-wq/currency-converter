import { Favorite } from "./models/Favorite.js";

const FAVORITES_KEY = "favorites";
const HISTORY_KEY = "history";

export function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(from, to) {
    const favorites = getFavorites();
    const isDuplicate = favorites.some(
        (favorite) => favorite.tu_tien_te === from && favorite.den_tien_te === to
    );
    if (isDuplicate) {
        return;
    }
    const newFavorites = [...favorites, new Favorite(from, to)];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}

export function removeFavorite(id) {
    const favorites = getFavorites();
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}

export function getHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

export function addHistory(item) {
    const history = getHistory();
    const newHistory = [item, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}

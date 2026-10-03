import "../styles/style.css";
import { convertAmount, getRates } from "./api.js";
import {
    showLoading,
    showResult,
    showError,
    renderHistory,
    renderFavorites,
    renderTable,
    showTableLoading,
    showTableError,
    showUpdatedAt,
} from "./ui.js";
import { getHistory, addHistory, clearHistory, getFavorites, addFavorite, removeFavorite } from "./storage.js";
import { HistoryItem } from "./models/HistoryItem.js";

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");
const favoriteBtn = document.getElementById("favorite-btn");
const favoriteList = document.getElementById("favorite-list");
const clearHistoryBtn = document.getElementById("clear-history-btn");

async function loadRateTable() {
    const base = fromSelect.value;
    showTableLoading();
    try {
        const { rates } = await getRates(base);
        renderTable(base, rates);
        showUpdatedAt(rates[0].thoi_diem_cap_nhat);
    } catch (error) {
        showTableError(error.message);
    }
}

convertBtn.addEventListener("click", async () => {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    showLoading(true);
    try{
        const data = await convertAmount(amount, from, to);
        showResult(data);
        addHistory(new HistoryItem(data.from, data.to, data.amount, data.result));
        renderHistory(getHistory());
    }catch(error){
        showError(error.message);
    }
});

swapBtn.addEventListener("click", () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    loadRateTable();
});

fromSelect.addEventListener("change", loadRateTable);

favoriteBtn.addEventListener("click", () => {
    addFavorite(fromSelect.value, toSelect.value);
    renderFavorites(getFavorites());
});

// Các nút "Dùng" / "Xóa" được tạo lại mỗi lần render, nên bắt sự kiện ở thẻ <ul> cha
favoriteList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }
    const { action, id, from, to } = button.dataset;
    if (action === "use") {
        fromSelect.value = from;
        toSelect.value = to;
        loadRateTable();
    }
    if (action === "remove") {
        removeFavorite(Number(id));
        renderFavorites(getFavorites());
    }
});

clearHistoryBtn.addEventListener("click", () => {
    clearHistory();
    renderHistory(getHistory());
});

renderHistory(getHistory());
renderFavorites(getFavorites());
loadRateTable();

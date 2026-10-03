import { Rate } from "./Rate.js";
import { CURRENCIES } from "../config/currencies.js";

const API_URL = "https://open.er-api.com/v6/latest/USD";
const CACHE_TIME = 60 * 60 * 1000;

let cache = null;
let cachedAt = 0;

async function fetchUsdRates() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Không gọi được API tỷ giá");
    }
    const data = await response.json();
    if (data.result !== "success") {
        throw new Error("API tỷ giá trả về lỗi");
    }
    return {
        rates: data.rates,
        updatedAt: new Date(data.time_last_update_utc).toISOString(),
    };
}

async function getUsdRates() {
    if (cache !== null && Date.now() - cachedAt < CACHE_TIME) {
        return cache;
    }
    console.log("Gọi API tỷ giá");
    cache = await fetchUsdRates();
    cachedAt = Date.now();
    return cache;
}

export async function convert(amount, from, to) {
    const { rates } = await getUsdRates();
    if (typeof amount !== "number" || amount <= 0) {
        throw new Error("Số tiền phải là số dương");
    }
    if (!rates[from] || !rates[to]) {
        throw new Error("Tiền tệ không hợp lệ");
    }
    return amount / rates[from] * rates[to];
}

export async function getRates(base) {
    const { rates, updatedAt } = await getUsdRates();
    return CURRENCIES.map(
        (code) => new Rate(code, rates[code] / rates[base], updatedAt)
    );
}

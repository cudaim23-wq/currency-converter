const API_URL = "/api";

export async function convertAmount(amount, from, to) {
    const response = await fetch(`${API_URL}/convert?amount=${amount}&from=${from}&to=${to}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

export async function getRates(base) {
    const response = await fetch(`${API_URL}/rates/${base}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

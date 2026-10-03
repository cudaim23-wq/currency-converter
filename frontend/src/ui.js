const resultEl = document.getElementById("result");
const statusEl = document.getElementById("status");
const historyListEl = document.getElementById("history-list");
const favoriteListEl = document.getElementById("favorite-list");
const tableBodyEl = document.getElementById("rate-table-body");
const tableBaseEl = document.getElementById("table-base");
const updatedAtEl = document.getElementById("updated-at");

// Số nhỏ hơn 1 (vd 1 VND = 0,0000381 USD) cần giữ chữ số có nghĩa, nếu làm tròn thập phân sẽ thành 0
const formatNumber = (value) =>
    value.toLocaleString(
        "vi-VN",
        value !== 0 && Math.abs(value) < 1 ? { maximumSignificantDigits: 4 } : { maximumFractionDigits: 2 }
    );
const formatTime = (isoString) => new Date(isoString).toLocaleString("vi-VN");

export function showLoading(isLoading) {
    statusEl.classList.remove("status--error");
    if(isLoading){
        statusEl.textContent = "Đang tải...";
    }else{
        statusEl.textContent = "";
    }
}

export function showResult({ amount, from, to, result }) {
    statusEl.textContent = "";
    resultEl.textContent = `${amount} ${from} = ${formatNumber(result)} ${to}`;
}

export function showError(message) {
    resultEl.textContent = "";
    statusEl.textContent = message;
    statusEl.classList.add("status--error");
}

export function showTableLoading() {
    tableBodyEl.innerHTML = `<tr><td colspan="2" class="table-message">Đang tải bảng tỷ giá...</td></tr>`;
}

export function showTableError(message) {
    tableBodyEl.innerHTML = `<tr><td colspan="2" class="table-message table-message--error">${message}</td></tr>`;
    updatedAtEl.textContent = "";
}

export function renderTable(base, rates) {
    tableBaseEl.textContent = base;
    tableBodyEl.innerHTML = rates
        .filter(({ ma_tien_te }) => ma_tien_te !== base)
        .map(({ ma_tien_te, ty_gia_so_voi_goc }) => `
            <tr>
                <td>${ma_tien_te}</td>
                <td>${formatNumber(ty_gia_so_voi_goc)}</td>
            </tr>`
        )
        .join("");
}

export function showUpdatedAt(isoString) {
    updatedAtEl.textContent = `Tỷ giá cập nhật lúc ${formatTime(isoString)}`;
}

export function renderHistory(history) {
    if (history.length === 0) {
        historyListEl.innerHTML = `<li class="list-empty">Chưa có lịch sử</li>`;
        return;
    }
    historyListEl.innerHTML = history
        .map(({ tu, den, so_tien, ket_qua, thoi_gian }) => `
            <li>
                <span>${formatNumber(so_tien)} ${tu} = <strong>${formatNumber(ket_qua)} ${den}</strong></span>
                <span class="list-time">${formatTime(thoi_gian)}</span>
            </li>`
        )
        .join("");
}

export function renderFavorites(favorites) {
    if (favorites.length === 0) {
        favoriteListEl.innerHTML = `<li class="list-empty">Chưa có cặp yêu thích</li>`;
        return;
    }
    favoriteListEl.innerHTML = favorites
        .map(({ id, tu_tien_te, den_tien_te }) => `
            <li>
                <span class="list-pair">${tu_tien_te} → ${den_tien_te}</span>
                <button data-action="use" data-from="${tu_tien_te}" data-to="${den_tien_te}">Dùng</button>
                <button data-action="remove" data-id="${id}">Xóa</button>
            </li>`
        )
        .join("");
}

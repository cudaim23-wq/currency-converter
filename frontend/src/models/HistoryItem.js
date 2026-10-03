export class HistoryItem {
   constructor(tu,den,so_tien,ket_qua){
    this.id = Date.now();
    this.thoi_gian = new Date().toISOString();
    this.tu = tu;
    this.den = den;
    this.so_tien = so_tien;
    this.ket_qua = ket_qua;
   }
}

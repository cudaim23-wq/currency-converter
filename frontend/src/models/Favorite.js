export class Favorite {
    constructor(tu_tien_te,den_tien_te){
        this.id = Date.now();
        this.thoi_gian = new Date().toISOString();
        this.tu_tien_te = tu_tien_te;
        this.den_tien_te = den_tien_te;
    }
}

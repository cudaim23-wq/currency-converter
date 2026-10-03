import { CURRENCIES } from "../config/currencies.js";
import * as rateModel from "../models/rateModel.js";

// GET /api/currencies
export const getCurrencies = (req, res) => {
    res.json({ currencies: CURRENCIES });
};


// Get /api/convert?amount=100&from=USD&to=VND
export const convertAmount = async (req, res) => {
 const{amount,from,to}=req.query;
 const amountNumber = Number(amount);   
 if(isNaN(amountNumber) || amountNumber <=0){
    return res.status(400).json({error: "Amount khong hop le"});
 }
 if(!CURRENCIES.includes(from) || !CURRENCIES.includes(to)){
    return res.status(400).json({error: "From or to not in CURRENCIES"});
 }
 try{
    const result = await rateModel.convert(amountNumber, from, to);
    res.json({ amount:amountNumber, from, to, result });
 }catch(error){
    console.error(error);
    res.status(502).json({ error: "Không lấy được tỷ giá, thử lại sau" });
 }
};

// GET /api/rates/:base   ví dụ /api/rates/USD
export const getRates = async (req, res) => {
    const{base}=req.params;
    if(!CURRENCIES.includes(base)){
        return res.status(400).json({error: "Base not in CURRENCIES"});
    }
    try{
        const rates = await rateModel.getRates(base);
        res.json({ base, rates });
    }catch(error){
        console.error(error);
        res.status(502).json({ error: "Không lấy được tỷ giá, thử lại sau" });
    }
};

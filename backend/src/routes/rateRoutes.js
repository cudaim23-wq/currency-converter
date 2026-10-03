import { Router } from "express";
import * as rateController from "../controllers/rateController.js";

const router = Router();

router.get("/currencies", rateController.getCurrencies);
router.get("/rates/:base", rateController.getRates);
router.get("/convert", rateController.convertAmount);

export default router;

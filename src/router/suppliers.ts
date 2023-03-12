import Router from "express";
import {Controller} from "../controller/controller";

const router = Router();

router.get("/suppliers", Controller.suppliers);
router.get("/suppliers/:supplierId", Controller.suppliersIndexed);

export default router;
import express from "express";
import { GetAll,Create,Update,Delete } from "../Controllers/EquipmentController.js";

const router = express.Router();

router.get("/",GetAll);
router.post("/",Create);
router.put("/:id",Update);
router.delete("/:id",Delete);

export default router;
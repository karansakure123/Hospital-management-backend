import express from "express"
import upload from '../../middlewares/multer.js';
import { createCorporate, deleteCorporate, getCorporate, getCorporateById, updateCorporate } from "../../controller/about/corporateController.js";
import { createEquipped, deleteEquipped, getEquipped, getEquippedById, updateEquipped } from "../../controller/about/equippedController.js"
 

const aboutRouter = express.Router();

aboutRouter.post("/corporate/addnew",upload, createCorporate);
aboutRouter.get("/corporate/getall", getCorporate);
aboutRouter.get("/corporate/get/:id", getCorporateById);
aboutRouter.put("/corporate/update/:id", updateCorporate);
aboutRouter.delete("/corporate/delete/:id", deleteCorporate);


aboutRouter.post("/equipped/addnew",upload, createEquipped);
aboutRouter.get("/equipped/getall", getEquipped);
aboutRouter.get('/equipped/get/:id', getEquippedById);
aboutRouter.put("/equipped/update/:id", updateEquipped);
aboutRouter.delete("/equipped/delete/:id", deleteEquipped);



export default aboutRouter;
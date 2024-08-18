import {createHero, getHero, getHeroById, updateHero, deleteHero} from "../../controller/homepage/heroController.js";
import express from "express"
const heroRouter = express.Router();
 heroRouter.post("/addnew",createHero )
heroRouter.get("/get/:id", getHeroById)
heroRouter.get("/getall",getHero )
heroRouter.put("/update/:id", updateHero)
heroRouter.delete("/delete/:id", deleteHero)
export default heroRouter;
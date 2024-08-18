import express from "express";
import { createNavBar, deleteNavBar, getNavBar, getNavBarById, updateNavBar } from "../../controller/homepage/navController.js";
   const navRouter  = express.Router()
navRouter.post("/addnew",  createNavBar)
navRouter.get("/getall",getNavBar)
navRouter.get("/get/:id",getNavBarById)
navRouter.put("/update/:id", updateNavBar)
navRouter.delete("/delete/:id", deleteNavBar )

export default navRouter
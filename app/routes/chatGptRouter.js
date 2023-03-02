// import {sampleController, samplePostController} from "../controllers/sampleController.js";
// import express from "express";
// import { composeDataController } from "../controllers/composeDataController.js";
const express = require('express');
const composeDataController = require("../controllers/composeDataController.js")

const router = express.Router();
const verifyJwt = require("../middleware/verifyJWT")
// router.get('/getAll', sampleController);
// router.use(verifyJwt)
router.post('/storyscape/compose', composeDataController)



module.exports = router

// import {sampleController, samplePostController} from "../controllers/sampleController.js";
// import express from "express";
// import { composeDataController } from "../controllers/composeDataController.js";
const express = require('express');
const composeDataController = require("../controllers/composeDataController.js")
const orderProcessController = require("../controllers/paymentGatewayController").orderProcessController
const router = express.Router();
const verifyJwt = require("../middleware/verifyJWT")
// router.get('/getAll', sampleController);
// router.use(verifyJwt)
router.post('/storyscape/compose', composeDataController)
router.post('/makeOrder',orderProcessController)


module.exports = router

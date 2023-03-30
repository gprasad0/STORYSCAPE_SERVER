// import {sampleController, samplePostController} from "../controllers/sampleController.js";
// import express from "express";
// import { composeDataController } from "../controllers/composeDataController.js";
const express = require('express');
const composeDataController = require("../controllers/composeDataController.js")
const orderProcessController = require("../controllers/paymentGatewayController").orderProcessController
const paymentProcessController = require("../controllers/paymentGatewayController").paymentProcessController
const verifyPaymentController = require("../controllers/paymentGatewayController").verifyPaymentController
const router = express.Router();
const verifyJwt = require("../middleware/verifyJWT")
// router.get('/getAll', sampleController);
router.use(verifyJwt)
router.post('/storyscape/compose', composeDataController)
router.post('/makeOrder',orderProcessController)
router.post('/paymentData',paymentProcessController)
router.post('/verifyPayment',verifyPaymentController)

module.exports = router

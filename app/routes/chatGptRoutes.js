// import {sampleController, samplePostController} from "../controllers/sampleController.js";
// import express from "express";
// import { composeDataController } from "../controllers/composeDataController.js";
const express = require('express');
const composeDataController = require("../controllers/composeDataController.js")

const router = express.Router();

// router.get('/getAll', sampleController);
router.post('/storyscape/compose', composeDataController)

module.exports = router

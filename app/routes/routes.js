import {sampleController, samplePostController} from "../controllers/sampleController.js";
import express from "express";
import { composeDataController } from "../controllers/composeDataController.js";
// const express = require('express');

const router = express.Router();

// router.get('/getAll', sampleController);
router.post('/storyscape/compose', composeDataController)

export default router;

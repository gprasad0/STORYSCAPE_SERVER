import {sampleController} from "../controllers/sampleController.js";
import express from "express";
// const express = require('express');

const router = express.Router();

router.get('/getAll', sampleController);

export default router;

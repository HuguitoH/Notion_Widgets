// src/routes/leetCodeRoutes.js

const express = require('express');
const router = express.Router();
const leetCodeController = require('../controllers/leetCodeController');

// Define la ruta GET para el progreso: /api/leetcode/progress
router.get('/progress', leetCodeController.getProgress);
router.get('/streak', leetCodeController.getStreak);
router.get('/heatmap', leetCodeController.getHeatmap);
router.get('/category', leetCodeController.getCurrentCategory);


module.exports = router;

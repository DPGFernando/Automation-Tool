import express from 'express';
import { viewCategories } from '../controllers/db.controllers.js';
import { getSpecifications } from '../controllers/db.controllers.js';
import { getTrustedSites } from '../controllers/db.controllers.js';
import { getGeminiResponse } from '../controllers/gemini.controllers.js';

const router = express.Router();

router.get('/categories', viewCategories);
router.get('/specifications/:categoryid', getSpecifications);
router.get('/trusted_sites/:categoryid', getTrustedSites);
router.post('/gemini', getGeminiResponse);

export default router;
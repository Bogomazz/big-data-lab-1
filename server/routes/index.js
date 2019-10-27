const express = require('express');
const axios = require('axios');
const router = express.Router();

const WORLD_BANK_URL = 'http://api.worldbank.org';

/* GET home page. */
router.get('/**', async function(req, res, next) {
  const wbRes = await axios.get(`${WORLD_BANK_URL}${req.url}`);
  res.json(wbRes.data);
});

module.exports = router;

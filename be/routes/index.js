const express = require('express');
const {Op} = require('sequelize');
const router = express.Router();
const CountriesModel = require('../db/countries.model');
const IndicatorsModel = require('../db/indicators.model');
const IndicatorsDataModel = require('../db/indicators-data.model');

router.get('/', function(req, res, next) {
  res.send('PONG');
});

router.get('/countries', async function (req, res, next) {
  const countries = await CountriesModel.findAll();
  res.send(countries);
});

router.get('/indicators', async function(req, res, next) {
  const indicators = await IndicatorsModel.findAll();
  res.send(indicators);
});

router.get('/indicators/:id/data', async function(req, res, data) {
  const countries = req.query.countries.split(',');
  const indicatorsData = await IndicatorsDataModel.findAll({
    where: {
      indicatorId: req.params.id,
      countryId: {
        [Op.or]: countries
      }
    }
  });
  res.send(indicatorsData);
});

module.exports = router;

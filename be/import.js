const readline = require('readline');
const fs = require('fs');
require('dotenv').config();

const axios = require('axios');
const CountriesModel = require('./db/countries.model');
const IndicatorsModel = require('./db/indicators.model');
const IndicatorsDataModel = require('./db/indicators-data.model');

CountriesModel.findAll()
  .then(async countries => {
    const fileStream = fs.createReadStream('./metrics.js');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {

      let indicator = await IndicatorsModel.findOne({ where: {id: line}});
      if (indicator) {
        console.log('already imported');
        continue;
      }

      const res = await axios.get(`http://api.worldbank.org/indicators/${line}?format=json`);
      indicator = res.data[1][0];

      await IndicatorsModel.create({id: indicator.id, name: indicator.name});
      for (const c of countries) {
        const dataRes =await axios.get(`http://api.worldbank.org/countries/${c.id}/indicators/${line}?format=json&per_page=100`);
        if (!dataRes.data[1]) {
          console.error(`indicator ${line} no data`);
          continue;
        }

        const indicatorsData = dataRes.data[1].map(indata => ({
          indicatorId: indicator.id,
          countryId: c.id,
          value: indata.value,
          date: indata.date
        }));

        await IndicatorsDataModel.bulkCreate(indicatorsData);
        console.log(`indicator ${line} imported`);
      }
    }
  });
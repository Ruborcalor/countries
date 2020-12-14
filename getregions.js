const axios = require('axios');

let regions = new Set();

axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
  const tmpCountries = res.data;
  console.log(tmpCountries);
  tmpCountries.forEach((countryObject) => {
    regions.add(countryObject.region);
  });
  console.log(regions);
});

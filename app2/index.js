const express = require('express');
const moment = require('moment-timezone');
const axios = require('axios');

const app = express();
const port = 4001;

app.get('/checker', async (req, res) => {
  const timezone = req.query.zone;
  console.log(`Timezone for: ${timezone}`);

  const response = await axios.get(`http://localhost:4000/tz?zone=${timezone}`);
  
  console.log(`API call ${JSON.stringify(response.data)}`);
  const data = response.data;

  //pasar response.data.time a moment() y validar que la hora sea >= 9 y <= 18

  res.json({ data });  
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
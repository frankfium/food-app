import express from 'express';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import cors from 'cors';
config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;

app.get('/api/restaurants', async (req, res) => {
    const { latitude, longitude, radius, opennow } = req.query;

    let response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&opennow=${opennow}&type=restaurant&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    let data = await response.json();

    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
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

    if (data.next_page_token) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${data.next_page_token}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        const moreData = await response.json();
        data.results = data.results.concat(moreData.results);
    }

    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
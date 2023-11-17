// RestaurantPicker.js
import React, { useState } from 'react';
import RestaurantList from './RestaurantList';

function RestaurantPicker() {
    const [restaurants, setRestaurants] = useState([]);
    const [pickedRestaurant, setPickedRestaurant] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [radius, setRadius] = useState(2); // Default radius
    const [opennow, setOpenNow] = useState(false); // Default opennow
    const pickRestaurant = () => {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            fetch(`http://192.168.1.13:5001/api/restaurants?latitude=${latitude}&longitude=${longitude}&radius=${radius * 1609.34}&opennow=${opennow}`)
                .then(response => response.json())
                .then(data => {
                    const uniqueRestaurants = Array.from(new Set(data.results.map(restaurant => restaurant.name)))
                        .map(name => {
                            return data.results.find(restaurant => restaurant.name === name);
                        });
                    setRestaurants(uniqueRestaurants);
                    const randomIndex = Math.floor(Math.random() * uniqueRestaurants.length);
                    setPickedRestaurant(uniqueRestaurants[randomIndex]);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }, error => {
            console.error('Error getting location:', error);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-picker">
            <button className="pick-button" onClick={pickRestaurant}>Pick a restaurant</button>
            <p className="picked-restaurant">Picked restaurant: {pickedRestaurant ? pickedRestaurant.name : ''}</p>
            <input type="number" value={radius} onChange={e => setRadius(e.target.value)} placeholder="Radius in Miles" />
            <input type="checkbox" checked={opennow} onChange={e => setOpenNow(e.target.checked)} /> Open Now
            <RestaurantList restaurants={restaurants.map(restaurant => restaurant.name)} />
        </div>
    );
}

export default RestaurantPicker;
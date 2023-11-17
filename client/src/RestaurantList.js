// RestaurantList.js
import React from 'react';

function RestaurantList({ restaurants }) {
    return (
        <ul>
            {restaurants.map((restaurant, index) => (
                <li key={index}>{restaurant}</li>
            ))}
        </ul>
    );
}

export default RestaurantList;
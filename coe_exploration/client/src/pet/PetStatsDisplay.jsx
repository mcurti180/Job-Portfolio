import React, { useState } from 'react';
import './PetStatsDisplay.css';

const PetStatsDisplay = ({ petStats }) => {
    const [showStats, setShowStats] = useState(false);

    const toggleStats = () => setShowStats(!showStats);

    return (
        <div className='BioengineeringReward'>
            {showStats && (
                <div className="statBoard">
                    <h3>{petStats.pet_name} is feeling...</h3>
                    <p>Mood: {petStats.mood}</p>
                    <p>Love: {petStats.love}</p>
                    <p>Recreation: {petStats.recreation}</p>
                    <p>Hunger: {petStats.hunger}</p>
                    <p>Cleanliness: {petStats.cleanliness}</p>
                </div>
            )}
            <button onClick={toggleStats} className="statsButton">
                {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
        </div>
    );
};

export default PetStatsDisplay;

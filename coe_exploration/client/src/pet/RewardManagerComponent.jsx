import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthComponent';
import './reward_manager_styles.css';

const RewardManager = ({ onClose }) => {
    const { accessToken } = useAuth();
    const [rewards, setRewards] = useState([]);
    const [activeOutfit, setActiveOutfit] = useState(null);
    const [activeCosmetics, setActiveCosmetics] = useState([]);
    const [petName, setPetName] = useState('O\'malley');
    const [newPetName, setNewPetName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRewards = async () => {
            const response = await fetch('/api/pet/rewards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPetName(data.petName);
                setRewards(data.rewards);
                setActiveOutfit(data.activeOutfit);
                setActiveCosmetics(data.activeCosmetics || []);
            } else {
                console.error(`Error status: ${response.status}`);
            }
        };
        fetchRewards();
    }, [accessToken]);

    const handleOutfitChange = async (rewardId) => {
        console.log('Attempting outfit change to:', rewardId);
        const response = await fetch('/api/pet/equip-outfit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ rewardId }),
        });
        if (response.ok) {
            setActiveOutfit(rewardId);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    const handleCosmeticToggle = async (rewardId, isActive) => {
        const response = await fetch('/api/pet/toggle-cosmetic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ rewardId, isActive }),
        });
        if (response.ok) {
            setActiveCosmetics((prev) => isActive ? [...prev, rewardId] : prev.filter((id) => id !== rewardId));
            console.log('Active cosmetics:', activeCosmetics);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    const handleDefaultOutfit = async () => {
        console.log('Setting outfit to default');
        const response = await fetch('/api/pet/equip-outfit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ rewardId: null }),
        });
        if (response.ok) {
            setActiveOutfit(null);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    const handlePetNameChange = async () => {
        if (newPetName.length === 0 || newPetName.length > 20) {
            setError('Pet name must be between 1 and 20 characters.');
            return;
        }

        const response = await fetch('/api/pet/change-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ newName: newPetName }),
        });
        if (response.ok) {
            setPetName(newPetName);
            setNewPetName('');
            setError('');
        } else {
            console.error(`Error status: ${response.status}`);
        }

        // Move back to the pet page
        onClose();
    };

    return (
        <div className="reward-popup">
            <h2>{petName}'s Outfits and Decorations</h2>
            <button className="close-button" onClick={onClose}>×</button>
            <h3>Outfits</h3>
            <div className="reward-list">
                <div className="reward-item">
                    <h3>Default</h3>
                    <p>Return to the default outfit</p>
                    <button
                        onClick={handleDefaultOutfit}
                        className={activeOutfit === null ? 'active' : ''}
                    >
                        {activeOutfit === null ? 'Equipped' : 'Equip'}
                    </button>
                </div>
                {rewards
                    .filter((reward) => reward.rewardType === 'outfit')
                    .map((reward) => (
                        <div key={reward.rewardID} className="reward-item">
                            <h3>{reward.rewardName}</h3>
                            <p>{reward.rewardDescription}</p>
                            <button
                                onClick={() => handleOutfitChange(reward.rewardID)}
                                className={activeOutfit === reward.rewardID ? 'active' : ''}
                            >
                                {activeOutfit === reward.rewardID ? 'Equipped' : 'Equip'}
                            </button>
                        </div>
                    ))}
            </div>
            <h3>Cosmetic Items</h3>
            <div className="reward-list">
                {rewards.filter((reward) => reward.rewardType === 'cosmetic')
                    .map((reward) => (
                        <div key={reward.rewardID} className="reward-item">
                            <h3>{reward.rewardName}</h3>
                            <p>{reward.rewardDescription}</p>
                            <button
                                onClick={() => handleCosmeticToggle(reward.rewardID, !activeCosmetics.includes(reward.rewardID))}
                                className={activeCosmetics.includes(reward.rewardID) ? 'active' : ''}
                            >
                                {activeCosmetics.includes(reward.rewardID) ? 'Active' : 'Activate'}
                            </button>
                        </div>
                    ))}
            </div>
            <h3>Name Your Pet</h3>
            <div className='change-pet-name'>
                <input
                    type='text'
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder='Enter a new name'
                />
                <button onClick={handlePetNameChange}>Change Name</button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default RewardManager;

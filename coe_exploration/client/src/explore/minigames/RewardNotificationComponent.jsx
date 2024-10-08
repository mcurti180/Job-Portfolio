import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../authentication/AuthComponent';
import { NavLink } from 'react-router-dom';
import './reward_notification_styles.css';

const RewardNotification = ({ rewardId, rewardName, onClose }) => {
    const { accessToken } = useAuth();
    const [showNotification, setShowNotification] = useState(false);
    const [rewardDescription, setRewardDescription] = useState('');
    const hasFetched = useRef(false); // Ref to track if the effect has run

    useEffect(() => {
        if (hasFetched.current) return; // StrictMode runs effects twice so we need to prevent that or the notification wont show at all

        const checkReward = async () => {
            try {
                const response = await fetch(`/api/pet/check-reward/${rewardId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Data: ", data, "Has reward: ", data.hasReward, "Not has reward: ", !data.hasReward);
                    setShowNotification(!data.hasReward);
                    setRewardDescription(data.rewardDescription);
                } else {
                    console.error(`Error status: ${response.status}`);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        checkReward();
        hasFetched.current = true; // Mark as fetched
    }, [accessToken, rewardId]);

    if (!showNotification) {
        console.log('Show notification is false');
        return null;
    }

    return (
        <div className="reward-popup">
            <h2>Congratulations!</h2>
            <p>You have won a new reward: {rewardName}</p>
            <p>{rewardDescription}</p>
            <button className="close-button" onClick={onClose}>×</button>
            <NavLink to="/pet">
                <button className="back-to-pet-button">Back to Pet</button>
            </NavLink>
        </div>
    );
};

export default RewardNotification;

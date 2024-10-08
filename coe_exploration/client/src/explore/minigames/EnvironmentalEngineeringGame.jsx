import React from 'react';
import MatchingGame from './MatchingGame.jsx';

const EnvironmentalEngineeringGame = () => {
    // List of environmental engineering terms for the matching game
    const dictionary = {
        Sustainability: {
            definition: 'Avoidance of the depletion of natural resources to maintain ecological balance',
            type: 'text'
        },
        Ecosystem: {
            definition: 'A community of living organisms and their interactions with the environment',
            type: 'text'
        },
        Pollution: {
            definition: 'The introduction of harmful substances or products into the environment',
            type: 'text'
        },
        Bioremediation: {
            definition: 'The use of living organisms to remove or neutralize contaminants',
            type: 'text'
        },
        Biodiversity: {
            definition: 'The variety of life in a particular habitat or ecosystem',
            type: 'text'
        },
        Microplastics: {
            definition: 'Small plastic particles that result from the breakdown of larger debris',
            type: 'text'
        },
        Toxicology: {
            definition: 'The scientific study of the harmful effect of chemicals and other agents on living organisms',
            type: 'text'
        },
        Desalination: {
            definition: 'The process of removing salt and other impurities from water for consumption or irrigation',
            type: 'text'
        }
    };

    return (
        <div className="matching-game-body">
            <div className="intro">
                <h1>Environmental Engineering Matching Game</h1>
                <p>
                    Click on cards to flip them over and match them with the correct
                    environment engineering terms. There's no time limit, so take your time!
                </p>
            </div>
            <MatchingGame terms={dictionary} rewardID={11} rewardName={"Paper Bag Mask"} />
        </div>
    );
};

export default EnvironmentalEngineeringGame;
import React from 'react';
import MatchingGame from './MatchingGame.jsx';

const ElectricalAndComputerEngineeringGame = () => {
    // List of electrical and computer engineering terms for the matching game
    const dictionary = {
        Transistor: {
            definition: 'A semiconductor device that controls currents and amplifies/switches electric signals',
            type: 'text'
        },
        Resistor: {
            definition: 'An electrical component that limits the flow of electricity',
            type: 'text'
        },
        Circuit: {
            definition: 'A closed loop through which an electric current can flow',
            type: 'text'
        },
        Microcontroller: {
            definition: 'A small computer on a single integrated circuit',
            type: 'text'
        },
        Semiconductor: {
            definition: 'A material that has conductivity between a conductor and an insulator',
            type: 'text'
        },
        Switch: {
            definition: 'A device used to make or break an electrical circuit',
            type: 'text'
        },
        Microprocessor: {
            definition: 'A CPU on a single integrated circuit, capable of executing instructions',
            type: 'text'
        },
        Sensor: {
            definition: 'A device that detects changes in the environment and converts them to electrical signals',
            type: 'text'
        }
    };


    return (
        <div className="matching-game-body">
            <div className="intro">
                <h1>Electrical And Computer Engineering Matching Game</h1>
                <p>
                    Click on cards to flip them over and match them with the correct
                    electrical engineering terms. There's no time limit, so take your time!
                </p>
            </div>
            <MatchingGame terms={dictionary} rewardID={8} rewardName={"Lights"} />
        </div>
    );
};

export default ElectricalAndComputerEngineeringGame;
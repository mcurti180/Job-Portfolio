import React, { useState } from 'react';
import './ComputerScienceGame.css';
import { Question1, Question2, Question3, Reward} from "./CodeBlocks";
import RewardNotification from './RewardNotificationComponent';

const ComputerScienceGame = ( rewardID, rewardName ) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [code, setClickedWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showReward, setShowReward] = useState(false);

  const handleWordClick = (word) => {
    setClickedWord(word);
    setPopupVisible(true);
  };

  const turnOffReward = () => {
    setShowReward(false);
  };


  const closePopup = () => {
    setCurrentQuestion(currentQuestion + 1);
    
    if(currentQuestion === 3){
      setShowReward(true);
    }
    setPopupVisible(false);
    
  };

  
  return (
    <div className="box">
      <h1>Find the error in the code.</h1>
      <p> Click on the error in the code.</p>

      {currentQuestion === 1 && (
        <Question1
        handleWordClick={handleWordClick}
        />
      )}

      {currentQuestion === 2 && (
        <Question2
        handleWordClick={handleWordClick}
        />
      )}

      {currentQuestion === 3 && (
        <Question3
        handleWordClick={handleWordClick}
        />
      )}

      { showReward && <RewardNotification rewardId={rewardID} rewardName={rewardName} onClose={turnOffReward} />}
  
      {popupVisible && (
        <div>
          <div className="popup-background"></div>
          <div className="popup">
            <p>Correct! The correct code is: {code}</p>
            <button className='CSButton' onClick={() => closePopup()}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ComputerScienceGame;
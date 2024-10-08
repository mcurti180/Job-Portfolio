import React, { useState, useEffect } from 'react';
import './ChemicalEngineeringGame.css';
import { row1, row2, row3, row4, row5, row6, row7, row8, row9, empty } from './PeriodicTable';
import RewardNotification from './RewardNotificationComponent';

// Periodic Table adapted from:
// https://codepen.io/kevinmarks/pen/qjqXxG

const ChemicalEngineeringGame = ( rewardID, rewardName ) => {
  const [inputValue, setInputValue] = useState('');
  const [removedElement, setRemovedElement] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);
  const [removedIndex, setRemovedIndex] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [counter, setCounter] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const [periodicTable, setPeriodicTable] = useState({
    row1: row1,
    row2: row2,
    row3: row3,
    row4: row4,
    row5: row5,
    row6: row6,
    row7: row7,
    empty: empty,
    row8: row8,
    row9: row9
  });

  const closePopup = () => {
    removeRandomElement();
    setPopupVisible(false);
  };

  const removeRandomElement = () => {
    var element = { atomicNumber: 300, symbol: '', name: '', atomicMass: '' };
    while (element.atomicNumber >= 200) {
      const randomRow = Math.floor(Math.random() * 9) + 1;
      const row = periodicTable['row' + randomRow];
      const randomElementIndex = Math.floor(Math.random() * row.length);
      element = row[randomElementIndex];

      if (element.atomicNumber < 200) {
        row[randomElementIndex] = { ...element, symbol: '?', name: '?' };
        setRowIndex(randomRow);
        setRemovedIndex(randomElementIndex);
        setRemovedElement(element);
        break;
      }
    }
    setShowButton(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const getNewElement = () => {
    var updatedTable = { ...periodicTable };
    if (removedElement != null){
      updatedTable = { ...periodicTable };
      const indexedRow = updatedTable['row' + rowIndex];
      indexedRow[removedIndex] = removedElement;
    }
    removeRandomElement();
    setPeriodicTable(updatedTable);
  }

  const elementAnswer = () => {
    if (removedElement && inputValue.toLowerCase() === removedElement.name.toLowerCase()) {
      const updatedTable = { ...periodicTable };
      const indexedRow = updatedTable['row' + rowIndex];
      indexedRow[removedIndex] = removedElement;
      setPeriodicTable(updatedTable);
      const updatedCounter = counter + 1;

      setCounter(updatedCounter);
      if (updatedCounter >= 3){
        endGame();
      }
      else{
        setPopupVisible(true);
      }

    }
  };

  const endGame = () => {
    setGameEnd(true);
    setShowReward(true);
  }

  const turnOffReward = () => {
    setShowReward(false);
  };

  const Reward = () => (
    <div>
        { showReward && <RewardNotification rewardId={rewardID} rewardName={rewardName} onClose={turnOffReward} />}
        You win!
        <button className='ChemEButton' onClick={() => window.location.reload()}>Play again?</button>
  
    </div>
  );
  const giveHint = () => {
    const updatedTable = { ...periodicTable };
    const indexedRow = updatedTable['row' + rowIndex];
    indexedRow[removedIndex] = { ... removedElement, name: '?'}
    setShowButton(false);

  }

  const renderRow = (elements) => {
    return (
      <div className="periodic-row">
        {elements.map(element => (
          <div className="cell" key={element.atomicNumber}>
            {element.atomicNumber >= 200 ? null : (
              <div className="element" style={styleElement(element)}>
                <div className="atomic_num">{element.atomicNumber}</div>
                <div className="symbol">{element.symbol}</div>
                <div className="atomic_mass">{element.name}<br />{element.atomicMass}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const styleElement = (element) => {
    let style = {};
    const red = [1,3,11,19,37,55,87];
    const orange = [4,12,20,38,56,88];
    const grey = [5,13,14,31,32,33,49,50,51,52,81,82,83,84,85,113,114,115,116,117,118];
    const yellow = [6,7,8,9,15,16,17,34,35,53];
    const cyan = [2,10,18,36,54,86];
    const pink = [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103];
    
    if (element.name === '?') {
      style.backgroundColor = 'white';
      style.border = '1px solid black';
    } 
    else if(red.includes(element.atomicNumber)){
      style.backgroundColor = 'orangered';
    }
    else if(orange.includes(element.atomicNumber)){
      style.backgroundColor = 'orange';
    }
    else if(grey.includes(element.atomicNumber)){
      style.backgroundColor = 'lightgrey';
    }
    else if(yellow.includes(element.atomicNumber)){
      style.backgroundColor = 'yellow';
    }
    else if (cyan.includes(element.atomicNumber)){
      style.backgroundColor = 'cyan';
    }
    else if(pink.includes(element.atomicNumber)){
      style.backgroundColor = 'pink';
    }
    else{
      style.backgroundColor = 'salmon';
    }
  
    return style;
  };

  return (
    <div className="periodic">
      {gameEnd && (
        <Reward/>
      )}

      {popupVisible && (
        <div>
          <div className="popup-background"></div>
          <div className="popup">
            <p>Correct! The missing element was: {removedElement.name}</p>
            <button className='ChemEButton' onClick={() => closePopup()}>Close</button>
          </div>
        </div>
      )}

      {gameEnd ? null : (
      <>
        <div className="ChemEHeader">
          <h1>What's the missing element?</h1>
          <h2>You need to get 3 correct!</h2>
          <p>You have {counter}/3 </p>
        </div>
        <button className='ChemEButton' onClick={getNewElement}>Get a new element</button>
        <input
          id='ChemEText'
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="What's the element?"
        />
        <button className='ChemEButton' onClick={elementAnswer}>Confirm</button>

        {showButton ? (<button className='ChemEButton' onClick={giveHint}>Hint</button>) : null }

        {Object.keys(periodicTable).map(rowKey => (
          <React.Fragment key={rowKey}>
            {renderRow(periodicTable[rowKey])}
          </React.Fragment>
        ))}
      </>
      )}
    </div>
   
  );
};

export default ChemicalEngineeringGame;

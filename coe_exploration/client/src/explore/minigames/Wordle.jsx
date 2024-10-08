import React, { useState, useEffect } from 'react';
import './Wordle.css';
import Keyboard from './Keyboard.jsx';
import RewardNotification from './RewardNotificationComponent.jsx';

const Wordle = ({ word_list, rewardID, rewardName }) => {
  const [solution, setSolution] = useState('');
  const wordLength = solution.length;
  const maxAttempts = 6; // Maximum number of attempts
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [showReward, setShowReward] = useState(false);

  // Initialize guesses and guessStatuses after solution is set
  const [guesses, setGuesses] = useState([]);
  const [guessStatuses, setGuessStatuses] = useState([]);

  // State to track the current cell for input
  const [currentCell, setCurrentCell] = useState({});
  const [keyStatuses, setKeyStatuses] = useState({});

  // Function to initialize the game
  const initializeGame = () => {
    const newSolution =
      word_list[Math.floor(Math.random() * word_list.length)].toUpperCase();
    setSolution(newSolution);
    const newWordLength = newSolution.length;
    setCurrentCell({ row: 0, col: 0 });
    setKeyStatuses({});
    setGuesses(
      Array(maxAttempts)
        .fill('')
        .map(() => Array(newWordLength).fill(''))
    );
    setGuessStatuses(
      Array(maxAttempts)
        .fill('')
        .map(() => Array(newWordLength).fill('default'))
    );
    setGameStatus('playing'); // Ensure game status is set to 'playing'
  };

  useState(() => {
    initializeGame();
  }, []);

  // Handle key presses for on screen keyboard
  const handleKeyPress = (key) => {
    if (key === 'ENTER') {
      // Add logic to ensure a full guess is entered before allowing ENTER
      if (currentCell.col === wordLength) {
        // Evaluate the guess
        evaluateGuess(guesses[currentCell.row], currentCell.row);

        // Move to next row logic, ensure the current row is full
        const nextRow = currentCell.row + 1;
        if (nextRow < maxAttempts) {
          setCurrentCell({ row: nextRow, col: 0 });
        }
      }
      return;
    }

    if (key === 'BACKSPACE') {
      // Delete the previous character logic, only within the current row
      let newCol = currentCell.col - 1;
      let newRow = currentCell.row;

      if (newCol < 0) {
        // If we are at the start of a row, do not allow moving back to the previous row
        newCol = 0;
      } else {
        // Otherwise, clear the character in the previous cell
        const newGuesses = [...guesses];
        newGuesses[newRow][newCol] = '';
        setGuesses(newGuesses);
        setCurrentCell({ row: newRow, col: newCol });
      }
      return;
    }

    // Handle regular key press
    if (currentCell.col < wordLength) {
      const newGuesses = [...guesses];
      newGuesses[currentCell.row][currentCell.col] = key;
      setGuesses(newGuesses);
      let newCol = currentCell.col + 1;

      // Check if the row is now complete
      if (newCol === wordLength) {
        evaluateGuess(newGuesses[currentCell.row], currentCell.row);

        // Prepare to move to the next row if there are attempts left
        if (currentCell.row + 1 < maxAttempts) {
          setCurrentCell({ row: currentCell.row + 1, col: 0 });
        }
      } else {
        setCurrentCell({ row: currentCell.row, col: newCol });
      }
    }
  };

  const evaluateGuess = (guess, rowIndex) => {
    // TODO: Check that guess is a valid word by checking words.jsx
    console.log(guess);
    const status = guess.map((letter, index) => {
      if (letter === solution[index]) {
        return 'correct';
      } else if (solution.includes(letter)) {
        return 'present';
      } else {
        return 'absent';
      }
    });

    // Update key statuses based on this new guess
    const newKeyStatuses = { ...keyStatuses };
    guess.forEach((letter, index) => {
      if (status[index] === 'absent' && !solution.includes(letter)) {
        newKeyStatuses[letter] = 'absent';
      } else if (status[index] === 'present') {
        newKeyStatuses[letter] = 'present';
      } else if (status[index] === 'correct') {
        newKeyStatuses[letter] = 'correct';
      }
    });
    setKeyStatuses(newKeyStatuses);

    setGuessStatuses((prev) =>
      prev.map((row, rIndex) => (rIndex === rowIndex ? status : row))
    );

    // Check for win condition
    if (status.every((s) => s === 'correct')) {
      setGameStatus('won');
      setShowReward(true);
    } else if (
      rowIndex === maxAttempts - 1 &&
      !status.every((s) => s === 'correct')
    ) {
      setGameStatus('lost');
    }
  };

  // Update the cellStyle function in the Wordle component
  const cellStyle = (status) => ({
    backgroundColor:
      status === 'correct'
        ? 'green'
        : status === 'present'
        ? 'yellow'
        : status === 'absent'
        ? '#a1a1a1'
        : 'white',
    animation:
      status === 'correct'
        ? 'pop 0.5s ease'
        : status === 'present'
        ? 'shake 0.5s ease'
        : status === 'absent'
        ? 'fade 0.5s ease'
        : 'none',
  });

  const handleCloseNotification = () => {
    setShowReward(false);
  };

  const GamePopup = ({ status }) => {
    if (status === 'playing') return null;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            padding: 20,
            background: 'white',
            borderRadius: 5,
            color: 'black',
          }}
        >
          <h2>
            {status === 'won'
              ? 'Congratulations! You Won!'
              : 'Game Over. Try Again!'}
          </h2>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      </div>
    );
  };

  return (
    <div className="wordle-board">
      <div>
        <h1 className='wordle-title'>Wordle</h1>
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className='wordle-row' style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength="1"
                className='wordle-cell'
                value={cell}
                onKeyDown={(e) => e.preventDefault()} // Prevent typing via keyboard
                style={cellStyle(guessStatuses[rowIndex][colIndex])}
                disabled={
                  (rowIndex > 0 && guesses[rowIndex - 1].includes('')) ||
                  guessStatuses[rowIndex].every(
                    (status) => status !== 'default'
                  )
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="wordle_keyboard">
        <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
        <p>Answer = {solution}</p>
      </div>
      <div className='new-game'>
        {gameStatus !== 'playing' && <button className="wordle-play-again-button" style={{
            padding: 10,
            background: 'white',
            borderRadius: 5,
            color: 'black',
          }} onClick={initializeGame}>Play Again</button>}
      </div>
      {gameStatus === "won" && <RewardNotification rewardId={rewardID} rewardName={rewardName} onClose={initializeGame} />}
    </div>
  );
};

export default Wordle;

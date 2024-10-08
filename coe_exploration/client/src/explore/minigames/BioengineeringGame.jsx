import React, { useEffect, useState } from 'react';
import RewardNotification from './RewardNotificationComponent';
import './BioengineeringGame.css';

const BioengineeringGame = () => {
  // Challenge definitions
  const [sequence, setSequence] = useState('');
  const [mutationIndex, setMutationIndex] = useState(0);
  const [isolatedSequence, setIsolatedSequence] = useState('');
  const [gRNA, setGRNA] = useState('');
  const [fragments, setFragments] = useState([]);

  // Game states
  const [clickedIndex, setClickedIndex] = useState(null);
  const [mutationIdentified, setMutationIdentified] = useState(false);
  const [selectedFragments, setSelectedFragments] = useState([]);
  const [showStartScreen, setShowStartScreen] = useState(true); // true to show the start screen by default
  const [gameWon, setGameWon] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const gridSize = 9;

  const generateRandomDNASequence = (length = 81) => {
    const DNA = ['A', 'T', 'C', 'G'];
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * DNA.length);
      result += DNA[randomIndex];
    }
    return result;
  };

  const generateFragments = (gRNA, min, max) => {
    let fragments = [],
      size = 1;
    min = min || 1;
    max = max || min || 1;
    while (gRNA.length > 0) {
      size = Math.min(max, Math.floor(Math.random() * max + min));
      fragments.push(gRNA.splice(0, size));
    }
    fragments = fragments.map((chunk) => chunk.join(''));
    const randomRandomFragments = generateRandomFragments(min, max, 10);
    fragments.push(...randomRandomFragments);

    return shuffle(fragments);
  };

  const generateRandomFragments = (minLength, maxLength, numOfFragments) => {
    const RNA = ['A', 'U', 'G', 'C'];
    let fragments = [];

    for (let i = 0; i < numOfFragments; i++) {
      let fragmentLength =
        Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      let fragment = '';

      for (let j = 0; j < fragmentLength; j++) {
        fragment += RNA[Math.floor(Math.random() * RNA.length)];
      }

      fragments.push(fragment);
    }

    return fragments;
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getProximityColor = (index) => {
    // Only apply special coloring if a cell has been clicked
    if (clickedIndex !== null) {
      if (index === mutationIndex && index === clickedIndex) {
        // Correct answer and it has been clicked
        return 'green';
      } else if (index === clickedIndex) {
        // Logic for determining proximity if the clicked index is not the correct one
        const correctRow = Math.floor(mutationIndex / gridSize);
        const correctColumn = mutationIndex % gridSize;
        const clickedRow = Math.floor(clickedIndex / gridSize);
        const clickedColumn = clickedIndex % gridSize;

        const x = correctRow - clickedRow;
        const y = correctColumn - clickedColumn;

        // Calculate Manhattan distance
        const distance = Math.abs(x) + Math.abs(y);

        const L2distance = Math.sqrt(x * x + y * y);

        // Assign colors based on distance ranges
        if (L2distance < 1.5) return 'red'; // Very close
        if (L2distance < 3) return 'orange'; // Close
        if (L2distance < 4.5) return 'yellow'; // Moderately close
        if (L2distance < 6) return 'lightskyblue'; // Moderate
        if (L2distance < 7.5) return 'aqua'; // Moderately far
        return 'blue'; // Very far
      }
    }
    // Default color, applied if no cell has been clicked or the clicked cell does not meet any specific conditions
    return 'white';
  };

  const handleCellClick = (index) => {
    // Make grid unclickable after mutation is found
    if (!mutationIdentified) {
      setClickedIndex(index);
      if (index === mutationIndex) {
        setMutationIdentified(true);
      }
    }
  };

  const handleFragmentClick = (fragmentId) => {
    // Find the clicked fragment by its id
    const clickedFragment = fragments.find(
      (fragment) => fragment.id === fragmentId
    );

    // Append the text of the clicked fragment to the selectedFragments
    if (clickedFragment && !clickedFragment.disabled) {
      setSelectedFragments((prevFragments) => [
        ...prevFragments,
        clickedFragment.text,
      ]);
      // Disable the clicked fragment to prevent it from being clicked again
      setFragments((prevFragments) =>
        prevFragments.map((fragment) => {
          if (fragment.id === fragmentId) {
            return { ...fragment, disabled: true };
          }
          return fragment;
        })
      );
    }
  };

  const generateFragmentId = (fragments) => {
    return fragments.map((fragment, index) => ({
      id: index, // Unique identifier for each fragment
      text: fragment,
      disabled: false, // Initially, no fragment is disabled
    }));
  };

  const handleReset = () => {
    setSelectedFragments([]);
    setFragments(
      fragments.map((fragment) => ({ ...fragment, disabled: false }))
    );
  };

  const handleSubmit = () => {
    const submission = selectedFragments.join('');
    if (submission === gRNA) {
      setGameWon(true);
      setShowReward(true);
      console.log("Show Reward: ", showReward);
    } else {
      handleReset();
    }
    return;
  };

  const handleCloseNotification = () => {
    setShowReward(false);
  };

  const startNewGame = () => {
    setGameWon(false);
    setClickedIndex(null);
    setMutationIdentified(false);
    handleReset();

    // Reset the sequnce, mutation index, isolated sequence, gRNA, and fragments
    const newSequence = generateRandomDNASequence(81);
    const newMutationIndex =
      Math.floor(Math.random() * (newSequence.length - 4 - 3 + 1)) + 3; // Ensures there's 3 characters before and after the mutation index
    const newIsolatedSequence = newSequence.substring(
      newMutationIndex - 3,
      newMutationIndex + 4
    );
    const dnaToRna = { A: 'U', T: 'A', C: 'G', G: 'C' };
    const newGRNAArray = newIsolatedSequence
      .split('')
      .map((nucleotide) => dnaToRna[nucleotide]);
    const newGRNA = newGRNAArray.join('');
    const newFragments = generateFragments(newGRNAArray, 1, 3);

    setSequence(newSequence);
    setMutationIndex(newMutationIndex);
    setIsolatedSequence(newIsolatedSequence);
    setGRNA(newGRNA);
    setFragments(generateFragmentId(newFragments));
  };

  useEffect(() => {
    // Randomly generate a new challenge
    startNewGame();
  }, []);

  if (showStartScreen) {
    return (
      <div className="start-screen">
        <h2>Game Objective</h2>
        <p>
          Your mission is to use the CRISPR-Cas9 technology to correct a genetic
          mutation causing a disease. Successfully guide the Cas9 to the correct
          location in the DNA sequence, design the appropriate guide RNA (gRNA),
          and cure the disease to win the game.
        </p>

        <h3>How to Play</h3>
        <ol>
          <li>
            <strong>Identify the Target:</strong> Find the incorrect base in the
            DNA sequence. Clicking on letters gives hints about your proximity
            to the mutation.
          </li>
          <li>
            <strong>Design the Guide RNA (gRNA):</strong> Select RNA fragments
            to match the DNA sequence around the mutation, designing the correct
            guide RNA sequence.
          </li>
          <li>
            <strong>Submit Your Solution:</strong> Submit the correct guide RNA
            to correct the mutation and win the game.
          </li>
        </ol>

        <h3>Tips</h3>
        <ul>
          <li>
            Color cues indicate your proximity to the mutation. Red means very
            close, while blue means far.
          </li>
          <li>
            Remember RNA base pairing rules: A pairs with U, and C pairs with G.
          </li>
          <li>
            Not all RNA fragments will be part of the correct sequence. Choose
            wisely!
          </li>
        </ul>

        <h3>Winning the Game</h3>
        <p>
          Correctly guide the Cas9 enzyme and design the right guide RNA to cure
          the disease and win the game!
        </p>

        <button onClick={() => setShowStartScreen(false)}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="biogame-container">
      {!gameWon ? (
        <>
          {mutationIdentified && (
            <div className="sequence">
              Isolated Sequence: {isolatedSequence}
            </div>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gap: '5px',
            }}
          >
            {sequence.split('').map((nucleotide, index) => (
              <button
                key={index}
                className="nucleotide"
                onClick={() => handleCellClick(index)}
                style={{ backgroundColor: getProximityColor(index) }}
              >
                {nucleotide}
              </button>
            ))}
          </div>
          <div className="assembly-container">
            {mutationIdentified && (
              <>
                <div className="selected-fragments">
                  Assembled Sequence: {selectedFragments.join('')}
                </div>
                <div className="fragment-buttons">
                  {fragments.map((fragment, index) => (
                    <button
                      key={fragment.id}
                      onClick={() => handleFragmentClick(fragment.id)}
                      disabled={fragment.disabled}
                      className="fragments"
                    >
                      {fragment.text}
                    </button>
                  ))}
                </div>
                <button onClick={handleSubmit} className="submit-button">
                  Submit
                </button>
                <button onClick={handleReset} className="reset-button">
                  Reset
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="winner-container">
          {showReward && <RewardNotification rewardId={2} rewardName="Stat Button" onClose={handleCloseNotification} />}
          <h2>Well done, scientist!</h2>
          <p>
            You've expertly designed the gRNA. The path is now clear to correct
            the mutation and restore genetic harmony.
          </p>
          <button onClick={startNewGame}>Try Another Sequence</button>
        </div>
      )}
    </div>
  );
};

export default BioengineeringGame;

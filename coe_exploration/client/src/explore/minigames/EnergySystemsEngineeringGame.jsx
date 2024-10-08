import React, { useEffect, useState } from 'react';
import wordsearch from 'wordsearch-generator';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './Wordsearch.css'; // Import CSS file for styling
import RewardNotification from './RewardNotificationComponent';

const sentences = {
    RENEWABLE: "Renewable energy systems engineering focuses on developing sustainable energy sources that can be replenished naturally.",
    SOLAR: "Solar energy systems harness the power of the sun, converting sunlight into electricity through photovoltaic cells and thermal collectors.",
    WIND: "Wind energy systems capture kinetic energy from wind using turbines, generating clean and sustainable electricity.",
    BIOFEUL: "Biofuel engineering transforms organic materials into renewable energy sources, providing an alternative to fossil fuels.",
    GRID: "Grid systems engineering ensures the efficient distribution of electricity from various sources to meet consumer demand reliably.",
    STORAGE: "Energy storage systems are critical in energy engineering, allowing excess energy to be saved and used when needed, enhancing grid stability.",
    EFFICIENCY: "Efficiency in energy systems engineering aims to maximize energy output while minimizing waste and consumption.",
    SUSTAINABILITY: "Sustainability in energy systems engineering promotes the development and use of technologies that reduce environmental impact and conserve resources."
};

const WordSearchGame = () => {
    const { majorId } = useParams(); // Retrieve majorId from URL parameters
    const [words, setWords] = useState([]);
    const [puzzle, setPuzzle] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]); // Track found words
    const [isMouseDown, setIsMouseDown] = useState(false); // Track mouse down state
    const [startCell, setStartCell] = useState(null); // Track start cell of selection
    const [foundSentence, setFoundSentence] = useState('');
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`/api/majors/9/words`);
                const data = await response.json();
                const wordsData = data.map(item => item.word.toUpperCase());
                setWords(wordsData);
            } catch (error) {
                console.error('Error fetching words: ', error);
            }
        };

        fetchWords();
    }, [majorId]);

    useEffect(() => {
        if (words.length > 0) {
            const puzzleGrid = wordsearch.createPuzzle(20, 20, 'en', words);
            const hiddenGrid = wordsearch.hideWords(puzzleGrid, 'en'); // Hide the words
            setPuzzle(hiddenGrid);
        }
    }, [words]);

    const handleMouseDown = (event, rowIndex, columnIndex) => {
        event.preventDefault(); // Prevent default behavior to avoid selecting text
        setIsMouseDown(true);
        setStartCell({ row: rowIndex, column: columnIndex });
        setSelectedCells([]); // Clear selection when starting a new selection
    };

    const handleMouseUp = () => {
        const validWord = checkSelectedWord();
        if (validWord) {
            console.log("Selected word is valid!", selectedCells);
            highlightFoundWord();
            console.log("Found words list after highlighting: ", foundWords);
        } else {
            console.log("Selected word is not valid!: ", selectedCells);
            setSelectedCells([]); // Clear selection if the word is not valid
        }
        setIsMouseDown(false);
        setStartCell(null);
    };

    const handleMouseEnter = (rowIndex, columnIndex) => {
        if (isMouseDown) {
            const endCell = { row: rowIndex, column: columnIndex };
            const cellsToSelect = getCellsBetween(startCell, endCell);
            setSelectedCells(cellsToSelect); // Update selection
        }
    };

    const getCellsBetween = (startCell, endCell) => {
        if (!startCell || !endCell) return [];

        const { row: startRow, column: startColumn } = startCell;
        const { row: endRow, column: endColumn } = endCell;
        const cells = [];

        // Check if cells are in the same row or column
        if (startRow === endRow) { // Horizontal selection
            for (let col = Math.min(startColumn, endColumn); col <= Math.max(startColumn, endColumn); col++) {
                cells.push(`${startRow}-${col}`);
            }
        } else if (startColumn === endColumn) { // Vertical selection
            for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
                cells.push(`${row}-${startColumn}`);
            }
        } else if (Math.abs(startRow - endRow) === Math.abs(startColumn - endColumn)) { // Diagonal selection
            const rowStep = startRow < endRow ? 1 : -1;
            const colStep = startColumn < endColumn ? 1 : -1;
            let row = startRow;
            let col = startColumn;
            while (row !== endRow + rowStep && col !== endColumn + colStep) {
                cells.push(`${row}-${col}`);
                row += rowStep;
                col += colStep;
            }
        }

        return cells;
    };

    const checkSelectedWord = () => {
        const selectedWord = selectedCells.map(cell => {
            const [row, col] = cell.split('-').map(Number);
            return puzzle[row][col];
        }).join('');

        const reversedSelectedWord = selectedWord.split('').reverse().join('');

        console.log("Selected word:", selectedWord);
        console.log("Reversed selected word:", reversedSelectedWord);

        return words.includes(selectedWord) || words.includes(reversedSelectedWord);
    };

    const highlightFoundWord = () => {
        console.log("Highlighting found word cells:", selectedCells);
        setFoundWords(prevFoundWords => {
            const newFoundWords = [...prevFoundWords, ...selectedCells];
            console.log("Highlighting found word cells:", newFoundWords);
            return newFoundWords;
        });
    };

    const handleWordFound = (index) => {
        const buttons = document.querySelectorAll('.word-list button');
        buttons[index].innerText = 'Found';
        const wordSpan = document.querySelectorAll('.word-list span');
        wordSpan[index].style.textDecoration = 'line-through';

        // Display sentence
        const word = words[index];
        const sentence = sentences[word];
        setFoundSentence(sentence);

        if (foundWords.length === words.length - 1) {
            handleGameWin(); // Call handleGameWin when the game is won
        }
    };

    const handleGameWin = () => {
        // Logic to handle game win
        setShowReward(true);
    };

    const handleCloseNotification = () => {
        setShowReward(false);
    };

    return (
        <div className="word-search-container">
            <div className="word-list">
                <h1>Energy Systems Engineering Wordsearch</h1>
                <ul>
                    <li>Click and drag to highlight words from the list below</li>
                    <li>When found click the 'X' button next to the word to mark it off</li>
                    <li>Click 'play again' for a new game or use the Navigation to explore more!</li>
                </ul>
                <h2>Word List</h2>
                <ul>
                    {words.map((word, index) => (
                        <li key={index}>
                            <span>{word}</span>
                            <button className="button" onClick={() => handleWordFound(index)}>X</button>
                        </li>
                    ))}
                </ul>
                <div>
                    {foundSentence && (
                        <div>
                            <p>{foundSentence}</p>
                        </div>    
                    )}
                </div>
                <br />
                <button onClick={() => window.location.reload()}>Play Again!</button>
                <button onClick={handleGameWin}>Collect Reward</button> {/* Button to collect reward */}
            </div>
            <div
                className="word-search-grid"
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseUp={handleMouseUp}
            >
                {puzzle.map((row, rowIndex) => (
                    <div className="word-search-row" key={rowIndex}>
                        {row.map((letter, columnIndex) => (
                            <div
                                className={`word-search-cell ${selectedCells.includes(`${rowIndex}-${columnIndex}`) ? 'selected' : ''} ${foundWords.includes(`${rowIndex}-${columnIndex}`) ? 'found' : ''}`}
                                key={`${rowIndex}-${columnIndex}`}
                                onMouseDown={(event) => handleMouseDown(event, rowIndex, columnIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {showReward && (
                <RewardNotification
                    rewardId={9}
                    rewardName="Energy Systems Engineering Reward"
                    onClose={handleCloseNotification}
                />
            )}
        </div>
    );
};

export default WordSearchGame;
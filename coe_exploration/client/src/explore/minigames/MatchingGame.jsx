import React, { useState } from 'react';
import './MatchingGame.css';
import RewardNotification from './RewardNotificationComponent';

const MatchingGame = ({ terms, rewardID, rewardName }) => {
    const dictionary = terms;

    const [cards, setCards] = useState(generateCards());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [numMatched, setNumMatched] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [showReward, setShowReward] = useState(false);

    function generateCards() {
        const cards = [];
        const entries = Object.entries(dictionary);
        const shuffledEntries = entries.sort(() => Math.random() - 0.5);

        shuffledEntries.forEach(([term, { definition, type }]) => {
            cards.push({
                content: term,
                type: 'text',
                isFlipped: false,
                isMatched: false,
            });
            cards.push({
                content: definition,
                type: type,
                isFlipped: false,
                isMatched: false,
            });
        });

        const shuffledCards = cards.sort(() => Math.random() - 0.5);
        return shuffledCards;
    }

    function handleCardClick(index) {
        if (flippedIndexes.length < 2) {
            if (!cards[index].isFlipped) {
                const newCards = [...cards];
                newCards[index].isFlipped = true;

                const newFlippedIndexes = [...flippedIndexes, index];
                setFlippedIndexes(newFlippedIndexes);

                if (newFlippedIndexes.length === 2) {
                    const [firstIndex, secondIndex] = newFlippedIndexes;
                    if (
                        cards[firstIndex].content ===
                        dictionary[cards[secondIndex].content]?.definition ||
                        cards[secondIndex].content ===
                        dictionary[cards[firstIndex].content]?.definition
                    ) {
                        setTimeout(() => {
                            const matchedCards = cards.map((card, i) =>
                                i === firstIndex || i === secondIndex
                                    ? { ...card, isMatched: true }
                                    : card
                            );
                            setCards(matchedCards);
                            setFlippedIndexes([]);
                            setNumMatched(numMatched + 2);
                            if (numMatched === cards.length - 2) {
                                setGameEnd(true);
                                setShowReward(true);
                            }
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            const resetCards = cards.map((card, i) =>
                                i === firstIndex || i === secondIndex
                                    ? { ...card, isFlipped: false }
                                    : card
                            );
                            setFlippedIndexes([]);
                            setCards(resetCards);
                        }, 1000);
                    }
                } else {
                    setCards(newCards);
                }
            }
        }
    }

    function renderCard(card, index) {
        return (
            <div
                key={index}
                className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''
                    }`}
                onClick={() => handleCardClick(index)}
            >
                {card.isFlipped ? (
                    <div className="front">
                        {card.type === 'image' ? (
                            <img src={`/src/assets/matching/${card.content}`} alt={card.content} />
                        ) : (
                            <div className="card-content">{card.content}</div>
                        )}
                    </div>
                ) : (
                    <div
                        className="back"
                        style={{
                            backgroundImage: `url('/src/assets/matching/cardback.jpg')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                )}
            </div>
        );
    }

    const turnOffReward = () => {
        setShowReward(false);
    };

    const Reward = () => (
        <div>
            {showReward && <RewardNotification rewardId={rewardID} rewardName={rewardName} onClose={turnOffReward} />}
            <h2>You win!</h2>
            <p>Here are the terms you matched:</p>
            <ul>
                {Object.entries(dictionary).map(
                    ([term, { definition, type, credit }]) => (
                        <li key={term}>
                            <strong>{term}:</strong>{' '}
                            {type === 'image'
                                ? credit && (
                                    <>
                                        <br />
                                        <span className="credit">{credit}</span>
                                    </>
                                )
                                : definition}
                        </li>
                    )
                )}
            </ul>
            <button onClick={() => window.location.reload()}>Play again?</button>
        </div>
    );

    function renderGrid() {
        return (
            <div className="grid">
                {cards.map((card, index) => renderCard(card, index))}
            </div>
        );
    }

    return (
        <div className="matching-game">{gameEnd ? <Reward /> : renderGrid()}</div>
    );
};

export default MatchingGame;

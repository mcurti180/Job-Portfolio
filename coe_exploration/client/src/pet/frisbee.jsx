import { useState, useEffect } from 'react';
import frisbee from '/src/assets/Decorations/frisbee.png';

function FrisbeeReward({ onThrow }) {
  const [position, setPosition] = useState({ left: 78, top: 80 });
  const [isThrown, setIsThrown] = useState(false);

  const handleThrow = () => {
    // Send the frisbee off screen
    const newTop = 10;
    const newLeft = -30;

    setPosition({ left: newLeft, top: newTop})
    setIsThrown(true);
    onThrow({ left: newLeft, top: newTop});

    // Reset position after 3 seconds
    setTimeout(() => {
      setIsThrown(false);
      setPosition({ left: 78 , top: 80});
    }, 10000);
  };

  return (
    <img className='frisbee mechanic'
      src={frisbee}
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transition: isThrown ? 'top 2s, left 3s, transform 1s' : 'none',
        transform: isThrown ? 'scale(0.5)' : 'scale(1)',
        pointerEvents: isThrown ? 'none' : 'auto',
      }}
      onClick={handleThrow}
      alt="frisbee"
    />
  );
}

export default FrisbeeReward;

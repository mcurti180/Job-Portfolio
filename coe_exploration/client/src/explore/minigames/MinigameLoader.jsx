import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MinigameLoader = () => {
  const { majorName } = useParams();
  const [MinigameComponent, setMinigameComponent] = useState(null);

  useEffect(() => {
    // Capitalize the first letter of each word in the major name and remove spaces
    const decodedMajorName = decodeURIComponent(majorName);
    const formattedMajorName = decodedMajorName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

    console.log(formattedMajorName);

    import(`./${formattedMajorName}Game.jsx`)
      .then(module => setMinigameComponent(() => module.default))
      .catch(error => console.error('Minigame loading failed:', error));
  }, [majorName]);

  if (!MinigameComponent) {
    return <div>Loading game...</div>;
  }

  return <MinigameComponent />;
};

export default MinigameLoader;

import React from 'react';
import './pet_styles.css'; // Import the CSS for styling

const PetMenu = ({ x, y, onOptionSelected }) => {
    const options = [
        { label: 'Pet', action: 'pet' },
        //{ label: 'Play', action: 'play' },    // No play animation, playing can be done by using the bell or frisbee though
        { label: 'Feed', action: 'feed' },
        { label: 'Wash', action: 'wash' },
        { label: 'Style', action: 'style' }
    ];

    const numberOfOptions = options.length;
    const angleStep = (2 * Math.PI) / numberOfOptions;

    return (
        <div className="pet-menu" style={{ top: y, left: x }}>
            {options.map((option, index) => {
                const angle = angleStep * index;
                const optionStyle = {
                    transform: `rotate(${angle}rad) translate(100px) rotate(-${angle}rad)`
                };
                return (
                    <button
                        key={option.action}
                        className="menu-option"
                        style={optionStyle}
                        onClick={() => onOptionSelected(option.action)}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default PetMenu;
import React from 'react';
import './tooltip_styles.css';

const TooltipComponent = ({ message, onNext, onClose, nextButtonText = "Next", closeButtonText = "Close", isLast = false }) => {
    return (
        <div className="tooltip-container">
            <div className="tooltip-content">
                <p>{message}</p>
                <div className="tooltip-buttons">
                    {!isLast && <button onClick={onNext}>{nextButtonText}</button>}
                    {isLast && <button onClick={onClose}>{closeButtonText}</button>}
                </div>
            </div>
        </div>
    );
};

export default TooltipComponent;

import './Keyboard.css';

const Keyboard = ({ onKeyPress, keyStatuses }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, index) => (
        <div key={index} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              style={{
                backgroundColor:
                  keyStatuses[key] === 'absent'
                    ? 'gray'
                    : keyStatuses[key] === 'correct'
                    ? 'green'
                    : keyStatuses[key] === 'present'
                    ? 'yellow'
                    : 'white',
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="large-key" onClick={() => onKeyPress('BACKSPACE')}>
          ⌫
        </button>
        <button className="large-key" onClick={() => onKeyPress('ENTER')}>
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Keyboard;

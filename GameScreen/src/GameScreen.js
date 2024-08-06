import React, { useEffect, useState } from 'react';
import './GameScreen.css';

function GameScreen({ num }) {
    const [checkboxes, setCheckboxes] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);

    const generateCheckboxes = () => {
        const container = document.getElementById('game-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const newCheckboxes = [];
        for (let i = 0; i < num; i++) {
            const x = Math.random() * (containerWidth - 20);
            const y = Math.random() * (containerHeight - 20);
            newCheckboxes.push({ x, y });
        }
        setCheckboxes(newCheckboxes);
    };

    const handleCheckboxClick = (index) => {
        const checkbox = checkboxes[index];
        console.log(`Player ${currentPlayer} checked a box at coordinates: (${checkbox.x}, ${checkbox.y})`);
        setCurrentPlayer((prevPlayer) => prevPlayer + 1);
    };

    useEffect(() => {
        generateCheckboxes();
    }, []);

    return (
        <div className="app">
            <div id="game-container" className="game-container">
                {checkboxes.map((checkbox, index) => (
                    <input
                        key={index}
                        type="checkbox"
                        className="checkbox"
                        style={{ left: checkbox.x, top: checkbox.y }}
                        onClick={() => handleCheckboxClick(index)}
                    />
                ))}
            </div>
            <button onClick={generateCheckboxes} className="btn-generate">Generate Checkboxes</button>
        </div>
    );
}

export default GameScreen;

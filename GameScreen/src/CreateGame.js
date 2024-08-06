import React, { useState } from 'react';
import GameScreen from './GameScreen';
import './CreateGame.css';

function CreateGame() {
    const [numPlayers, setNumPlayers] = useState('');
    const [employees, setEmployees] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch or generate employee data based on numPlayers
        const fetchedEmployees = Array.from({ length: numPlayers }, (_, i) => ({
            id: i + 1,
            name: `Employee ${i + 1}`
        }));
        setEmployees(fetchedEmployees);
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="container">
            {!gameStarted ? (
                <div className="form-container">
                    <h1 className="title">Create Game</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="numPlayers" className="form-label">
                                Number of Players
                            </label>
                            <input
                                type="number"
                                id="numPlayers"
                                className="form-input"
                                value={numPlayers}
                                onChange={(e) => setNumPlayers(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            Submit
                        </button>
                    </form>

                    {employees.length > 0 && (
                        <div className="participants">
                            <h2 className="participants-title">Participants</h2>
                            <ul className="participants-list">
                                {employees.map((employee) => (
                                    <li key={employee.id} className="participants-item">
                                        {employee.name}
                                    </li>
                                ))}
                            </ul>
                            <button className="btn-start" onClick={handleStartGame}>
                                Start Game
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="form-container">
                    <h1 className="title">Game Screen</h1>
                    <GameScreen num={numPlayers} />
                    <p className="game-info">Game started with {numPlayers} players.</p>
                </div>
            )}
        </div>
    );
}

export default CreateGame;

import React, { useState, useEffect, useRef } from 'react';
import Tile from '../Tile';

const songs = [
  { id: 1, name: 'Song 1', audio: './Dope.mp3' },
  { id: 2, name: 'Song 2', audio: './Dope.mp3' },
  { id: 3, name: 'Song 3', audio: 'path/to/song3.mp3' },
  { id: 4, name: 'Song 4', audio: 'path/to/song4.mp3' },
  { id: 5, name: 'Song 5', audio: 'path/to/song5.mp3' },
  { id: 6, name: 'Song 6', audio: 'path/to/song6.mp3' },
];

const GameBoard = ({ isPlaying, onMatchedPair, onGameEnd }) => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (isPlaying) {
      const shuffledTiles = [...songs, ...songs]
        .sort(() => Math.random() - 0.5)
        .map((song, index) => ({ ...song, id: index }));
      setTiles(shuffledTiles);
      setFlippedTiles([]);
      setMatchedTiles([]);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (matchedTiles.length === songs.length * 2) {
      onGameEnd();
    }
  }, [matchedTiles, onGameEnd]);

  const handleTileClick = (clickedTile) => {
    if (
      isChecking ||
      flippedTiles.length === 2 ||
      matchedTiles.includes(clickedTile.id) ||
      flippedTiles.some(tile => tile.id === clickedTile.id)
    ) {
      return;
    }

    const newFlippedTiles = [...flippedTiles, clickedTile];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      setIsChecking(true);
      if (newFlippedTiles[0].name === newFlippedTiles[1].name) {
        setMatchedTiles(prev => [...prev, newFlippedTiles[0].id, newFlippedTiles[1].id]);
        onMatchedPair();
        // Play the matching song
        audioRef.current.src = newFlippedTiles[0].audio;
        audioRef.current.play();
        setTimeout(() => {
          setFlippedTiles([]);
          setIsChecking(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedTiles([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-lg shadow-lg">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          isFlipped={flippedTiles.some((t) => t.id === tile.id)}
          isMatched={matchedTiles.includes(tile.id)}
          onClick={() => handleTileClick(tile)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
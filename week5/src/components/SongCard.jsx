import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    // Important: make sure `data` is an array of songs
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const isCurrentSong = activeSong?.id === song?.id;

  // Format Apple Music artwork URL safely
  const coverArt = song?.attributes?.artwork?.url
    ?.replace('{w}', '250')
    ?.replace('{h}', '250') || '';

  const artistId = song?.relationships?.artists?.data?.[0]?.id || '';
  const songTitle = song?.attributes?.name || 'Unknown Title';
  const artistName = song?.attributes?.artistName || 'Unknown Artist';

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            isCurrentSong ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="cover art"
          src={coverArt}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{songTitle}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={artistId ? `/artists/${artistId}` : '#'}>
            {artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;

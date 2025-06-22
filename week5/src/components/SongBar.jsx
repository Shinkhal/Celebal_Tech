/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const isApple = !!song.attributes;
  const isActive = activeSong?.attributes?.name === song?.attributes?.name || activeSong?.title === song?.title;

  const imageUrl = isApple
    ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')
    : song?.images?.coverart;

  const title = isApple ? song?.attributes?.name : song?.title;
  const subtitle = isApple ? song?.attributes?.artistName || song?.attributes?.albumName : song?.subtitle;

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        isActive ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-20 h-20 rounded-lg" src={imageUrl} alt={title} />

        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-xl font-bold text-white">{title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">{title}</p>
          )}
          <p className="text-base text-gray-300 mt-1">{subtitle}</p>
        </div>
      </div>

      {!artistId && (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )}
    </div>
  );
};

export default SongBar;

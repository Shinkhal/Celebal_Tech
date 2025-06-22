import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  const hasSongs = currentSongs?.length > 0;

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? 'red' : 'white'}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
        title="Repeat"
        aria-label="Repeat"
      />

      {hasSongs && (
        <MdSkipPrevious
          size={30}
          color="#FFF"
          onClick={handlePrevSong}
          className="cursor-pointer"
          title="Previous"
          aria-label="Previous song"
        />
      )}

      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
          title="Pause"
          aria-label="Pause"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
          title="Play"
          aria-label="Play"
        />
      )}

      {hasSongs && (
        <MdSkipNext
          size={30}
          color="#FFF"
          onClick={handleNextSong}
          className="cursor-pointer"
          title="Next"
          aria-label="Next song"
        />
      )}

      <BsShuffle
        size={20}
        color={shuffle ? 'red' : 'white'}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
        title="Shuffle"
        aria-label="Shuffle"
      />
    </div>
  );
};

export default Controls;

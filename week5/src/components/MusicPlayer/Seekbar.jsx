import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // Format time as M:SS
  const getTime = (time) => (
    Number.isNaN(time) || time === 0 ? '0:00' : `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`
  );

  return (
    <div className="hidden sm:flex flex-row items-center">
      <button
        type="button"
        onClick={() => setSeekTime(Math.max(appTime - 5, 0))}
        className="hidden lg:mr-4 lg:block text-white"
        title="Rewind 5 seconds"
        aria-label="Rewind 5 seconds"
      >
        –
      </button>

      <p className="text-white w-10 text-right">{getTime(value)}</p>

      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg accent-white cursor-pointer"
        aria-label="Seek bar"
      />

      <p className="text-white w-10 text-left">{getTime(max)}</p>

      <button
        type="button"
        onClick={() => setSeekTime(Math.min(appTime + 5, max))}
        className="hidden lg:ml-4 lg:block text-white"
        title="Forward 5 seconds"
        aria-label="Forward 5 seconds"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;

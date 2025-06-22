import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiChevronDown, HiMusicNote } from 'react-icons/hi';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error || !data) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title || 'Pop';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-12">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
        <div className="relative glass-card p-8 rounded-3xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title Section */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <HiMusicNote className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{genreTitle}</span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Explore trending tracks and hidden gems in {genreTitle.toLowerCase()} music
                </p>
              </div>
            </div>

            {/* Genre Selector */}
            <div className="relative">
              <select
                onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                value={genreListId || 'POP'}
                className="glass-card appearance-none bg-transparent text-white px-6 py-4 pr-12 rounded-2xl border border-white/20 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20 cursor-pointer font-medium min-w-[200px]"
              >
                {genres.map((genre) => (
                  <option key={genre.value} value={genre.value} className="bg-gray-900 text-white">
                    {genre.title}
                  </option>
                ))}
              </select>
              <HiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Trending Now</h2>
            <p className="text-gray-400">Most popular {genreTitle.toLowerCase()} tracks</p>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data.map((song, i) => (
            <div key={song.id} className="group">
              <SongCard
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed top-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default Discover;

import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;
  if (error || !Array.isArray(data)) return <Error />;

  // Normalize Apple Music song format
  const songs = data.map((item) => ({
    id: item.id,
    key: item.id,
    title: item.attributes?.name,
    subtitle: item.attributes?.artistName,
    images: {
      coverart: item.attributes?.artwork?.url?.replace('{w}x{h}', '400x400'),
    },
    hub: {
      actions: [
        {}, // placeholder for applemusicplay
        { uri: item.attributes?.previews?.[0]?.url }, // audio URI
      ],
    },
    attributes: {
      name: item.attributes?.name,
      artistName: item.attributes?.artistName,
      artwork: {
        url: item.attributes?.artwork?.url?.replace('{w}x{h}', '400x400'),
      },
      previews: item.attributes?.previews || [],
    },
  }));

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            data={songs}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;

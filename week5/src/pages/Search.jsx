import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  // Normalize search result to match SongCard-compatible structure
  const songs = data?.tracks?.hits?.map(({ track }) => ({
    id: track.key,
    key: track.key,
    title: track.title,
    subtitle: track.subtitle,
    images: track.images,
    hub: track.hub,
    attributes: {
      name: track.title,
      artistName: track.subtitle,
      artwork: {
        url: track.images?.coverart?.replace('400x400cc', '{w}x{h}cc'),
      },
      previews: track?.hub?.actions?.[1]?.uri
        ? [{ url: track.hub.actions[1].uri }]
        : [],
    } })) || [];

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;

import React from 'react';
import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading artists..." />;
  if (error) return <Error />;

  // Extract unique artists
  const uniqueArtists = Array.from(
    new Map(
      data?.map((track) => {
        const artistId = track?.relationships?.artists?.data?.[0]?.id;
        const artistName = track?.attributes?.artistName;
        const artwork = track?.attributes?.artwork?.url?.replace('{w}x{h}', '500x500');

        return [artistId, { id: artistId, name: artistName, image: artwork }];
      }),
    ),
  ).map(([_, artist]) => artist);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {uniqueArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;

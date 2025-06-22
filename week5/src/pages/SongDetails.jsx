import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
  } = useGetSongRelatedQuery({ songid });

  const song = songData?.data?.[0];

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details..." />;
  }

  if (error || !song) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (selectedSong, i) => {
    dispatch(setActiveSong({ song: selectedSong, data: relatedSongs?.data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={song} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold mb-2">Lyrics:</h2>
        <p className="text-gray-400 text-base my-1">
          Sorry, lyrics are not available via this API.
        </p>
      </div>

      <RelatedSongs
        data={relatedSongs?.data || []}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;

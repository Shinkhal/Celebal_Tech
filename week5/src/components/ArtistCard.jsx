import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ artist }) => (
  <Link to={`/artists/${artist.id}`}>
    <div className="flex flex-col w-[200px] p-4 bg-[#1e1e1e] rounded-lg cursor-pointer hover:scale-105 transition-all">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-full rounded-full object-cover"
      />
      <p className="mt-4 text-white font-bold text-lg text-center">{artist.name}</p>
    </div>
  </Link>
);

export default ArtistCard;

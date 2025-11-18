
import React from 'react';

interface EbookCoverProps {
  title: string;
  author: string;
  imageUrl: string;
}

const EbookCover: React.FC<EbookCoverProps> = ({ title, author, imageUrl }) => {
  return (
    <div
      className="w-full h-full rounded-lg bg-cover bg-center shadow-lg relative overflow-hidden flex flex-col justify-between p-8 text-white font-serif"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
          {title || 'Book Title'}
        </h1>
      </div>
      <div className="relative z-10 text-center">
        <p className="text-xl md:text-2xl font-medium drop-shadow-md">
          {author || 'Author Name'}
        </p>
      </div>
    </div>
  );
};

export default EbookCover;

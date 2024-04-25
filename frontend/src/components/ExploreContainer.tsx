import React from 'react';
import './ExploreContainer.css';
import FilmCard from './FilmCart';

interface ContainerProps {
  name: string;
  films: {
    title: string;
    poster: string;
    description: string;
    genres: string[];
  }[];
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, films }) => {
  console.log('Props of ExploreContainer:', { name, films });
  return (
    <div className="container">
      <div className="grid-container">
        {films &&
          films.map((film, index) => (
            <FilmCard
              key={index}
              title={film.title}
              posterPath={film.poster}
              description={film.description}
              genres={film.genres}
            />
          ))}
      </div>
    </div>
  );
};

export default ExploreContainer;

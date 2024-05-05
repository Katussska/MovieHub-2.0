import React from 'react';
import './FilmContainer.css';
import FilmCard from './FilmCart';
import { Film } from '../types';

interface ContainerProps {
  films: Array<Film>;
}

const FilmContainer: React.FC<ContainerProps> = ({ films }) => {
  return (
    <div className="container">
      <div className="grid-container">
        {films &&
          films.map((film, index) => (
            <FilmCard
              key={index}
              id={film.filmId}
              title={film.title}
              posterPath={film.posterPath}
              description={film.description}
              genres={film.genres}
            />
          ))}
      </div>
    </div>
  );
};

export default FilmContainer;

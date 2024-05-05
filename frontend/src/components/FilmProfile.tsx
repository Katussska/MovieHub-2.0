import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface FilmProps {
  adult: boolean;
  genres: string[];
  filmId: number;
  title: string;
  description: string;
  posterPath: string;
  release: string;
  rating: number;
}

interface MatchParams {
  id: string;
}

const FilmProfile: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [film, setFilm] = useState<FilmProps | null>(null);

  const displayGenres = (genres: string[]) => {
    return genres
      .map((genre) => (genre === 'Science Fiction' ? 'Sci-Fi' : genre))
      .join(' ');
  };

  useEffect(() => {
    console.log('Fetching film data for id:', match.params.id);
    fetch(`/films/filmInfo?filmId=${match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched film data:', data);
        data = {
          ...data,
          genres: data.genres.map((genre: any) => genre.name),
        };
        setFilm(data);
      })
      .catch((error) => console.error('Error fetching film data:', error));
  }, [match.params.id]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <img src={film.posterPath} alt={film.title} />
      <p>{film.description}</p>
      <p>{displayGenres(film.genres)}</p>
      <p>Release Date: {film.release}</p>
      <p>Rating: {film.rating}</p>
      <p>{film.adult ? 'Adult' : 'Not Adult'}</p>
    </div>
  );
};

export default FilmProfile;

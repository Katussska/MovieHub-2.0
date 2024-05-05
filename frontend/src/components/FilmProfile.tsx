import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FilmDetail, Genre } from '../types';

const FilmProfile = () => {
  const [film, setFilm] = useState<FilmDetail | null>(null);
  const { id } = useParams<{ id: string }>();

  const displayGenres = (genres: string[]) => {
    return genres
      .map((genre) => (genre === 'Science Fiction' ? 'Sci-Fi' : genre))
      .join(' ');
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/films/filmInfo?filmId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched film data:', data);
        data = {
          ...data,
          genres: data.genres.map((genre: Genre) => genre.name),
        };
        setFilm(data);
      })
      .catch((error) => console.error('Error fetching film data:', error));
  }, [id]);

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

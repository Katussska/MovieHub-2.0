import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FilmDetail, Genre } from '../types';
import { IonItem, IonLabel } from '@ionic/react';
import { RenderStars } from './RenderStars';
import './FilmProfile.css';
import ReviewsContainer from './ReviewsContainer';

const FilmProfile = () => {
  const [film, setFilm] = useState<FilmDetail | null>(null);
  const { id } = useParams<{ id: string }>();

  const displayGenres = (genres: string[]) => {
    return genres
      .map((genre) => (genre === 'Science Fiction' ? 'Sci-Fi' : genre))
      .join(' • ');
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
    <div className={'film-container'}>
      <div className={'film-poster-rating'}>
        <div className={'film-poster'}>
          <img src={film.posterPath} alt={film.title} />
        </div>

        <div className={'rating-container'}>
          <IonItem className={'film-rating'}>
            <RenderStars rating={film.rating} />
          </IonItem>
        </div>
      </div>

      <div className={'film-details'}>
        <div className={'film-title'}>
          <p>{film.title}</p>
        </div>

        <IonItem>
          <IonLabel color={'primary'}>Genres:</IonLabel>
          <p className={'film-genres'}>{displayGenres(film.genres)}</p>
        </IonItem>

        <IonItem>
          <IonLabel color={'primary'}>Release Date:</IonLabel>
          <p>{film.release}</p>
        </IonItem>

        <IonItem className={'film-description'}>
          <IonLabel color={'primary'}>
            Description:<p>{film.description}</p>
          </IonLabel>
        </IonItem>

        <IonItem className={'film-reviews'}>
          <IonLabel color={'primary'}>Reviews:</IonLabel>
          <ReviewsContainer />
        </IonItem>
      </div>
    </div>
  );
};

export default FilmProfile;

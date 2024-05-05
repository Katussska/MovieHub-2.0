import React from 'react';
import './FilmCart.css';
import { Link } from 'react-router-dom';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

interface CartProps {
  id: number;
  title: string;
  posterPath: string;
  description: string;
  genres: string[];
}

const FilmCard: React.FC<CartProps> = ({
  id,
  title,
  posterPath,
  description,
  genres,
}) => {
  const displayGenres = (genres: string[]) => {
    return genres
      .slice(0, 3)
      .map((genre) => (genre === 'Science Fiction' ? 'Sci-Fi' : genre))
      .join(' ');
  };

  return (
    <Link to={`/page/film/${id}`}>
      <IonCard className="StyledCard">
        <img alt="Film poster not found" src={posterPath} />
        <IonCardHeader>
          <IonCardSubtitle className="genres">
            {displayGenres(genres)}
          </IonCardSubtitle>
          <IonCardTitle className="StyledTitle">{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="description">{description}</IonCardContent>
      </IonCard>
    </Link>
  );
};

export default FilmCard;

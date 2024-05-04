import React from 'react';
import './FilmCart.css';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

interface CartProps {
  title: string;
  posterPath: string;
  description: string;
  genres: string[];
}

const FilmCard: React.FC<CartProps> = ({
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
  );
};

export default FilmCard;

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
  poster: string;
  description: string;
  genres: string[];
}

const FilmCard: React.FC<CartProps> = ({
  title,
  poster,
  description,
  genres,
}) => {
  const shortenDescription = (desc: string) => {
    if (desc.length > 50) {
      return desc.substring(0, 50) + '...';
    }

    return desc;
  };

  const displayGenres = (genres: string[]) => {
    return genres
      .slice(0, 3)
      .map((genre) => (genre === 'Science Fiction' ? 'Sci-Fi' : genre))
      .join(' ');
  };

  return (
    <IonCard className="StyledCard">
      <img alt="Film poster" src={`https://image.tmdb.org/t/p/200/${poster}`} />
      <IonCardHeader>
        <IonCardSubtitle>{displayGenres(genres)}</IonCardSubtitle>
        <IonCardTitle className="StyledTitle">{title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{shortenDescription(description)}</IonCardContent>
    </IonCard>
  );
};

export default FilmCard;

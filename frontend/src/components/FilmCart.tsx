import React from 'react';
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
    if (desc.length > 100) {
      return desc.substring(0, 100) + '...';
    }

    return desc;
  };

  return (
    <IonCard>
      <img alt="Film poster" src={`https://image.tmdb.org/t/p/200/${poster}`} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{genres.join(' ')}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{shortenDescription(description)}</IonCardContent>
    </IonCard>
  );
};
export default FilmCard;

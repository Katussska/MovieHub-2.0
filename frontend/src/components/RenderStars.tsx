import React from 'react';
import './UserProfile.css';
import { IonIcon } from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';

export const RenderStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 10 - fullStars - halfStar;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 900px)' });

  const stars = [];

  for (let i = 0; i < fullStars; i++)
    stars.push(
      <IonIcon
        icon={star}
        color={'primary'}
        size={isSmallScreen ? undefined : 'large'}
      />,
    );

  for (let i = 0; i < halfStar; i++)
    stars.push(
      <IonIcon
        icon={starHalf}
        color={'primary'}
        size={isSmallScreen ? undefined : 'large'}
      />,
    );

  for (let i = 0; i < emptyStars; i++)
    stars.push(
      <IonIcon
        icon={starOutline}
        color={'primary'}
        size={isSmallScreen ? undefined : 'large'}
      />,
    );

  return <>{stars}</>;
};

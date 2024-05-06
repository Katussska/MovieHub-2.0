import React from 'react';
import './Review.css';
import { IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { Review } from '../types';
import { useMediaQuery } from 'react-responsive';

interface ReviewProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewProps> = ({ review }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <IonItem>
      <IonIcon
        slot="start"
        color="primary"
        size={isSmallScreen ? 'default' : 'large'}
        icon={personCircleOutline}
      ></IonIcon>
      <div className={'review-container'}>
        <IonLabel className={'review-username'}>
          {review.username} <p>{review.date}</p>
        </IonLabel>
        <IonText className={'review-content'}>{review.content}</IonText>
      </div>
    </IonItem>
  );
};

export default ReviewItem;

import React from 'react';
import { IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { Review } from '../types';
import './ReviewContainer.css';

interface ReviewProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewProps> = ({ review }) => {
  console.log(review.username);

  return (
    <IonItem className={'review-item-container'}>
      <IonIcon
        slot="start"
        color="primary"
        size="large"
        icon={personCircleOutline}
      ></IonIcon>
      <div className={'review-container'}>
        <IonLabel color="primary" className={'review-username'}>
          {review.username}
          <p>{review.date}</p>
        </IonLabel>
        <IonText className={'review-content'}>{review.content}</IonText>
      </div>
    </IonItem>
  );
};

export default ReviewItem;

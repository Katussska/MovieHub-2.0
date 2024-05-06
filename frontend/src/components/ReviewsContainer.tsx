import React, { useEffect, useRef, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { Review } from '../types';
import { useParams } from 'react-router';
import ReviewItem from './ReviewItem';

const ReviewsContainer = () => {
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL + `/reviews/film/filmReviews?filmId=${id}`,
    )
      .then((response) => response.json())
      .then((data: Array<Review>) => {
        console.log('Fetched reviews data:', data);
        setReviews(data);
      })
      .catch((error) => console.error('Error fetching reviews data:', error));
  }, [id]);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      ref={modal}
      presentingElement={presentingElement!}
      trigger={'open-modal'}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reviews</IonTitle>
          <IonButtons slot="end">
            <IonIcon
              size={'large'}
              icon={closeCircleOutline}
              onClick={() => dismiss()}
            >
              Close
            </IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {reviews &&
            reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ReviewsContainer;

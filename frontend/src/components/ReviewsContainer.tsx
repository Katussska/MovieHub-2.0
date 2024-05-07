import React, { useEffect, useRef, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chatbubbles, closeCircleOutline, send } from 'ionicons/icons';
import { Review } from '../types';
import { useParams } from 'react-router';
import ReviewItem from './ReviewItem';
import './ReviewContainer.css';

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

  function openModal() {
    modal.current?.present();
  }

  return (
    <>
      <IonIcon
        size={'large'}
        icon={chatbubbles}
        onClick={openModal}
        className={'review-icon'}
      >
        Open Reviews
      </IonIcon>

      <IonModal
        ref={modal}
        presentingElement={presentingElement!}
        trigger={'open-modal'}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle color={'primary'}>Reviews</IonTitle>
            <IonButtons slot="end">
              <IonIcon
                slot={'end'}
                size={'large'}
                className={'review-icon-close'}
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
            {reviews.length === 0 ? (
              <IonTitle>No reviews available</IonTitle>
            ) : (
              reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))
            )}
          </IonList>
        </IonContent>

        <IonItem className={'add-review-container'}>
          <IonInput
            label="Review comment"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter review"
            counter={true}
            maxlength={150}
          ></IonInput>
          <IonIcon color={'primary'} icon={send}></IonIcon>
        </IonItem>
      </IonModal>
    </>
  );
};

export default ReviewsContainer;

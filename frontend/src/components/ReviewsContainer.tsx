import React, { useEffect, useRef, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
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
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL + `/reviews/film/filmReviews?filmId=${id}`,
    )
      .then((response) => response.json())
      .then((data: Array<any>) => {
        console.log('Fetched reviews data:', data);
        const reviews = data.map((item) => ({
          date: item.date,
          content: item.content,
          username: item.username,
        }));
        setReviews(reviews);
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

  const sendReview = () => {
    const date = new Date().toISOString().split('T')[0];

    fetch(
      `http://localhost:8080/reviews/create?content=${encodeURIComponent(content)}&date=${date}&username=${localStorage.getItem('user')}&filmId=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);

        setReviews((prevReviews) => [
          ...prevReviews,
          {
            content: content,
            date: date,
            username: localStorage.getItem('user')!,
            filmId: id,
          },
        ]);
        setContent('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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

        <div className={'add-review-container'}>
          <IonInput
            className={'add-review'}
            label="Enter review"
            labelPlacement="floating"
            fill="outline"
            placeholder=" I really liked this movie!"
            counter={true}
            maxlength={150}
            value={content}
            onIonChange={(e) => setContent(e.detail.value!)}
          ></IonInput>

          <IonIcon
            color={'primary'}
            icon={send}
            size={'large'}
            className={'add-review-icon'}
            onClick={sendReview}
          ></IonIcon>
        </div>
      </IonModal>
    </>
  );
};

export default ReviewsContainer;

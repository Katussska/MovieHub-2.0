import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { fetchFilms } from '../services/fetchFilms';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let result;

      switch (name) {
        case 'Trending':
          result = await fetchFilms('http://localhost:8080/films/trending');
          break;
        case 'Now Playing':
          result = await fetchFilms('http://localhost:8080/films/nowPlaying');
          break;
        case 'Popular':
          result = await fetchFilms('http://localhost:8080/films/popular');
          break;
        case 'Top Rated':
          result = await fetchFilms('http://localhost:8080/films/topRated');
          break;
        case 'Upcoming':
          result = await fetchFilms('http://localhost:8080/films/upcoming');
          break;
      }
    };
  }, [name]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;

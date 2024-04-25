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
  const [data, setData] = useState<
    {
      title: string;
      posterPath: string;
      description: string;
      genres: string[];
    }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      let result;

      switch (name) {
        case 'Trending':
          result = await fetchFilms('/films/trending');
          break;
        case 'Now Playing':
          result = await fetchFilms('/films/nowPlaying');
          break;
        case 'Popular':
          result = await fetchFilms('/films/popular');
          break;
        case 'Top Rated':
          result = await fetchFilms('/films/topRated');
          break;
        case 'Upcoming':
          result = await fetchFilms('/films/upcoming');
          break;
      }

      console.log('Data in useEffect:', result); // výpis dat
      setData(result);
    };

    getData();
  }, [name]);

  console.log('Page rendered with name:', name);

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
        <ExploreContainer name={name} films={data} />
      </IonContent>
    </IonPage>
  );
};

export default Page;

import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import UserProfile from '../components/UserProfile';
import FilmProfile from '../components/FilmProfile';
import './Page.css';
import { fetchFilms } from '../services/fetchFilms';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [data, setData] = useState<
    {
      filmId: number;
      title: string;
      posterPath: string;
      description: string;
      genres: string[];
    }[]
  >([]);

  const [user, setUser] = useState<{
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }>();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (event: CustomEvent) => {
    setSearchValue(event.detail.value);
    const result = await fetchFilms(
      `/films/search?query=${event.detail.value}`,
    );
    setData(result);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

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
        case 'Search':
          result = await fetchFilms(`/films/search?query=${searchValue}`);
          break;
      }
      setData(result);
    };

    getData();
  }, [name]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className={name === 'Search' ? 'title-search' : ''}>
            {name}
          </IonTitle>
          {name === 'Search' && (
            <IonSearchbar
              className="search-bar"
              value={searchValue}
              onIonChange={handleSearch}
            ></IonSearchbar>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {name === 'Profile' ? (
          <UserProfile user={user} />
        ) : (
          <>
            <Route path="/page/film/:id" exact={true} component={FilmProfile} />
            <Route path="/page/:name" exact={true}>
              <ExploreContainer name={name} films={data} />
            </Route>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
export default Page;

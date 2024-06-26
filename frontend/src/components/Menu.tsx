import React from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  film,
  heart,
  person,
  play,
  search,
  star,
  trendingUp,
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export const appPages: AppPage[] = [
  {
    title: 'Search',
    url: '/page/search',
    iosIcon: search,
    mdIcon: search,
  },
  {
    title: 'Trending',
    url: '/page/trending',
    iosIcon: trendingUp,
    mdIcon: trendingUp,
  },
  {
    title: 'Now Playing',
    url: '/page/nowPlaying',
    iosIcon: play,
    mdIcon: play,
  },
  {
    title: 'Popular',
    url: '/page/popular',
    iosIcon: heart,
    mdIcon: heart,
  },
  {
    title: 'Top Rated',
    url: '/page/topRated',
    iosIcon: star,
    mdIcon: star,
  },
  {
    title: 'Upcoming',
    url: '/page/upcoming',
    iosIcon: film,
    mdIcon: film,
  },
  {
    title: 'Profile',
    url: '/page/profile',
    iosIcon: person,
    mdIcon: person,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MovieHub</IonListHeader>

          {/*TODO: predelat note na username*/}
          <IonNote>{localStorage.getItem('user')}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonButton className="ion-margin-start" onClick={handleLogout}>
          Log out
        </IonButton>{' '}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

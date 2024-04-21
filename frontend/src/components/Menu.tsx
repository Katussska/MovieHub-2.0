import React from 'react';
import {
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
import { film, heart, person, search, star, trendingUp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Search',
    url: '/page/Search',
    iosIcon: search,
    mdIcon: search,
  },
  {
    title: 'Trending',
    url: '/page/Trending',
    iosIcon: trendingUp,
    mdIcon: trendingUp,
  },
  {
    title: 'Popular',
    url: '/page/Popular',
    iosIcon: heart,
    mdIcon: heart,
  },
  {
    title: 'Top Rated',
    url: '/page/TopRated',
    iosIcon: star,
    mdIcon: star,
  },
  {
    title: 'Upcoming',
    url: '/page/Upcoming',
    iosIcon: film,
    mdIcon: film,
  },
  {
    title: 'Profile',
    url: '/page/Profile',
    iosIcon: person,
    mdIcon: person,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {/*TODO: predelat listHeader na user first and last name*/}
          <IonListHeader>Inbox</IonListHeader>

          {/*TODO: predelat note na username*/}
          <IonNote>hi@ionicframework.com</IonNote>
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
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

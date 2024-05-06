import React, { useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import FilmProfile from './components/FilmProfile';
import ExploreFilms from './components/ExploreFilms';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const handleLogin = () => {
    localStorage.setItem('user', 'kokot');
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/register" exact>
              <Register onRegister={handleLogin} />
            </Route>
            <Route path="/login" exact>
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/page/:name" exact>
              <Page>
                <ExploreFilms />
              </Page>
            </Route>
            <Route path="/page/search" exact>
              <Page title="Search">
                <Search />
              </Page>
            </Route>
            <Route path="/page/profile" exact>
              <Page title="Profile">
                <UserProfile />
              </Page>
            </Route>
            <Route path="/page/film/:id" exact>
              <Page>
                <FilmProfile />
              </Page>
            </Route>
            <Redirect from="/" to="/page/trending" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { ReactNode } from 'react';
import { PrivateRoute } from '../components/PrivateRoute';
import { useParams } from 'react-router';

import './Page.css';
import { appPages } from '../components/Menu';

const Page = ({ title, children }: { title?: string; children: ReactNode }) => {
  const { name } = useParams<{ name: string }>();

  return (
    <PrivateRoute>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              {title
                ? title
                : appPages.find(
                    (page) => page.url.replace('/page/', '') === name,
                  )?.title}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>{children}</IonContent>
      </IonPage>
    </PrivateRoute>
  );
};

export default Page;

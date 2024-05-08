import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  IonButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Login.css';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Toast from './Toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/login?username=${username}&password=${password}`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        console.error('Response status:', response.status);
        setShowToast(true);
        setToastMessage('Bad username or password');
        return;
      }

      const text = await response.text();
      if (!text) {
        console.log('No response body');
        return;
      }

      const data = JSON.parse(text);
      if ('errorMessage' in data) {
        console.error(data.errorMessage);
      } else {
        localStorage.setItem('user', username);
        history.push('/page/trending');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MovieHub</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="form">
        <h1>Sign In</h1>
        <h3>Welcome Back! </h3>

        <form onSubmit={handleSubmit}>
          <IonInput
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            label="Username"
            labelPlacement="floating"
            fill="outline"
            placeholder="Tassilo"
          ></IonInput>

          <IonInput
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            label="Password"
            type="password"
            labelPlacement="floating"
            fill="outline"
          ></IonInput>

          <Link to="/register">
            <IonButton fill="outline" size="small">
              I do not have an account
              <IonIcon slot="start" icon={personAddOutline}></IonIcon>
            </IonButton>
          </Link>

          <IonButton onClick={handleSubmit} id="open-toast">
            Login
            <IonIcon slot="start" icon={logInOutline}></IonIcon>
          </IonButton>
        </form>
      </div>
      <Toast
        isOpen={showToast}
        message={toastMessage}
        onDidDismiss={() => setShowToast(false)}
      />{' '}
    </>
  );
};

export default Login;

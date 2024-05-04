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

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Replace with your API call
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      onLogin();
    } else {
      // Handle error
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

          <IonButton onClick={handleSubmit}>
            Login
            <IonIcon slot="start" icon={logInOutline}></IonIcon>
          </IonButton>
        </form>
      </div>
    </>
  );
};

export default Login;

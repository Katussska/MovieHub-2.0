import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Toast from './Toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 0,
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            reviews: [],
          }),
        },
      );
      if (!response.ok) {
        console.error('Response status:', response.status);
      }

      const data = await response.json();
      if ('errorMessage' in data) {
        console.error(data.errorMessage);
        setShowToast(true);
        setToastMessage(data.errorMessage);
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
        <h1>Sign up</h1>
        <h3>and dive into films</h3>

        <form onSubmit={handleSubmit}>
          <IonInput
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
            label="First Name"
            labelPlacement="floating"
            fill="outline"
            placeholder=" Your first name"
          ></IonInput>
          <IonInput
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
            label="Last Name"
            labelPlacement="floating"
            fill="outline"
            placeholder=" Your last name"
          ></IonInput>
          <IonInput
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            label="Username"
            labelPlacement="floating"
            fill="outline"
            placeholder=" Your username"
          ></IonInput>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            label="Email Address"
            type="email"
            labelPlacement="floating"
            fill="outline"
            placeholder="example@company.com"
          ></IonInput>
          <IonInput
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            label="Password"
            type="password"
            labelPlacement="floating"
            fill="outline"
          ></IonInput>

          <Link to="/login">
            <IonButton fill="outline" size="small">
              Already have an account
              <IonIcon slot="start" icon={logInOutline}></IonIcon>
            </IonButton>
          </Link>

          <IonButton onClick={handleSubmit} id="open-toast">
            Register
            <IonIcon slot="start" icon={personAddOutline}></IonIcon>
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

export default Register;

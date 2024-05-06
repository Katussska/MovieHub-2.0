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

interface RegisterProps {
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    // event.preventDefault();
    // try {
    //   const response = await fetch('/users/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password,
    //       email: email,
    //       firstName: firstName,
    //       lastName: lastName,
    //     }),
    //   });
    //   if (!response.ok) {
    //     console.error('Response status:', response.status);
    //   }
    //   const data = await response.json();
    //   if (data.success) {
    //     onRegister();
    //   } else {
    //     // Handle error
    //   }
    // } catch (error) {
    //   console.error('Fetch error:', error);
    // }
    event.preventDefault();
    onRegister();
    history.push('/page/trending');
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
            placeholder="Filip"
          ></IonInput>
          <IonInput
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
            label="Last Name"
            labelPlacement="floating"
            fill="outline"
            placeholder="Sikora"
          ></IonInput>
          <IonInput
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            label="Username"
            labelPlacement="floating"
            fill="outline"
            placeholder="Tassilo"
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

          <IonButton onClick={handleSubmit}>
            Register
            <IonIcon slot="start" icon={personAddOutline}></IonIcon>
          </IonButton>
        </form>
      </div>
    </>
  );
};

export default Register;

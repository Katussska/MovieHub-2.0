import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import EditPopUp from './EditPopUp';
import './UserProfile.css';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import {
  createOutline,
  eyeOffOutline,
  eyeOutline,
  mailOutline,
  personCircleOutline,
  personOutline,
} from 'ionicons/icons';

interface ProfileProps {
  user:
    | {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
      }
    | undefined;
}

const ExploreContainer: React.FC<ProfileProps> = ({ user }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [editText, setEditText] = useState('');
  const handleEditClick = (text: string) => {
    setEditText(text);
    setShowEditPopUp(true);
  };

  const isSmallScreen = useMediaQuery({ query: '(max-width: 450px)' });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 451px) and (max-width: 1250px)',
  });

  return (
    <div className="container">
      <IonCard className="card-container">
        <IonCardHeader>
          <IonCardTitle>Hi, {user?.username || '[username]'}</IonCardTitle>
          <IonCardSubtitle>Here is your profile</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonIcon
                slot="start"
                color="primary"
                size={isSmallScreen ? 'default' : 'large'}
                icon={personCircleOutline}
              ></IonIcon>
              <IonLabel>{user?.username || '[username]'}</IonLabel>
              <IonIcon
                className="edit-icon"
                slot="end"
                color="primary"
                size={
                  isSmallScreen ? 'small' : isMediumScreen ? 'default' : 'large'
                }
                icon={createOutline}
                onClick={() => handleEditClick('username')}
              ></IonIcon>
            </IonItem>

            <IonItem>
              <IonIcon
                slot="start"
                color="primary"
                size={isSmallScreen ? 'default' : 'large'}
                icon={personOutline}
              ></IonIcon>
              <IonLabel>{user?.firstName || '[firstName]'}</IonLabel>
              <IonIcon
                className="edit-icon"
                slot="end"
                color="primary"
                size={
                  isSmallScreen ? 'small' : isMediumScreen ? 'default' : 'large'
                }
                icon={createOutline}
                onClick={() => handleEditClick('first name')}
              ></IonIcon>
            </IonItem>

            <IonItem>
              <IonIcon
                slot="start"
                color="primary"
                size={isSmallScreen ? 'default' : 'large'}
                icon={personOutline}
              ></IonIcon>
              <IonLabel>{user?.lastName || '[lastName]'}</IonLabel>
              <IonIcon
                className="edit-icon"
                slot="end"
                color="primary"
                size={
                  isSmallScreen ? 'small' : isMediumScreen ? 'default' : 'large'
                }
                icon={createOutline}
                onClick={() => handleEditClick('last name')}
              ></IonIcon>
            </IonItem>

            <IonItem>
              <IonIcon
                slot="start"
                color="primary"
                size={isSmallScreen ? 'default' : 'large'}
                icon={mailOutline}
              ></IonIcon>
              <IonLabel>{user?.email || '[email]'}</IonLabel>
              <IonIcon
                className="edit-icon"
                slot="end"
                color="primary"
                size={
                  isSmallScreen ? 'small' : isMediumScreen ? 'default' : 'large'
                }
                icon={createOutline}
                onClick={() => handleEditClick('email')}
              ></IonIcon>
            </IonItem>

            <IonItem>
              <IonIcon
                className="lock"
                slot="start"
                color="primary"
                size={isSmallScreen ? 'default' : 'large'}
                icon={isPasswordHidden ? eyeOutline : eyeOffOutline}
                onClick={togglePasswordVisibility}
              ></IonIcon>
              <IonInput
                type={isPasswordHidden ? 'password' : 'text'}
                value={user?.password || '[password]'}
                readonly
              ></IonInput>
              <IonIcon
                className="edit-icon"
                slot="end"
                color="primary"
                size={
                  isSmallScreen ? 'small' : isMediumScreen ? 'default' : 'large'
                }
                icon={createOutline}
                onClick={() => handleEditClick('password')}
              ></IonIcon>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
      {showEditPopUp && (
        <EditPopUp
          showAlert={showEditPopUp}
          setShowAlert={setShowEditPopUp}
          text={editText}
        />
      )}
    </div>
  );
};

export default ExploreContainer;

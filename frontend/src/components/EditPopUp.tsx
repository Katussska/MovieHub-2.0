import React from 'react';
import { IonAlert } from '@ionic/react';

interface EditPopUpProps {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  text: string;
}

const EditPopUp: React.FC<EditPopUpProps> = ({
  showAlert,
  setShowAlert,
  text,
}) => {
  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={`Edit your ${text}`}
      buttons={['Cancel', 'Edit']}
      inputs={[
        {
          placeholder: 'NOT WORKING',
        },
      ]}
    ></IonAlert>
  );
};

export default EditPopUp;

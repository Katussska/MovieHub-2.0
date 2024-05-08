import React from 'react';
import { IonToast } from '@ionic/react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onDidDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isOpen, onDidDismiss }) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      message={message}
      duration={3000}
      color="danger"
    />
  );
};

export default Toast;

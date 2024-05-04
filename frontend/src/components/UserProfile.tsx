import React from 'react';
import './UserProfile.css';

interface ProfileProps {
  user: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }[];
}

const ExploreContainer: React.FC<ProfileProps> = ({ user }) => {
  console.log('Props of UserProfile:', { user });
  return <div></div>;
};

export default ExploreContainer;

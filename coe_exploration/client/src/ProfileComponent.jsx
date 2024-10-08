import React from 'react';
import { useAuth } from './authentication/AuthComponent';

const UserProfile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect to the login page or perform other actions after logout
    window.location.href = '/ ';
  };

  return (
    <div className="user_profile">
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
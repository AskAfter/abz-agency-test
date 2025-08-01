import { useState } from 'react';
import {
  Header,
  HeroSection,
  UsersSection,
  SignUpSection,
} from '../components/sections';

export default function Index() {
  const [refreshUsers, setRefreshUsers] = useState(0);

  const handleUserRegistration = () => {
    // Trigger users list refresh by incrementing the refresh counter
    setRefreshUsers(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <UsersSection key={refreshUsers} id="users" />
      <SignUpSection onUserRegistered={handleUserRegistration} id="signup" />
    </div>
  );
}

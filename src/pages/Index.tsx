import { useState, Suspense, lazy, useCallback, memo } from 'react';
import { Header, HeroSection } from '../components/sections';

// Lazy load heavy sections for better initial load performance
const UsersSection = lazy(() => 
  import('../components/sections/UsersSection').then(module => ({
    default: module.UsersSection
  }))
);
const SignUpSection = lazy(() => 
  import('../components/sections/SignUpSection').then(module => ({
    default: module.SignUpSection
  }))
);

// Section loading fallback
const SectionLoader = memo(() => (
  <div className="py-20 flex justify-center">
    <div className="animate-pulse space-y-4 w-full max-w-[1170px] px-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
));
SectionLoader.displayName = 'SectionLoader';

function Index() {
  const [refreshUsers, setRefreshUsers] = useState(0);

  const handleUserRegistration = useCallback(() => {
    // Trigger users list refresh by incrementing the refresh counter
    setRefreshUsers(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <UsersSection key={refreshUsers} id="users" />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SignUpSection onUserRegistered={handleUserRegistration} id="signup" />
      </Suspense>
    </div>
  );
}

export default memo(Index);

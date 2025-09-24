import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Events from './components/Events';
import Host from './components/HostEvent';
import Manage from './components/ManageEvent';
import Clubs from './components/Clubs';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { initStore } from './services/Initialize';
import { useNavigation } from './hooks/useNavigation';
import { useToast } from './hooks/useToast';
import './App.css';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { currentSection, navigateTo } = useNavigation();
  const { toastMessage, showToast } = useToast();

  // Initialize the application
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initStore();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        showToast('Failed to initialize application');
      }
    };

    initializeApp();
  }, [showToast]);

  const renderSection = () => {
    if (!isInitialized) {
      return <div>Loading...</div>;
    }

    switch (currentSection) {
      case 'events':
        return <Events />;
      case 'host':
        return <Host showToast={showToast} />;
      case 'manage':
        return <Manage showToast={showToast} />;
      case 'clubs':
        return <Clubs showToast={showToast} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="App">
      <Header currentSection={currentSection} navigateTo={navigateTo} />
      
      <main>
        {renderSection()}
      </main>

      <Footer showFooter={currentSection === 'home'} />
      
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
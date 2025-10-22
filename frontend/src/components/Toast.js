// components/Toast.js
import { useEffect, useState } from 'react';

const Toast = ({ message, duration = 2000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '4px',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Toast;
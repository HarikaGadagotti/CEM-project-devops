// hooks/useToast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((message, duration = 2000) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), duration);
  }, []);

  return {
    toastMessage,
    showToast
  };
};
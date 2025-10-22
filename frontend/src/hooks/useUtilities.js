// hooks/useUtilities.js
import { useCallback } from 'react';

export const useUtilities = () => {
  const uid = useCallback(() => {
    return Math.random().toString(36).slice(2, 8);
  }, []);

  const fourDigitPin = useCallback(() => {
    return String(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const formatMoneyCents = useCallback((cents) => {
    const n = Number(cents || 0) / 100;
    return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }, []);

  return {
    uid,
    fourDigitPin,
    formatMoneyCents
  };
};
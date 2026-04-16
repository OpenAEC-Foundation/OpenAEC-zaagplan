import React, { useState, useEffect } from 'react';

// Simple toast store implementation for cutlist
// Mimics the warmteverlies pattern maar dan zonder external dependencies

let toasts = [];
let listeners = [];
let nextId = 0;

const addToast = (message, type = 'info', duration = 4000) => {
  const toast = {
    id: nextId++,
    message,
    type,
    timestamp: Date.now(),
  };

  toasts.push(toast);
  notifyListeners();

  // Auto-remove after duration
  if (duration > 0) {
    setTimeout(() => {
      removeToast(toast.id);
    }, duration);
  }

  return toast.id;
};

const removeToast = (id) => {
  const index = toasts.findIndex(t => t.id === id);
  if (index >= 0) {
    toasts.splice(index, 1);
    notifyListeners();
  }
};

const clearToasts = () => {
  toasts = [];
  notifyListeners();
};

const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

// React hook to use the toast store
export const useToastStore = () => {
  const [currentToasts, setCurrentToasts] = useState([...toasts]);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = () => {
      const index = listeners.indexOf(setCurrentToasts);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    };

    listeners.push(setCurrentToasts);

    return unsubscribe;
  }, []);

  return {
    toasts: currentToasts,
    addToast,
    removeToast,
    clearToasts,
  };
};

// Export standalone functions
export { addToast, removeToast, clearToasts };
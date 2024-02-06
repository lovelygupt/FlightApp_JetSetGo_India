// PreferencesContext.js

import { createContext, useContext, useReducer } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => {
  return useContext(PreferencesContext);
};

const initialState = {
  mealOption: 'Standard',
  seatPreference: 'Window',
  receiveNotifications: true,
};

const preferencesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEAL_OPTION':
      return { ...state, mealOption: action.payload };
    case 'SET_SEAT_PREFERENCE':
      return { ...state, seatPreference: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, receiveNotifications: !state.receiveNotifications };
    default:
      return state;
  }
};

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  const actions = {
    setMealOption: (mealOption) => dispatch({ type: 'SET_MEAL_OPTION', payload: mealOption }),
    setSeatPreference: (seatPreference) => dispatch({ type: 'SET_SEAT_PREFERENCE', payload: seatPreference }),
    toggleNotifications: () => dispatch({ type: 'TOGGLE_NOTIFICATIONS' }),
  };

  return (
    <PreferencesContext.Provider value={{ state, actions }}>
      {children}
    </PreferencesContext.Provider>
  );
};

import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import firebase from '../lib/firebase';
import type { User } from '../types/user';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async (user: any) => {
        if (user) {
          const { claims } = await user.getIdTokenResult();
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                userId: user.uid,
                photoUrl: user.photoURL,
                email: user.email,
                firstName: user.displayName,
                role: claims.role,
              },
            },
          });
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [dispatch],
  );

  const signInWithEmailAndPassword = (email: string, password: string): Promise<any> =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = async (email: string, password: string): Promise<any> =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const logout = async (): Promise<void> => {
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

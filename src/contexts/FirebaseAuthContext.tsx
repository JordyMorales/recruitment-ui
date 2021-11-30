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
  uploadPhotoUrl: (file: File) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  passwordRecovery: (email: string) => Promise<void>;
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
  uploadPhotoUrl: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(false),
  passwordRecovery: () => Promise.resolve(),
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

  const uploadPhotoUrl = async (file: File): Promise<void> => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef.child(`images/${file.name}`).put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('🚀 ~ file: FirebaseAuthContext.tsx ~ line 128 ~ uploadPhotoUrl ~ error', error);
        // Handle unsuccessful uploads
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const user = firebase.auth().currentUser;

          user
            .updateProfile({ photoURL: downloadURL })
            .then(async () => {
              const { claims } = await user.getIdTokenResult();
              dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: {
                  isAuthenticated: true,
                  user: {
                    userId: user.uid,
                    photoUrl: downloadURL,
                    email: user.email,
                    firstName: user.displayName,
                    role: claims.role,
                  },
                },
              });
            })
            .catch((error) => {
              console.log(
                '🚀 ~ file: FirebaseAuthContext.tsx ~ line 145 ~ uploadTask.snapshot.ref.getDownloadURL ~ error',
                error,
              );
              // An error occurred
              // ...
            });
        });
      },
    );
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const user = firebase.auth().currentUser;
      await user.updatePassword(newPassword);
      return true;
    } catch (error) {
      switch (error.code) {
        case 'auth/requires-recent-login':
          throw new Error(
            'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
          );

        default:
          throw new Error('Could not change password');
      }
    }
  };

  const passwordRecovery = async (email: string): Promise<void> => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        logout,
        uploadPhotoUrl,
        updatePassword,
        passwordRecovery,
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

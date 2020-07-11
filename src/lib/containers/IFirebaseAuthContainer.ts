import { AuthStatus } from '../common/AuthStatus';
import { Dispatch, SetStateAction } from 'react';
import firebase from 'firebase';

export interface IFirebaseAuthContainerRequiredInitialState {
    firebaseAuth: firebase.auth.Auth;
    appName: string;

    /** For provider token sensitive applications, this allows for saving in a DB */
    onReceiveToken?: (
        token: string,
        user: firebase.User
    ) => void | Promise<void>;
    /** Take us to a new page on login success */
    onNewLoginSuccess: (context: string) => void;
    onNewLoginError?: (error: Error) => void;
    /**
     * Use this to get token from DB and return it, or send us to the redirect to get a new one.
     * */
    onOldLoginRetrieval?: (user: firebase.User) => Promise<string>;
    onLogout: () => void | Promise<void>;
}

export interface IFirebaseAuthContainerOptionalInitialState {
    authStatus: AuthStatus;
    context: string;
    token: string;
    user: firebase.User;
    loginWithProvider: (
        provider: firebase.auth.AuthProvider,
        context?: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

export interface IFirebaseAuthContainerInitialState
    extends IFirebaseAuthContainerRequiredInitialState,
        Partial<IFirebaseAuthContainerOptionalInitialState> {}

export default interface IFirebaseAuthContainer
    extends IFirebaseAuthContainerOptionalInitialState {
    setAuthStatus: Dispatch<SetStateAction<AuthStatus>>;
    setContext: Dispatch<SetStateAction<string>>;
    setToken: Dispatch<SetStateAction<string>>;
    setUser: Dispatch<SetStateAction<firebase.User>>;
}

import { ReactElement, ReactChild } from 'react';
import firebase from 'firebase';
import { IFirebaseAuthContainerOptionalInitialState } from './containers/IFirebaseAuthContainer';

export default interface IFirebaseAuthProviderInputs {
    /** Unique string to identify app in local storage */
    appName: string;
    /** Firebase with at least firebase/auth imported */
    firebaseAuth: firebase.auth.Auth;
    /** Component with a sign in button */
    loginComponent: ReactElement;
    /** Loading component before the redirect */
    loadingComponent: ReactElement;
    /** Loading component while logging out. Defaults to loadingComponent. */
    loggingOutComponent?: ReactElement;
    /** Component to show if something goes wrong */
    errorComponent: ReactElement;

    /** For provider token sensitive applications, this allows for saving in a DB */
    onReceiveToken?: (
        token: string,
        user: firebase.User
    ) => void | Promise<void>;
    /** Take us to a new page on login success. Context is settable at any point, and provided. */
    onNewLoginSuccess: (context: string) => void;
    onNewLoginError?: (error: Error) => void;
    /**
     * Use this to get token from DB, and return it, or send us to the redirect to get a new one.
     * */
    onOldLoginRetrieval?: (user: firebase.User) => Promise<string>;
    onLogout: () => void | Promise<void>;

    /** For testing, mostly */
    initialState?: Partial<IFirebaseAuthContainerOptionalInitialState>;

    /** The App */
    children: ReactChild | ReactChild[];
}

import React from 'react';
import { createContainer } from 'unstated-next';
import { AuthStatus, AuthLoadingStatuses } from '../common/AuthStatus';
import { useState, useCallback, useEffect } from 'react';
import IFirebaseAuthContainer, {
    IFirebaseAuthContainerInitialState
} from './IFirebaseAuthContainer';
import useLocalStorage from '../hooks/useLocalStorage';

export const CONTEXT_KEY_SUFFIX = '-Firebase-Context';

const useFirebaseAuthContainer = (
    initialState: IFirebaseAuthContainerInitialState
): IFirebaseAuthContainer => {
    const {
        appName,
        firebase,
        onReceiveToken,
        onNewLoginSuccess,
        onNewLoginError,
        onOldLoginRetrieval,
        onLogout
    } = initialState;

    const [authStatus, setAuthStatus] = useState(
        initialState.authStatus ?? AuthStatus.INITIAL
    );

    const [token, setToken] = useState<string>(initialState?.token ?? null);
    const [user, setUser] = useState<firebase.User>(initialState?.user ?? null);
    const [context, setContext] = useLocalStorage(
        `${appName}${CONTEXT_KEY_SUFFIX}`,
        initialState.context ?? '/'
    );

    const handleRedirectResult = useCallback(
        async (redirectResult: firebase.auth.UserCredential): Promise<void> => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - Bad Type in firebase
                const token = redirectResult.credential?.accessToken;
                setToken(token);
                setUser(redirectResult.user);
                if (onReceiveToken)
                    await onReceiveToken(token, redirectResult.user);
                if (onNewLoginSuccess) await onNewLoginSuccess(context);
                setAuthStatus(AuthStatus.LOGGED_IN);
            } catch (error) {
                if (onNewLoginError) onNewLoginError(error);
                setAuthStatus(AuthStatus.ERROR);
            }
        },
        [onNewLoginSuccess, onReceiveToken, onNewLoginError, context]
    );

    const subscribeToAuthChange = useCallback((): firebase.Unsubscribe => {
        return firebase.auth().onAuthStateChanged(async (newUser) => {
            if (newUser) {
                setUser(newUser);

                if (onOldLoginRetrieval) {
                    const newToken = await onOldLoginRetrieval(newUser);
                    if (newToken) setToken(newToken);
                }
                setAuthStatus(AuthStatus.LOGGED_IN);
            } else {
                setAuthStatus(AuthStatus.LOGGED_OUT);
            }
        });
    }, [firebase, onOldLoginRetrieval]);

    const handleInitialPageLoad = useCallback(async (): Promise<
        firebase.Unsubscribe
    > => {
        const redirectResult = await firebase.auth().getRedirectResult();

        if (redirectResult.user) {
            await handleRedirectResult(redirectResult);
        } else {
            return await subscribeToAuthChange();
        }
    }, [firebase, handleRedirectResult, subscribeToAuthChange]);

    useEffect(() => {
        if (AuthLoadingStatuses.includes(authStatus)) {
            handleInitialPageLoad();
        }

        // return () => {
        //     if (unsubscribe) unsubscribe();
        // };
    }, [authStatus, handleInitialPageLoad]);

    const loginWithProvider = useCallback(
        async (provider: firebase.auth.AuthProvider, context?: string) => {
            try {
                setAuthStatus(AuthStatus.LOGGING_IN);
                if (context) setContext(context);

                await firebase.auth().signInWithRedirect(provider);
            } catch (error) {
                if (onNewLoginError) onNewLoginError(error);
            }
        },
        [firebase, onNewLoginError, setContext]
    );

    const logout = useCallback(async () => {
        try {
            setAuthStatus(AuthStatus.LOGGING_OUT);

            await firebase.auth().signOut();
            setToken(null);
            setUser(null);
            if (onLogout) await onLogout();
            setAuthStatus(AuthStatus.LOGGED_OUT);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }, [firebase, onLogout]);

    return {
        authStatus,
        setAuthStatus,
        token,
        setToken,
        user,
        setUser,
        context,
        setContext,
        loginWithProvider,
        logout
    };
};

const FirebaseAuthContainer = createContainer<
    IFirebaseAuthContainer,
    Partial<IFirebaseAuthContainerInitialState>
>(useFirebaseAuthContainer);

export default FirebaseAuthContainer;

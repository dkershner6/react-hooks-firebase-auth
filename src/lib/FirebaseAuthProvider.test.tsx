import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import firebase from 'firebase';
import FirebaseAuthProvider from './FirebaseAuthProvider';
import mockFirebaseAuth, {
    MOCK_REDIRECT_RESULT,
    MOCK_AUTH_STATE_CHANGE_USER
} from '../tests/mockFirebaseAuth';
import { AuthStatus } from './common/AuthStatus';
import { useContainer } from 'unstated-next';
import FirebaseAuthContainer from './containers/FirebaseAuthContainer';

describe('FirebaseAuthProvider', () => {
    const TestComponent = () => {
        const {
            authStatus,
            user,
            token,
            loginWithProvider,
            logout
        } = useContainer(FirebaseAuthContainer);

        return (
            <div>
                <p data-testid="authStatus">{authStatus}</p>
                <p data-testid="user">{JSON.stringify(user)}</p>
                <p data-testid="token">{token}</p>
                <button
                    onClick={() =>
                        loginWithProvider(
                            new firebase.auth.GithubAuthProvider()
                        )
                    }
                    data-testid="LoginWithProviderButton"
                >
                    Login With GitHub
                </button>
                <button onClick={() => logout()} data-testid="LogoutButton">
                    Logout
                </button>
            </div>
        );
    };
    it('Should be able to use a mock FirebaseAuth', () => {
        render(
            <FirebaseAuthProvider
                firebaseAuth={mockFirebaseAuth()}
                initialState={{
                    authStatus: AuthStatus.LOGGED_IN,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    user: {},
                    token: '1234'
                }}
            >
                <p />
            </FirebaseAuthProvider>
        );
    });

    it('Should handle redirect on initial load', async () => {
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            <FirebaseAuthProvider
                firebaseAuth={mockFirebaseAuth()}
                initialState={{
                    authStatus: AuthStatus.INITIAL
                }}
            >
                <TestComponent />
            </FirebaseAuthProvider>
        );

        await waitFor(() => {
            expect(getByTestId('token')).toContainHTML(
                MOCK_REDIRECT_RESULT.credential.accessToken
            );
            expect(getByTestId('user')).toContainHTML(
                JSON.stringify(MOCK_REDIRECT_RESULT.user)
            );
        });
    });

    it('Should subscribe to auth changes when there is no redirect to handle', async () => {
        const mockAuth = mockFirebaseAuth({
            getRedirectResult: jest.fn().mockReturnValue(Promise.resolve({}))
        });

        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            <FirebaseAuthProvider
                firebaseAuth={mockAuth}
                initialState={{
                    authStatus: AuthStatus.INITIAL
                }}
            >
                <TestComponent />
            </FirebaseAuthProvider>
        );

        await waitFor(() => {
            expect(mockAuth.onAuthStateChanged).toHaveBeenCalled();
            expect(getByTestId('user')).toContainHTML(
                JSON.stringify(MOCK_AUTH_STATE_CHANGE_USER)
            );
        });
    });

    it('Should login with provider when called', async () => {
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            <FirebaseAuthProvider
                firebaseAuth={mockFirebaseAuth()}
                initialState={{
                    authStatus: AuthStatus.LOGGED_OUT
                }}
            >
                <TestComponent />
            </FirebaseAuthProvider>
        );

        expect(getByTestId('authStatus')).toContainHTML(AuthStatus.LOGGED_OUT);

        fireEvent.click(getByTestId('LoginWithProviderButton'));

        await waitFor(() => {
            expect(getByTestId('authStatus')).toContainHTML(
                AuthStatus.LOGGING_IN
            );
        });

        await waitFor(() => {
            expect(getByTestId('authStatus')).toContainHTML(
                AuthStatus.LOGGED_IN
            );
        });
    });

    it('Should logout when called', async () => {
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            <FirebaseAuthProvider
                firebaseAuth={mockFirebaseAuth()}
                initialState={{
                    authStatus: AuthStatus.LOGGED_IN
                }}
            >
                <TestComponent />
            </FirebaseAuthProvider>
        );

        expect(getByTestId('authStatus')).toContainHTML(AuthStatus.LOGGED_IN);

        fireEvent.click(getByTestId('LogoutButton'));

        await waitFor(() => {
            expect(getByTestId('authStatus')).toContainHTML(
                AuthStatus.LOGGING_OUT
            );
        });

        await waitFor(() => {
            expect(getByTestId('authStatus')).toContainHTML(
                AuthStatus.LOGGED_OUT
            );
        });
    });
});

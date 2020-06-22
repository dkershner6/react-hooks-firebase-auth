import React, { ReactElement } from 'react';
import firebase from 'firebase';

import { render } from '@testing-library/react';

import withFirebaseAuth from './withFirebaseAuth';
import FirebaseAuthProvider from '../FirebaseAuthProvider';
import { AuthStatus } from '../common/AuthStatus';

describe('withFirebaseAuth', () => {
    const TestComponent = (): ReactElement => {
        return <p />;
    };

    const WithAuthTestComponent = withFirebaseAuth(TestComponent);

    it('Should allow a component to be wrapped properly', () => {
        const onNewLoginSuccess = jest.fn();
        const onLogout = jest.fn();
        firebase.initializeApp({});
        render(
            <FirebaseAuthProvider
                appName="test"
                firebase={firebase}
                loadingComponent={<p />}
                errorComponent={<p />}
                loginComponent={<p />}
                onNewLoginSuccess={onNewLoginSuccess}
                onLogout={onLogout}
                initialState={{ authStatus: AuthStatus.LOGGED_IN }}
            >
                <WithAuthTestComponent />
            </FirebaseAuthProvider>
        );
    });
});

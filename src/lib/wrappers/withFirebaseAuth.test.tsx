import React, { ReactElement } from 'react';

import { render } from '@testing-library/react';

import withFirebaseAuth from './withFirebaseAuth';
import FirebaseAuthProvider from '../FirebaseAuthProvider';
import { AuthStatus } from '../common/AuthStatus';
import mockFirebaseAuth from 'mock-react-hooks-firebase-auth';

describe('withFirebaseAuth', () => {
    const TestComponent = (): ReactElement => {
        return <p />;
    };

    const WithAuthTestComponent = withFirebaseAuth(TestComponent);

    it('Should allow a component to be wrapped properly', () => {
        const onNewLoginSuccess = jest.fn();
        const onLogout = jest.fn();
        render(
            <FirebaseAuthProvider
                appName="test"
                firebaseAuth={mockFirebaseAuth()}
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

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirebaseAuthProvider from './FirebaseAuthProvider';
import MockFirebaseAuth from '../tests/MockFirebaseAuth';
import { AuthStatus } from './common/AuthStatus';

describe('FirebaseAuthProvider', () => {
    it('Should be able to use a mock FirebaseAuth', () => {
        render(
            <FirebaseAuthProvider
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                firebaseAuth={MockFirebaseAuth}
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
});

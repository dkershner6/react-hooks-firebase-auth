import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnforceFirebaseAuth from './EnforceFirebaseAuth';
import InternalFirebaseAuthContainer from '../containers/InternalFirebaseAuthContainer';
import FirebaseAuthContainer from '../containers/FirebaseAuthContainer';
import { AuthStatus } from '../common/AuthStatus';
import mockFirebaseAuth from '../../tests/mockFirebaseAuth';

describe('EnforceFirebaseAuth', () => {
    const TestWrapper = ({ children, authStatus }: any) => (
        <FirebaseAuthContainer.Provider
            initialState={{ authStatus, firebaseAuth: mockFirebaseAuth() }}
        >
            <InternalFirebaseAuthContainer.Provider
                initialState={{
                    errorComponent: <p data-testid="errorComponent" />,
                    loadingComponent: <p data-testid="loadingComponent" />,
                    loginComponent: <p data-testid="loginComponent" />
                }}
            >
                {children}
            </InternalFirebaseAuthContainer.Provider>
        </FirebaseAuthContainer.Provider>
    );

    const testStatusForId = {
        [AuthStatus.INITIAL]: 'loadingComponent',
        [AuthStatus.LOGGING_IN]: 'loadingComponent',
        [AuthStatus.LOGGING_OUT]: 'loadingComponent',
        [AuthStatus.LOGGED_OUT]: 'loginComponent',
        [AuthStatus.LOGGED_IN]: 'childComponent',
        [AuthStatus.ERROR]: 'errorComponent'
    };

    Object.entries(testStatusForId).forEach(([testAuthStatus, testId]) => {
        it(`Should render correct component for status ${testAuthStatus}`, async () => {
            const { getByTestId } = render(
                <TestWrapper authStatus={testAuthStatus}>
                    <EnforceFirebaseAuth>
                        <p data-testid="childComponent" />
                    </EnforceFirebaseAuth>
                </TestWrapper>
            );

            expect(getByTestId(testId)).toBeInTheDocument();

            await waitFor(() => {
                expect(true).toBeTruthy(); // Allow for async calls to fire some of the time
            });
        });
    });
});

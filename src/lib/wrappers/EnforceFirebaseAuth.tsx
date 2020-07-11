import React, { ReactChild, ReactElement } from 'react';
import { useContainer } from 'unstated-next';
import InternalFirebaseAuthContainer from '../containers/InternalFirebaseAuthContainer';
import FirebaseAuthContainer from '../containers/FirebaseAuthContainer';
import { AuthStatus } from '../common/AuthStatus';

export interface IEnforceFirebaseAuth {
    children: ReactChild | ReactChild[];
}

const EnforceFirebaseAuth = ({
    children
}: IEnforceFirebaseAuth): ReactElement => {
    const { loginComponent, loadingComponent, errorComponent } = useContainer(
        InternalFirebaseAuthContainer
    );
    const { authStatus } = useContainer(FirebaseAuthContainer);

    switch (authStatus) {
        case AuthStatus.ERROR:
        default:
            return errorComponent;
        case AuthStatus.INITIAL:
        case AuthStatus.LOGGING_IN:
        case AuthStatus.LOGGING_OUT:
            return loadingComponent;
        case AuthStatus.LOGGED_OUT:
            return loginComponent;
        case AuthStatus.LOGGED_IN:
            return <>{children}</>;
    }
};

export default EnforceFirebaseAuth;

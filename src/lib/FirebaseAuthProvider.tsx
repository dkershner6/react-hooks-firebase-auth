import IFirebaseAuthProviderInputs from './IFirebaseAuthProvider';
import InternalFirebaseAuthContainer from './containers/InternalFirebaseAuthContainer';
import FirebaseAuthContainer from './containers/FirebaseAuthContainer';
import { ReactElement } from 'react';

const FirebaseAuthProvider = (
    props: IFirebaseAuthProviderInputs
): ReactElement => {
    const {
        appName,
        firebase,
        onLogout,
        onNewLoginSuccess,
        onNewLoginError,
        onOldLoginRetrieval,
        onReceiveToken,
        initialState
    } = props;
    const externalInitialState = {
        ...initialState,
        appName,
        firebase,
        onLogout,
        onNewLoginSuccess,
        onNewLoginError,
        onOldLoginRetrieval,
        onReceiveToken
    };

    const {
        loginComponent,
        loadingComponent,
        loggingOutComponent,
        errorComponent
    } = props;
    const internalInitialState = {
        loginComponent,
        loadingComponent,
        loggingOutComponent,
        errorComponent
    };

    return (
        <FirebaseAuthContainer.Provider initialState={externalInitialState}>
            <InternalFirebaseAuthContainer.Provider
                initialState={internalInitialState}
            >
                {props.children}
            </InternalFirebaseAuthContainer.Provider>
        </FirebaseAuthContainer.Provider>
    );
};

export default FirebaseAuthProvider;

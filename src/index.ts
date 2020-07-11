export { default as FirebaseAuthProvider } from './lib/FirebaseAuthProvider';
export type { default as IFirebaseAuthProvider } from './lib/IFirebaseAuthProvider';

export { default as FirebaseAuthContainer } from './lib/containers/FirebaseAuthContainer';
export type { default as IFirebaseAuthContainer } from './lib/containers/IFirebaseAuthContainer';

export { AuthStatus, AuthLoadingStatuses } from './lib/common/AuthStatus';

export { default as EnforceFirebaseAuth } from './lib/wrappers/EnforceFirebaseAuth';
export type { IEnforceFirebaseAuth } from './lib/wrappers/EnforceFirebaseAuth';

export { default as withFirebaseAuth } from './lib/wrappers/withFirebaseAuth';

export {
    default as mockFirebaseAuth,
    MOCK_AUTH_STATE_CHANGE_USER,
    MOCK_REDIRECT_RESULT
} from './tests/mockFirebaseAuth';

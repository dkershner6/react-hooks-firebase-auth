import { ReactElement } from 'react';

export default interface IInternalFirebaseAuthContainer {
    /** Component with a sign in button */
    loginComponent: ReactElement;
    /** Loading component before the redirect */
    loadingComponent: ReactElement;
    /** Component to show if something goes wrong */
    errorComponent: ReactElement;
}

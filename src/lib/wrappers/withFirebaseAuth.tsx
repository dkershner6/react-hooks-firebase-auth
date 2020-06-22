import { ReactElement } from 'react';
import EnforceFirebaseAuth from './EnforceFirebaseAuth';

const withFirebaseAuth = (props: unknown) => (
    WrappedComponent: (props: unknown) => ReactElement
): ReactElement => {
    return (
        <EnforceFirebaseAuth>
            <WrappedComponent {...props} />
        </EnforceFirebaseAuth>
    );
};

export default withFirebaseAuth;

import React from 'react';
import EnforceFirebaseAuth from './EnforceFirebaseAuth';

// eslint-disable-next-line @typescript-eslint/ban-types
const withFirebaseAuth = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }: P) => (
    <EnforceFirebaseAuth>
        <Component {...(props as P)} />
    </EnforceFirebaseAuth>
);

export default withFirebaseAuth;

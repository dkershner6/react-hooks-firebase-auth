import { render } from '@testing-library/react';
import withFirebaseAuth from './withFirebaseAuth';
import { ReactElement } from 'react';

describe('withFirebaseAuth', () => {
    const TestComponent = (): ReactElement => {
        return <p />;
    };

    const WithAuthTestComponent = withFirebaseAuth(TestComponent);

    it('Should allow a component to be wrapped properly', () => {
        render(<WithAuthTestComponent />);
    });
});

import IInternalFirebaseAuthContainer from './IInternalFirebaseAuthContainer';
import { createContainer } from 'unstated-next';

const useInternalFirebaseAuthContainer = (
    initialState: IInternalFirebaseAuthContainer
): IInternalFirebaseAuthContainer => {
    return initialState;
};

const InternalFirebaseAuthContainer = createContainer(
    useInternalFirebaseAuthContainer
);

export default InternalFirebaseAuthContainer;

export const MOCK_AUTH_STATE_CHANGE_USER = {
    displayName: 'authStateChangeResultTestDisplayName',
    email: 'authStateChangeTest@test.com',
    emailVerified: true
};

const onAuthStateChanged = jest.fn().mockImplementation((cb) => {
    cb(MOCK_AUTH_STATE_CHANGE_USER);
});

export const MOCK_REDIRECT_RESULT = {
    user: {
        displayName: 'redirectResultTestDisplayName',
        email: 'redirectTest@test.com',
        emailVerified: true
    },
    credential: {
        accessToken: '1234'
    }
};

const getRedirectResult = jest.fn(() => {
    return Promise.resolve(MOCK_REDIRECT_RESULT);
});

const sendEmailVerification = jest.fn(() => {
    return Promise.resolve('result of sendEmailVerification');
});

const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of createUserWithEmailAndPassword');
});

const signInWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of signInWithEmailAndPassword');
});

const signInWithRedirect = jest.fn(() => {
    return Promise.resolve('result of signInWithRedirect');
});

const signOut = jest.fn(() => {
    return Promise.resolve();
});

export const initializeApp = jest.fn().mockImplementation(() => {
    return {
        auth: () => {
            return {
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                currentUser: {
                    sendEmailVerification
                },
                signInWithRedirect
            };
        }
    };
});

const mockFirebaseAuth = (
    options?: Partial<firebase.auth.Auth>
): firebase.auth.Auth => ({
    onAuthStateChanged,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    currentUser: {
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getRedirectResult: options?.getRedirectResult ?? getRedirectResult,
    sendPasswordResetEmail,
    signOut
});

export default mockFirebaseAuth;

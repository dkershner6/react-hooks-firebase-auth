export enum AuthStatus {
    INITIAL = 'INITIAL',
    LOGGING_IN = 'LOGGING_IN',
    LOGGING_OUT = 'LOGGING_OUT',
    LOGGED_IN = 'LOGGED_IN',
    LOGGED_OUT = 'LOGGED_OUT',
    ERROR = 'ERROR'
}

export const AuthLoadingStatuses = [AuthStatus.INITIAL, AuthStatus.LOGGING_IN];

export const getFirebaseAuthErrorMessage = (error) => {
    let errorMessage = 'An unknown error occurred. Please try again.';

    if (error.message.startsWith('Firebase: Error (')) {
        const errorCode = error.message.match(/\((.*?)\)/)[1];

        switch (errorCode) {
            case 'auth/invalid-email':
                errorMessage = 'The email address is not valid.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'There is no user corresponding to this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'The password is incorrect.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is too weak.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'The credential is invalid or expired.';
                break;
            default:
                errorMessage = 'An unknown error occurred. Please try again.';
                break;
        }
    } else {
        errorMessage = error.message || errorMessage;
    }

    return errorMessage;
};

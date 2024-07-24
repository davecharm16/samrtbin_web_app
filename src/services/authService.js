import {
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const login = async (userData) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            await sendEmailVerification(user);
            await signOut(auth);
            throw new Error('Please verify your email to login. A verification email has been sent.');
        }

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            await signOut(auth);
            throw new Error('User not found in Firestore');
        }

        const userExist = userDocSnap.data();
        if (userExist.role !== 'admin') {
            await signOut(auth);
            throw new Error('No admin privileges');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = () => {
    signOut(auth);
};

export const getUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    resolve(auth.currentUser);
                } else {
                    reject('No user data found in Firestore.');
                }
            } else {
                reject('No user is currently logged in.');
            }
        });
    });
};

export const changeEmail = async (userData) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, userData.password);

    await reauthenticateWithCredential(auth.currentUser, credential);

    await verifyBeforeUpdateEmail(auth.currentUser, userData.email);

    signOut(auth);
};

export const changePassword = async (userData) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, userData.currentPassword);

    await reauthenticateWithCredential(auth.currentUser, credential);

    await updatePassword(auth.currentUser, userData.newPassword);
};

export const forgotPassword = async (userData) => {
    await sendPasswordResetEmail(auth, userData.email);
};

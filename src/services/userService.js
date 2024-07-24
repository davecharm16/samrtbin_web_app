import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';
import { decrypt, encrypt } from '../utils/encryption';
import { sendEmail } from '../utils/sendEmail';

export const createUser = async (userData) => {
    const { firstName, middleName, lastName, email } = userData;
    const encryptedPassword = sessionStorage.getItem('password');

    let password;
    const originalUser = auth.currentUser;
    const originalUserEmail = originalUser?.email;

    if (encryptedPassword) {
        password = decrypt(encryptedPassword);
    } else {
        password = prompt('Please re-enter your password for security purposes');
        if (!password) return;

        try {
            const credential = EmailAuthProvider.credential(originalUserEmail, password);
            await reauthenticateWithCredential(originalUser, credential);
            sessionStorage.setItem('password', encrypt(password));
        } catch (error) {
            console.error('Reauthentication failed:', error);
            throw new Error('The password you entered is incorrect. Please try again.');
        }
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), `${lastName.toLowerCase()}-${firstName.toLowerCase()}`);

        await sendEmail({
            to_email: email,
            subject: 'Smart Bin Account Creation',
            message: `Hi ${firstName.trim()}, please verify your email first before you open your account! Your account password is: ${lastName.toLowerCase()}-${firstName.toLowerCase()}`,
        });

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            firstName: firstName.trim(),
            middleName: middleName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            role: 'user',
        });

        await sendEmailVerification(userCredential.user);
        await signInWithEmailAndPassword(auth, originalUserEmail, password);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('An error occurred while creating the user. Please try again later.');
    }
};

export const handleUserStatusToggle = async (userId, newStatus) => {
    try {
        if (!window.confirm('Are you sure you want to perform this action?')) return;
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            isDisabled: newStatus,
        });
        toast.success('User status updated successfully.');
    } catch (error) {
        console.error('Error updating user status: ', error);
    }
};

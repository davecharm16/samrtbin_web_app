import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import Loader from './ui/Loader';

export default function ProtectedRoutes({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async (user) => {
            if (user) {
                if (location.pathname === '/') {
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
                    navigate('/home/dashboard');
                }
            } else {
                if (location.pathname !== '/') {
                    navigate('/');
                }
            }
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            checkUser(user).catch((error) => {
                console.error(error);
                setLoading(false);
                navigate('/');
            });
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <Loader />;

    return children;
}

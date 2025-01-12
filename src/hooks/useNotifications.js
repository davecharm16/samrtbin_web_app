import { addDoc, collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

export default function useNotifications() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let unsubscribeFillLevel;
        let unsubscribeNotifications;

        const fetchData = async () => {
            try {
                unsubscribeFillLevel = onSnapshot(collection(db, 'fill_level_data'), async (querySnapshot) => {
                    for (const doc of querySnapshot.docs) {
                        const { bin, bin_type, timestamp, percentage } = doc.data();
                        const fillLevelDataId = doc.id;

                        if (percentage === 100 && isToday(new Date(timestamp.seconds * 1000))) {
                            const title = `${bin}(${bin_type}) is already full`;

                            const notificationQuery = query(collection(db, 'notifications'), where('fill_id', '==', fillLevelDataId));
                            const notificationSnapshot = await getDocs(notificationQuery);

                            if (notificationSnapshot.empty) {
                                await addDoc(collection(db, 'notifications'), {
                                    title,
                                    timestamp: new Date(),
                                    isRead: false,
                                    bin_id: bin,
                                    fill_id: fillLevelDataId,
                                });
                            }
                        }
                    }

                    setLoading(false);
                });
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const fetchNotifications = async () => {
            try {
                unsubscribeNotifications = onSnapshot(collection(db, 'notifications'), async (querySnapshot) => {
                    for (const doc of querySnapshot.docs) {
                        const { title, timestamp, isRead } = doc.data();

                        if (!isRead && isToday(new Date(timestamp.seconds * 1000))) {
                            await updateDoc(doc.ref, { isRead: true });
                            toast.error(title);
                            await new Promise((resolve) => setTimeout(resolve, 30000));
                        }
                    }
                });
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
        fetchNotifications();

        return () => {
            if (unsubscribeFillLevel) unsubscribeFillLevel();
            if (unsubscribeNotifications) unsubscribeNotifications();
        };
    }, []);

    return { loading, error };
}

const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

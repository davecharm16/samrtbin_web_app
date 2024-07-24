import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const addBin = async (binName) => {
    const binDocRef = doc(db, 'bins', binName);
    const binDocSnap = await getDoc(binDocRef);

    if (binDocSnap.exists()) {
        throw new Error('Bin name already exists. Please choose a different name.');
    }

    await setDoc(binDocRef, { userIds: [] });
};

export const deleteBin = async (id) => {
    await deleteDoc(doc(db, 'bins', id));

    const fillLevelsQuery = query(collection(db, 'fill_level_data'), where('bin', '==', id));
    const wasteDataQuery = query(collection(db, 'waste_data'), where('bin_id', '==', id));
    const reportsQuery = query(collection(db, 'reports'), where('bin_id', '==', id));
    const notificationsQuery = query(collection(db, 'notifications'), where('bin_id', '==', id));

    const deleteDocuments = async (querySnapshot, collectionName) => {
        querySnapshot.forEach(async (documentSnapshot) => {
            await deleteDoc(doc(db, collectionName, documentSnapshot.id));
        });
    };

    const fillLevelsSnapshot = await getDocs(fillLevelsQuery);
    const wasteDataSnapshot = await getDocs(wasteDataQuery);
    const reportsSnapshot = await getDocs(reportsQuery);
    const notificationsSnapshot = await getDocs(notificationsQuery);

    await Promise.all([
        deleteDocuments(fillLevelsSnapshot, 'fill_level_data'),
        deleteDocuments(wasteDataSnapshot, 'waste_data'),
        deleteDocuments(reportsSnapshot, 'reports'),
        deleteDocuments(notificationsSnapshot, 'notifications'),
    ]);
};

import axios from 'axios';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';
import filteredAnalyzeFillData from '../utils/filter/filteredAnalyzeFillData';
import filteredAnalyzeWasteData from '../utils/filter/filteredAnalyzeWasteData';

export const analyzeReport = async (binId, fillData, wasteData) => {
    const fillFilterData = filteredAnalyzeFillData(fillData);
    const wasteFilterData = filteredAnalyzeWasteData(wasteData);

    console.log(
        JSON.stringify({
            waste_data: JSON.stringify(wasteFilterData),
            fill_level_data: JSON.stringify(fillFilterData),
            api_key: import.meta.env.VITE_ANALYZE_API_KEY,
            open_ai_api_key: import.meta.env.VITE_OPEN_AI_API_KEY,
        })
    );
    const response = await axios.post(import.meta.env.VITE_ANALYZE_DATA_API_URL, {
        waste_data: JSON.stringify(wasteFilterData),
        fill_level_data: JSON.stringify(fillFilterData),
        api_key: import.meta.env.VITE_ANALYZE_API_KEY,
        open_ai_api_key: import.meta.env.VITE_OPEN_AI_API_KEY,
    });

    await addDoc(collection(db, 'reports'), {
        bin_id: binId,
        report_text: response.data.message,
        timestamp: serverTimestamp(),
    });

    await setDoc(doc(db, 'users', auth.currentUser.uid), { lastRequestTime: new Date() }, { merge: true });
};

export const deleteReport = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        const reportDoc = doc(db, 'reports', id);
        await deleteDoc(reportDoc);
        toast.success(`Report deleted successfully.`);
    } catch (error) {
        toast.error(error.message);
    }
};

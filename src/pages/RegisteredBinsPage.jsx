import { useState } from 'react';
import AlertError from '../components/ui/AlertError';
import Loader from '../components/ui/Loader';
import useFetchData from '../hooks/useFetchData';
import { filterDataBySearchQuery } from '../utils/filter/filterDataBySearchQuery';
import Input from '../components/ui/Input';
import RegisteredBinCard from '../components/cards/RegisteredBinCard';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

export default function RegisteredBinsPage() {
    const { data, loading, error } = useFetchData('bins');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    const handleResetNotifications = async () => {
        if (!window.confirm('Are you sure you want to reset the notifications?')) return;

        try {
            const collectionRef = collection(db, 'notifications');
            const snapshot = await getDocs(collectionRef);

            if (snapshot.empty) {
                console.log('No matching documents.');
                toast.warn('No data found to reset.');
                return;
            }

            const batch = writeBatch(db);
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            toast.success('Succesfully reset the notifications');
        } catch (err) {
            console.error(error);
            toast.error('Error: Failed to reset the notifications');
        }
    };

    if (loading) return <Loader />;
    if (error) return <AlertError error={error} />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">Registered Bins</h1>

            <div className="flex flex-wrap justify-between gap-3 mb-3">
                <Input placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                <div className="flex gap-2">
                    <Button onClick={handleResetNotifications} text="Reset Notifications" disabled={true} />
                    <Link to="/home/registered-bins/add-bin" className="btn btn-primary">
                        Add Bin
                    </Link>
                </div>
            </div>

            {data && data.length === 0 ? (
                <AlertError error="No bins registered." />
            ) : (
                <div className="flex flex-wrap gap-3">
                    {filteredData.length === 0 ? (
                        <p>No bins match your search.</p>
                    ) : (
                        filteredData.map((bin) => <RegisteredBinCard key={bin.id} bin={bin} />)
                    )}
                </div>
            )}
        </div>
    );
}

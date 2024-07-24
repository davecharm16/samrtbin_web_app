import { useState } from 'react';
import AlertError from '../components/ui/AlertError';
import Loader from '../components/ui/Loader';
import useFetchData from '../hooks/useFetchData';
import { filterDataBySearchQuery } from '../utils/filter/filterDataBySearchQuery';
import Input from '../components/ui/Input';
import RegisteredBinCard from '../components/cards/RegisteredBinCard';
import { Link } from 'react-router-dom';

export default function RegisteredBinsPage() {
    const { data, loading, error } = useFetchData('bins');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    if (loading) return <Loader />;
    if (error) return <AlertError error={error} />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">Registered Bins</h1>

            <div className="flex flex-wrap justify-between gap-3 mb-3">
                <Input placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                <Link to="/home/registered-bins/add-bin" className="btn btn-primary">
                    Add Bin
                </Link>
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

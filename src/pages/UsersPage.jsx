import { DataGrid } from '@mui/x-data-grid';
import AlertError from '../components/ui/AlertError';
import Input from '../components/ui/Input';
import useFetchData from '../hooks/useFetchData';
import { filterDataBySearchQuery } from '../utils/filter/filterDataBySearchQuery';
import { userColumnsData } from '../utils/columns/userColumnData';
import Loader from '../components/ui/Loader';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, loading, error } = useFetchData('users');

    if (loading) return <Loader />;
    if (error) return <AlertError error={error} />;

    const userData = data.filter((user) => user.role === 'user');
    const filteredData = filterDataBySearchQuery(userData, searchQuery);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">User Management</h1>
            {userData.length === 0 ? (
                <AlertError error="No waste personnel available" />
            ) : (
                <>
                    <div className="flex flex-wrap justify-between gap-3 mb-3">
                        <Input type="text" placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <Link to="/home/users/add-user" className="btn btn-primary">
                            Add user
                        </Link>
                    </div>

                    <DataGrid
                        rows={filteredData}
                        columns={userColumnsData}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 30, 40, 50]}
                        autoHeight
                    />
                </>
            )}
        </div>
    );
}

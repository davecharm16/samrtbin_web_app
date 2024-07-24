import { useParams } from 'react-router-dom';
import AlertError from '../components/ui/AlertError';
import Loader from '../components/ui/Loader';
import useFetchData from '../hooks/useFetchData';
import UserProfileCard from '../components/cards/UserProfileCard';

export default function ViewUserPage() {
    const { id } = useParams();
    const { data: userData, loading: userLoading, error: userError } = useFetchData('users');
    const { data: binData, loading: binLoading, error: binError } = useFetchData('bins');

    if (userLoading || binLoading) return <Loader />;
    if (!id || userError || binError) return <AlertError error="Error" />;

    const filteredUserData = userData.find((user) => user.id === id);
    const filteredBinData = binData.filter((report) => report.userIds.includes(id));

    if (!filteredUserData) return <AlertError error="User not found" />;

    return (
        <div>
            <UserProfileCard user={filteredUserData} />
            <h1 className="w-full text-3xl font-bold mb-3">Monitored bins</h1>
            {filteredBinData.length === 0 ? (
                <div>No monitored bins for this user.</div>
            ) : (
                <ul className="list-disc pl-5">
                    {filteredBinData.map((report) => (
                        <li key={report.id} className="text-gray-500 mb-2">
                            {report.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

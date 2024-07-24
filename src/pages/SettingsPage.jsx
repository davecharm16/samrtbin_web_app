import { useEffect, useState } from 'react';
import SettingsTabs from '../components/ui/SettingsTabs';
import { getUser } from '../services/authService';
import Loader from '../components/ui/Loader';
import AlertError from '../components/ui/AlertError';

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <Loader />;
    if (error) return <AlertError error={error} />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Account Settings</h1>
            <div className="flex items-center gap-3 mb-5">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 sm:w-16 rounded-full ring ring-offset-2">
                        <div className="bg-primary text-neutral-content text-center w-10 sm:w-16 rounded-full">
                            <span className="text-4xl sm:text-7xl">{user ? user.email.charAt(0).toUpperCase() : 'AD'}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {user && (
                        <div>
                            <p className="text-xl sm:text-2xl">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
            <SettingsTabs />
        </div>
    );
}

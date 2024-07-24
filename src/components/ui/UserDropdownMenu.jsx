import { Link, useNavigate } from 'react-router-dom';
import { dropdownRoutes } from '../../routes/dropdownRoutes';
import { IoIosLogOut } from 'react-icons/io';
import { toast } from 'react-toastify';
import Button from './Button';
import { getUser, logout } from '../../services/authService';
import { useEffect, useState } from 'react';

export default function UserDropdownMenu() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        if (!window.confirm('Are you sure you want to logout?')) return;

        try {
            await logout();
            toast.success('Successfully logged out');
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <details className="dropdown dropdown-bottom dropdown-end">
            <summary tabIndex={0} role="button" className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                    <div className="bg-primary text-neutral-content text-center w-10 rounded-full">
                        <span className="text-4xl">{user ? user.email.charAt(0).toUpperCase() : 'AD'}</span>
                    </div>
                </div>
            </summary>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {dropdownRoutes.map((route, index) => (
                    <li key={index}>
                        <Link to={route.path} role="menuitem">
                            {route.label}
                        </Link>
                    </li>
                ))}
                <li className="m-1">
                    <Button text="Logout" icon={<IoIosLogOut />} variant="danger" onClick={handleLogout} />
                </li>
            </ul>
        </details>
    );
}

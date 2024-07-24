import { FaChartBar, FaCog, FaHome, FaRegTrashAlt, FaUser } from 'react-icons/fa';

export const sidebarRoutes = [
    {
        path: '/home/dashboard',
        icon: <FaHome size={25} />,
        label: 'Dashboard',
    },
    {
        path: '/home/registered-bins',
        icon: <FaRegTrashAlt size={25} />,
        label: 'Bins',
    },
    {
        path: '/home/reports',
        icon: <FaChartBar size={25} />,
        label: 'Reports',
    },
    {
        path: '/home/users',
        icon: <FaUser size={25} />,
        label: 'Users',
    },
    {
        path: '/home/settings',
        icon: <FaCog size={25} />,
        label: 'Settings',
    },
];

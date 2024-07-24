import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import UserDropdownMenu from '../ui/UserDropdownMenu';
import Logo from '../../assets/logo.png';
import useNotifications from '../../hooks/useNotifications';
import Loader from '../ui/Loader';
import NotificationsDropdown from '../ui/NotificationsDropdown';

export default function HomeLayout() {
    const [navOpen, setNavOpen] = useState(false);
    const { loading } = useNotifications();

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-base-100 border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                type="button"
                                onClick={() => setNavOpen(!navOpen)}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                {navOpen ? <IoMdClose size={20} /> : <FaBars size={20} />}
                            </button>
                            <Link to="/home/dashboard" className="flex ms-2 md:me-24">
                                <img src={Logo} className="h-8" alt="logo" />
                                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-dark">Smart Bin</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <NotificationsDropdown />
                            <UserDropdownMenu />
                        </div>
                    </div>
                </div>
            </nav>
            <Sidebar navOpen={navOpen} />

            <div className="px-4 py-[20px] mt-14 sm:ml-64">{loading ? <Loader /> : <Outlet />}</div>
        </div>
    );
}

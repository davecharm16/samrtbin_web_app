import { IoNotificationsOutline } from 'react-icons/io5';
import useFetchData from '../../hooks/useFetchData';
import formatDate from '../../utils/format/formatDate';
import { sortDate } from '../../utils/sortDate';

export default function NotificationsDropdown() {
    const { data } = useFetchData('notifications');

    const filteredData = sortDate(data).reverse().slice(0, 5);

    return (
        <details className="dropdown dropdown-bottom dropdown-end">
            <summary tabIndex={0} role="button" className="avatar cursor-pointer">
                <IoNotificationsOutline size={40} />
            </summary>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                {filteredData.length ? (
                    filteredData.map((notif) => (
                        <li key={notif.id}>
                            <div className="menu-item flex flex-col text-left border">
                                <h1 className="font-semibold">{notif.title}</h1>
                                <p className="text-xs">{formatDate(notif.timestamp)}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="menu-item">
                        <p className="text-center">No notifications</p>
                    </li>
                )}
            </ul>
        </details>
    );
}

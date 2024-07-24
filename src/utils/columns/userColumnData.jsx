import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { handleUserStatusToggle } from '../../services/userService';
import DefaultProfilePic from '../../assets/default-profilepic.jpg';

export const userColumnsData = [
    { field: 'id', headerName: 'ID', minWidth: 200, flex: 1 },
    {
        field: 'profilePicture',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => (
            <img
                src={params.row.profilePicture ? params.row.profilePicture : DefaultProfilePic}
                alt={`${params.row.firstName} ${params.row.lastName}`}
                className="w-10 h-10 rounded-full object-cover m-1"
            />
        ),
    },
    { field: 'firstName', headerName: 'First Name', minWidth: 200, flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', minWidth: 200, flex: 1 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 200, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    {
        field: 'isDisabled',
        type: 'boolean',
        headerName: 'Disabled',
        width: 100,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
            <div className="flex gap-2">
                <Link to={`/home/users/${params.row.id}`} className="btn btn-default">
                    View
                </Link>
                <Button
                    text={params.row.isDisabled ? 'Enable' : 'Disable'}
                    variant={params.row.isDisabled ? 'success' : 'danger'}
                    onClick={() => handleUserStatusToggle(params.row.id, !params.row.isDisabled)}
                />
            </div>
        ),
    },
];

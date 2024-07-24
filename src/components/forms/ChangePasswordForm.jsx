import { useState } from 'react';
import Button from '../ui/Button';
import PasswordInput from '../ui/PasswordInput';
import { toast } from 'react-toastify';
import AlertError from '../ui/AlertError';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/authService';
import { isStrongPassword } from '../../utils/validation';
import { getFirebaseAuthErrorMessage } from '../../utils/getFirebaseAuthErrorMessage';

export default function ChangePasswordForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { currentPassword, newPassword, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!currentPassword || !newPassword || !confirmPassword) return setError('All fields are required!');
        if (!isStrongPassword(newPassword)) return setError('Enter a strong password!');
        if (newPassword !== confirmPassword) return setError('New password and confirmation password do not match!');

        setLoading(true);

        try {
            await changePassword(formData);
            toast.success('You have successfully changed your password!');
            navigate('/');
        } catch (error) {
            const errorMessage = getFirebaseAuthErrorMessage(error);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card w-full bg-base-200 shadow-md flex flex-col gap-2 max-w-md">
            <div className="card-body">
                <div className="form-control mb-3">
                    <label>Current Password:</label>
                    <PasswordInput
                        name="currentPassword"
                        placeholder="Enter your current password."
                        password={currentPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control mb-3">
                    <label>New Password:</label>
                    <PasswordInput name="newPassword" placeholder="Enter a new password." password={newPassword} onChange={handleChange} />
                </div>
                <div className="form-control mb-3">
                    <label>Confirm Password:</label>
                    <PasswordInput
                        name="confirmPassword"
                        placeholder="Confirm your new password."
                        password={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <Button text="Change Email" type="submit" variant="primary" loading={loading} />
                {error && <AlertError error={error} />}
            </div>
        </form>
    );
}

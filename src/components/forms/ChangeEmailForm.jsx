import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changeEmail } from '../../services/authService';
import { getFirebaseAuthErrorMessage } from '../../utils/getFirebaseAuthErrorMessage';
import { isEmail, isGmail } from '../../utils/validation';
import AlertError from '../ui/AlertError';
import Button from '../ui/Button';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';

export default function ChangeEmailForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) return setError('All fields are required!');
        if (!isEmail(email)) return setError('Please enter a valid email!');
        if (!isGmail(email)) return setError('Please enter a gmail account');

        setLoading(true);

        try {
            await changeEmail(formData);
            toast.success('Email change request sent. Please verify your new email.');
            navigate('/');
        } catch (error) {
            const errorMessage = getFirebaseAuthErrorMessage(error);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setFormData({
                email: '',
                password: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card w-full bg-base-200 shadow-md flex flex-col gap-2 max-w-md">
            <div className="card-body">
                <div className="flex flex-col gap-1 mb-2">
                    <label>New Email:</label>
                    <Input type="email" name="email" value={email} onChange={handleChange} maxLength={50} placeholder="johndoe@example.com" />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Password:</label>
                    <PasswordInput name="password" placeholder="Enter your current password." password={password} onChange={handleChange} />
                </div>
                <Button text="Change Email" type="submit" variant="primary" loading={loading} />
                {error && <AlertError error={error} />}
            </div>
        </form>
    );
}

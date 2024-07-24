import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import { toast } from 'react-toastify';
import AlertError from '../ui/AlertError';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, login } from '../../services/authService';
import { getFirebaseAuthErrorMessage } from '../../utils/getFirebaseAuthErrorMessage';

export default function LoginForm() {
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
        setLoading(true);
        setError(null);

        try {
            await login(formData);
            toast.success('Login successful!');
            navigate('/home/dashboard');
        } catch (error) {
            const errorMessage = getFirebaseAuthErrorMessage(error);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (loading) return;

        setLoading(true);

        if (!email) return toast.error('Please enter your email first!');

        try {
            await forgotPassword(formData);

            toast.success('Password reset email sent');
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
                <h2 className="card-title text-3xl">Smart Bin Management</h2>
                <p>Login to continue</p>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <Input type="email" name="email" value={email} onChange={handleChange} placeholder="johndoe@example.com" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <PasswordInput name="password" password={password} onChange={handleChange} />
                </div>
                <div className="self-end text-blue-600" onClick={handleForgotPassword}>
                    Forgot Password?
                </div>
                <Button text="Login" type="submit" variant="primary" loading={loading} />
                {error && <AlertError error={error} />}
            </div>
        </form>
    );
}

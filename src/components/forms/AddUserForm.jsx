import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../../services/userService';
import AlertError from '../ui/AlertError';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function AddUserForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
    });

    const { firstName, middleName, lastName, email } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setError(null);

        if (!firstName || !lastName || !email) {
            setLoading(false);
            return toast.error('Please fill out all fields.');
        }

        setLoading(true);

        try {
            await createUser(formData);
            toast.success('You have successfully added a user');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card w-full bg-base-200 shadow-md flex flex-col gap-2 max-w-md">
            <div className="card-body">
                <div className="form-control mb-2">
                    <label>First Name:</label>
                    <Input type="text" placeholder="Enter first name" value={firstName} name="firstName" maxLength={20} onChange={handleChange} />
                </div>
                <div className="form-control mb-2">
                    <label>Middle Name:</label>
                    <Input type="text" placeholder="Enter middle name" value={middleName} name="middleName" maxLength={20} onChange={handleChange} />
                </div>
                <div className="form-control mb-2">
                    <label>Last Name:</label>
                    <Input type="text" placeholder="Enter last name" value={lastName} name="lastName" maxLength={20} onChange={handleChange} />
                </div>
                <div className="form-control mb-2">
                    <label>Email:</label>
                    <Input type="email" placeholder="Enter email" value={email} name="email" maxLength={50} onChange={handleChange} />
                </div>
                <Button text="Add User" type="submit" variant="primary" loading={loading} />
                {error && <AlertError error={error} />}
            </div>
        </form>
    );
}

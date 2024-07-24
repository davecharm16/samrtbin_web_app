import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import AlertError from '../ui/AlertError';
import { addBin } from '../../services/binService';

export default function AddBinForm() {
    const [loading, setLoading] = useState(false);
    const [binName, setBinName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!binName) return setError('You have to enter a bin name');

        setLoading(true);

        try {
            await addBin(binName);
            toast.success('You have successfully added a bin');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            console.error('Error changing email:', error);
        } finally {
            setLoading(false);
            setBinName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card w-full bg-base-200 shadow-md flex flex-col gap-2 max-w-md">
            <div className="card-body">
                <div className="form-control mb-2">
                    <label>Bin Name:</label>
                    <Input
                        type="text"
                        name="binName"
                        value={binName}
                        maxLength={30}
                        onChange={(e) => setBinName(e.target.value)}
                        placeholder="Enter bin name"
                    />
                </div>
                <Button text="Add Bin" type="submit" variant="primary" loading={loading} />
                {error && <AlertError error={error} />}
            </div>
        </form>
    );
}

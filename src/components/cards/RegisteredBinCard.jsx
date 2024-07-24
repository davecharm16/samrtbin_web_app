import { useRef, useState } from 'react';
import Button from '../ui/Button';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { deleteBin } from '../../services/binService';
import { toast } from 'react-toastify';

export default function RegisteredBinCard({ bin }) {
    const componentRef = useRef();
    const [loading, setLoading] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleDelete = async (id) => {
        if (!window.confirm('Are you want to delete this bin?')) return;
        setLoading(true);
        try {
            await deleteBin(id);
            toast.success('You have successfully deleted this bin');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="card bg-base-100 shadow-lg" style={{ minWidth: 300 }}>
            <div className="card-body">
                <div className="flex flex-col justify-center items-center" ref={componentRef}>
                    <QRCode value={bin.id} />
                    <h1 className="mt-2 text-2xl font-semibold">{bin.id}</h1>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 justify-center items-center">
                    <Button onClick={handlePrint} text="Print" />
                    <Link to={`/home/reports/${bin.id}`} className="btn btn-default">
                        Reports
                    </Link>
                    <Button variant="danger" text="Delete" loading={loading} onClick={() => handleDelete(bin.id)} />
                </div>
            </div>
        </div>
    );
}

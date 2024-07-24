import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { formatReportText } from '../../utils/format/formatReportText';
import Button from '../ui/Button';
import { deleteReport } from '../../services/reportService';

export default function AnalyzedReportCard({ report }) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="card shadow-md">
            <div className="card-body">
                <div className="p-2" ref={componentRef}>
                    <p>
                        {report.timestamp.toDate().toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    <div
                        className="text-left text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: formatReportText(report.report_text),
                        }}
                    />
                </div>
                <div className="card-actions self-end">
                    <Button text="Print" onClick={handlePrint} />
                    <Button text="Delete" variant="danger" onClick={() => deleteReport(report.id)} />
                </div>
            </div>
        </div>
    );
}

import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import PageNotFound from './PageNotFound';
import Loader from '../components/ui/Loader';
import { sortDate } from '../utils/sortDate';
import AnalyzedReportCard from '../components/cards/AnalyzedReportCard';

export default function ViewReportsPage() {
    const { id } = useParams();
    const { data, loading } = useFetchData('reports');

    if (loading) return <Loader />;
    if (!id) return <PageNotFound />;
    const filteredData = sortDate(data)
        .filter((report) => report.bin_id === id)
        .reverse();

    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">Analyzed Reports for {id}</h1>
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                {filteredData.length === 0 ? (
                    <div>No reports available for this bin.</div>
                ) : (
                    filteredData.map((report) => <AnalyzedReportCard key={report.id} report={report} />)
                )}
            </div>
        </div>
    );
}

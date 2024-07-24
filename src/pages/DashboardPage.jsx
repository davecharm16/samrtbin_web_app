import FillLevelChart from '../components/charts/FillLevelChart';
import WasteChart from '../components/charts/WasteChart';
import AlertError from '../components/ui/AlertError';
import Loader from '../components/ui/Loader';
import useFetchData from '../hooks/useFetchData';

export default function DashboardPage() {
    const { data, loading, error } = useFetchData('bins');

    if (loading) return <Loader />;
    if (error) return <AlertError error={error} />;

    const binIds = data.map((bin) => bin.id);

    return (
        <div>
            <div className="card bg-base-100 image-full w-full md:max-h-[250px] lg:max-h-[180px] mb-3">
                <figure>
                    <img
                        src="https://www.guardforce.com.hk/media/images/news/smart%20bin%20pic-01_1600x907.jpg"
                        alt="Shoes"
                        className="w-full object-cover"
                    />
                </figure>
                <div className="card-body flex">
                    <h2 className="card-title text-4xl font-bold">Hello there, Welcome to the Smart Bin</h2>
                    <p className="py-2 text-lg">
                        This application helps you manage and monitor your waste bins efficiently. Here, you can register new bins, track their
                        status, and get notified when they need attention.
                    </p>
                </div>
            </div>
            {binIds.length === 0 ? (
                <AlertError error="No registered bins available. Please add a bin from Bins Page." />
            ) : (
                <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
                    <FillLevelChart binIds={binIds} />
                    <WasteChart binIds={binIds} />
                </div>
            )}
        </div>
    );
}

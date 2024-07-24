import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { prepareWasteChartData } from '../../utils/prepareWasteChartData';
import { wasteTypeData } from '../../mocks/wasteTypeData';
import { percentageChartOptions } from '../../utils/chart-options/percentageChartOptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WasteChart({ binIds }) {
    const { data } = useFetchData('waste_data');
    const [selectedBin, setSelectedBin] = useState('All');
    const [selectedWasteType, setSelectedWasteType] = useState('All');

    useEffect(() => {
        if (binIds && binIds.length > 0) {
            setSelectedBin(binIds[0]);
        }
    }, [binIds]);

    const filteredData = data
        .filter((item) => item.bin_id === selectedBin)
        .filter((item) => selectedWasteType === 'All' || item.type === selectedWasteType);

    const chartData = prepareWasteChartData(filteredData, wasteTypeData, data.length);

    return (
        <div className="card shadow">
            <div className="card-body">
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h1 className="text-xl font-semibold">Waste Chart</h1>
                    <div className="join">
                        <select
                            className="select select-bordered join-item"
                            value={selectedBin}
                            onChange={(event) => setSelectedBin(event.target.value)}
                        >
                            {binIds.length === 0 ? (
                                <option disabled>No bins available</option>
                            ) : (
                                binIds.map((binId) => (
                                    <option key={binId} value={binId}>
                                        {binId}
                                    </option>
                                ))
                            )}
                        </select>

                        <select
                            className="select select-bordered join-item"
                            value={selectedWasteType}
                            onChange={(event) => setSelectedWasteType(event.target.value)}
                        >
                            <option value="All">All Types</option>
                            {wasteTypeData.map((waste) => (
                                <option key={waste} value={waste}>
                                    {waste}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <Bar data={chartData} chartoptions={percentageChartOptions} />
            </div>
        </div>
    );
}

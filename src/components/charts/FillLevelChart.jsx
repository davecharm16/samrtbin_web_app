import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { prepareFillChartData } from '../../utils/prepareFillChartData';
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Filler, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { percentageChartOptions } from '../../utils/chart-options/percentageChartOptions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

export default function FillLevelChart({ binIds }) {
    const { data } = useFetchData('fill_level_data');
    const [selectedBin, setSelectedBin] = useState('All');
    const [timePeriod, setTimePeriod] = useState('daily');

    const chartData = prepareFillChartData(data, 'bin', binIds, 'percentage', timePeriod, selectedBin);

    return (
        <div className="card shadow">
            <div className="card-body">
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h1 className="text-xl font-semibold">Fill Level Chart</h1>
                    <div className="join">
                        <select
                            className="select select-bordered join-item"
                            value={selectedBin}
                            onChange={(event) => setSelectedBin(event.target.value)}
                        >
                            {binIds.length === 0 ? (
                                <option disabled>No bins available</option>
                            ) : (
                                <>
                                    <option value="All">All Bins</option>
                                    {binIds.map((binId) => (
                                        <option key={binId} value={binId}>
                                            {binId}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>

                        <select
                            className="select select-bordered join-item"
                            value={timePeriod}
                            onChange={(event) => setTimePeriod(event.target.value)}
                        >
                            {['daily', 'weekly', 'monthly'].map((waste) => (
                                <option key={waste} value={waste}>
                                    {waste}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <Line data={chartData} chartoptions={percentageChartOptions} />
            </div>
        </div>
    );
}

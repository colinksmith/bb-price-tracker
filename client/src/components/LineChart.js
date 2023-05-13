import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Price History',
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                displayFormats: {
                    day: 'D MMM yyyy'
                }
            }
        },
        y: {
            type: 'time',
            time: {
                parser: 'HH:mm',
                unit: 'hour',
                stepSize: 1,
                displayFormats: {
                    hour: 'HH:mm'
                },
                tooltipFormat: 'HH:mm'
            },
            ticks: {
                min: '00:00',
                max: '08:00'
            }
        }
    }
};

const data = {
    datasets: [
        {
            label: 'Dataset 1',
            data: [
                { x: '2022-11-06', y: '02:00' }, 
                { x: '2022-11-07', y: '08:00' }, 
                { x: '2022-11-08', y: '06:00' }
            ],
            showLine: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

function LineChart() {
    return <Scatter 
        options={options}
        data={data}

    />;
}

export default LineChart
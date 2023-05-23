import React, { useEffect, useState } from 'react'
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
            type: 'linear',
            ticks: {
                stepsize: 1,
            }
            // time: {
            //     parser: 'HH:mm',
            //     unit: 'hour',
            //     stepSize: 1,
            //     displayFormats: {
            //         hour: 'HH:mm'
            //     },
            //     tooltipFormat: 'HH:mm'
            // },
            // ticks: {
            //     min: '00:00',
            //     max: '08:00'
            // }
        }
    }
};

// const data = {
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [
//                 { x: '2022-11-08', y: '1425' },
//                 { x: '2022-11-07', y: '1500' }, 
//                 { x: '2022-11-06', y: '1400' }, 
//             ],
//             showLine: true,
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//     ],
// };

function LineChart(props) {

    if (props.data.priceData) {
        props.data.priceData.map(dataPoint => {
            dataPoint.x = dataPoint.date
            dataPoint.y = dataPoint.price
            return dataPoint
        })
    }

    console.log(props.data.priceData)

    const chartData = {
        datasets: [
            {
                label: 'Dataset 1',
                data: props.data.priceData,
                showLine: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    
    return <Scatter 
        options={options}
        data={chartData}

    />;
}

export default LineChart
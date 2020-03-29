import React from 'react';
import { Line, Bar } from 'react-chartjs-2';;


const DataByDate = ({ data, header, ChartType }) => {
    const Chart = ChartType === 'Line' ? Line : Bar

    const labels = data.map(date => {
        return new Date(date.addDate).toDateString();
    });
    const dateData = data.map(submitted => { return submitted.totalSubmitted });
    const randomColor = data.map(submitted => {
        const color1 = Math.floor(Math.random() * 360);
        const color2 = Math.floor(Math.random() * 169);
        const color3 = Math.floor(Math.random() * 120);
        return {
            fill: `rgba(${color1}, ${color2}, ${color3}, 0.64)`,
            border: `rgba(${color1}, ${color2}, ${color3}, 1)`
        }
    });

    const dataChart = {
        data: {
            labels: labels,
            datasets: [{
                label: header,
                data: dateData,
                backgroundColor: randomColor.map(random => { return random.fill }),
                borderColor: randomColor.map(random => { return random.border }),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    return <div className='data-by-date'>
        <Chart
            data={dataChart.data}
            options={dataChart.options}
            width={100}
            height={50}
        />
    </div >
};

export default DataByDate;
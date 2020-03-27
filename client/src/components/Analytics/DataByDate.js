import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';;

class DataByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            options: {}
        }
    }
    componentDidMount() {
        const { data } = this.props;
        const labels = data.map(date => {
            return new Date(date.addDate).toDateString();
        });
        const dateData = data.map(submitted => { return submitted.totalSubmitted });
        const randomColor = data.map(submitted => {
            const color1 = Math.floor(Math.random() * 169);
            const color2 = Math.floor(Math.random() * 169);
            const color3 = Math.floor(Math.random() * 169);
            return {
                fill: `rgba(${color1}, ${color2}, ${color3}, 0.64)`,
                border: `rgba(${color1}, ${color2}, ${color3}, 1)`
            }
        });

        this.setState({
            data: {
                labels: labels,
                datasets: [{
                    label: this.props.header,
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
        })
    };

    render() {
        return <div className='data-by-date'>
            <Line
                data={this.state.data}
                width={100}
                height={50}
            />
        </div >
    }
}

export default DataByDate;
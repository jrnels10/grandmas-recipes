import React, { Component } from 'react';
import { getDataByDayWithinDates, getDateByWeekWithinDates, getlastLoginDataByDayWithinDates } from './../../API/AnalyticsAPI';
import DataByDate from './DataByDate';

import './analytics.css';


async function analyticsQuery(dataType) {
    var dt = new Date()
    dt.setDate(dt.getDate() - 20);
    const isoDate = dt.toISOString()
    console.log(dt.setUTCHours(0, 0, 0, 0))
    // console.log(dt)

    const dailySubmittedData = await getDataByDayWithinDates(
        {
            dataType: dataType,
            beginDate: dt.setUTCHours(0, 0, 0, 0),//new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            finalDate: new Date().toISOString()
        }
    );
    const weeklySubmittedData = await getDateByWeekWithinDates(
        {
            dataType: dataType,
            beginDate: "2020-01-01T00:00:00Z",
            finalDate: new Date()
        }
    );
    const resUserLogin = await getlastLoginDataByDayWithinDates(
        {
            dataType: 'User',
            beginDate: dt.setUTCHours(0, 0, 0, 0),
            finalDate: new Date()
        }
    );
    console.log(weeklySubmittedData)
    return { dailySubmittedData: dailySubmittedData.data, weeklySubmittedData: weeklySubmittedData.data, dailyUserLogin: resUserLogin.data };
}

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Chef"
        }
    }
    async componentDidMount() {
        const { dailySubmittedData, weeklySubmittedData, dailyUserLogin } = await analyticsQuery(this.state.value);
        this.setState({ dailySubmittedData, weeklySubmittedData, dailyUserLogin });
    };

    handleChange = async (e) => {
        this.setState({ value: e.target.value });
        const { dailySubmittedData, weeklySubmittedData, dailyUserLogin } = await analyticsQuery(e.target.value);
        this.setState({ dailySubmittedData, weeklySubmittedData, dailyUserLogin });
    };

    render() {
        const { dailySubmittedData, weeklySubmittedData, dailyUserLogin } = this.state;

        if (dailySubmittedData) {
            return <div className='analytics container-fluid'>
                <div className='row analytics-inputs'>

                    <div className='analytics-inputs-dataType'>
                        <label>
                            Choose what type of data:
                            </label>
                        <select id="analytics-dataType" onChange={this.handleChange} value={this.state.value}>
                            <option value="Chef">Chef</option>
                            <option value="User">User</option>
                            <option value="Recipe">Recipe</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <DataByDate ChartType="Bar" data={dailySubmittedData} header='Submitted last 20 days' />
                    </div>
                    <div className='col-md-6 col-xs-12'>

                        <DataByDate ChartType="Bar" data={weeklySubmittedData} header='Weekly Submitted from beginning of year' />
                    </div>
                    <div className='col-md-6 col-xs-12'>

                        <DataByDate ChartType="Line" data={dailyUserLogin} header='Logged in by date' />
                    </div>
                </div>
            </div>
        } {
            return null
        }
    }
}

export default Analytics;
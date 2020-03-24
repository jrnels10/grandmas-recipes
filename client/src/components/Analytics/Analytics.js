import React, { Component } from 'react';
import { getDataByDayWithinDates, getDateByWeekWithinDates, getlastLoginDataByDayWithinDates } from './../../API/AnalyticsAPI';
import DataByDate from './DataByDate';

import './analytics.css';

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    async componentDidMount() {
        console.log(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

        const res = await getDataByDayWithinDates(
            {
                dataType: 'Family',
                beginDate: "2020-03-01T00:00:00Z", //new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                finalDate: new Date()
            }
        );
        const resWeek = await getDateByWeekWithinDates(
            {
                dataType: 'Chef',
                beginDate: "2020-03-01T00:00:00Z",
                finalDate: new Date()
            }
        );
        const resUserLogin = await getlastLoginDataByDayWithinDates(
            {
                dataType: 'User',
                beginDate: "2020-03-01T00:00:00Z", //new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                finalDate: new Date()
            }
        );
        console.log(resUserLogin)
        this.setState({ dailyDataByDate: res.data, weeklyDataByDate: resWeek.data, dailyUserLogin: resUserLogin.data });
    }
    render() {
        const { dailyDataByDate, weeklyDataByDate } = this.state;
        if (dailyDataByDate) {
            return <div className='analytics container-fluid'>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <DataByDate data={dailyDataByDate} header='Daily Submitted' />
                    </div>
                    <div className='col-md-6 col-xs-12'>

                        <DataByDate data={weeklyDataByDate} header='Weekly Submitted' />
                    </div>

                </div>
            </div>
        } {
            return null
        }
    }
}

export default Analytics;
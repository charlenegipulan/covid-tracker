import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'

const Chart = () => {
    // same as state = {
    //      dailyData {}
    //     }
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });

    const lineChart = (
        dailyData.length !== 0 //if array is empty
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Infected',
                    borderColor: '#red',
                    backgroundColor: '#FD2B2B',
                    fill: true,
                }],
            }}
        />) : null
    );

    return(
        <div className="{styles.container}">
            {lineChart}
        </div>
    )
}

export default Chart;
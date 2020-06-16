import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, deaths, recovered}, country }) => {
    // same as state = {
    //      dailyData {}
    //     }
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length//if array is not empty
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

    console.log(confirmed, recovered, deaths)

    const barChart = (
        confirmed 
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['#2980DD', '#06CC02', '#FD2B2B'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: {display: true, text: `Current state in ${country}`}
                }}
            />
        ) : null
    )

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
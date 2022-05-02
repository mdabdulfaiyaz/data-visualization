import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from 'd3';
import {PieChart} from "./components/PieChart"
import {BarChart} from "./components/BarChart"
import "./App.css";

function App() {
	const [dataVisuals, setDataVisuals] = useState([]);
	const API_URL = `http://localhost:3001/api`;
	const svg = useRef(null)

	const population = dataVisuals

	 useEffect(() => {
		console.log('FE')
		axios.get(`${API_URL}`)
		.then((response) => response.data)
		.then((data) => setDataVisuals(data))
	}, []);
	console.log(population);
    useEffect(() => {
        if (svg.current && dataVisuals.length !== 0) {
            const pieChart = PieChart(population,{
                name: (d) => d.topic,
                value: (d) => d.intensity,
                width: 500,
                height: 500,
            });
            svg.current.appendChild(pieChart);
			
        }
	},[dataVisuals])

	useEffect(() => {
		if (svg.current && dataVisuals.length !== 0) {
		const barChart = BarChart(population, {
			x: d => d.region,
			y: d => d.intensity,
			xDomain: d3.groupSort(population, ([d]) => -d.intensity, d => d.region), // sort by descending frequency
			yFormat: '%',
			width: 800,
			height: 500,
			color: "#e0966c",
		  });
		  svg.current.appendChild(barChart);
		}
	},[dataVisuals])

	return  (
		<div className="App">
			Hello World
		<div ref={svg} />
		<div ref={svg} />
	</div>)
}

export default App;

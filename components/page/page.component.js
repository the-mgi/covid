import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PageComponent = () => {
	const [populationData, setPopulationData] = useState();
	const [covidData, setCovidData] = useState([]);

	useEffect(() => {
		fetch('https://covid-19-data.p.rapidapi.com/totals', {
			method: 'GET',
			headers: {
				"x-rapidapi-key": "81ea3ffe0bmshf9d99a01d814195p110648jsn15487626a901",
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				"useQueryString": true
			}
		})
			.then((response) => {
				return response.json();
			})
			.then(result => {
				setCovidData(result);
			})
			.catch(error => {
				console.log(error);
			});

		fetch('https://world-population.p.rapidapi.com/worldpopulation', {
			method: 'GET',
			headers: {
				"x-rapidapi-key": "81ea3ffe0bmshf9d99a01d814195p110648jsn15487626a901",
				"x-rapidapi-host": "world-population.p.rapidapi.com",
				"useQueryString": true
			}
		})
			.then(response => {
				return response.json();
			})
			.then(result => {
				setPopulationData(result);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const getPercentage = (totalPopulation, data) => {
		if (data && totalPopulation) {
			return ((data / totalPopulation) * 100).toFixed(5);
		}
		return 0;
	};

	return (
		<>
			<View>
				{(covidData.length && populationData) ? covidData.map(item => {
					return Object.keys(item).map((key, index) => {
						return (
							key.toLowerCase().indexOf("last") === -1 ? <View style={styles.singleContainer} key={index}>
								<Text style={{...styles.text, fontWeight: "bold", fontSize: 18, color: "green"}}>{key.toUpperCase()}</Text>
								<Text style={{marginLeft: 10, fontSize: 16}}>{item[key]}</Text>
								<Text style={{marginLeft: 10}}>
									<Text style={{fontWeight: "bold", fontSize: 18, color: "red"}}>Percentages:</Text>
									<Text style={{fontSize: 16}}>
										{getPercentage(+populationData.body.world_population, +item[key])}
									</Text>
								</Text>
							</View> : null
						);
					})
				}) : null}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	singleContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	text: {
		marginLeft: 10
	}
});

export default PageComponent;

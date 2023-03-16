import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import * as Location from 'expo-location';
import moment from 'moment-timezone';
import CustomCard from '../shared/customCards';
import { styles } from '../shared/shared';
import Activity from '../shared/activityloader';
// Daily screen
export default function Daily() {
	// Checking the time of the day it is and showing appropriate background
	var bgImage;
	const time = new Date().getHours();
	if (time >= 6 && time < 18) {
		bgImage = require('../assets/sky.jpg');
	} else {
		bgImage = require('../assets/dark.jpg');
	}
	const [
		location,
		setlocation
	] = useState(null);
	const [
		errorMsg,
		setErrorMsg
	] = useState(null);

	useEffect(() => {
		// Async Function to check errors
		(async () => {
			let {
				status
			} = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission Denied');
				return;
			}
			let loc = await Location.getCurrentPositionAsync({});

			//Getting different data
			fetch(
				`https://api.openweathermap.org/data/3.0/onecall?lat=${loc
					.coords.latitude}&lon=${loc.coords
					.longitude}&exclude=minutely,hourly&units=metric&appid=1f7892e7d880136fee0501f0feb76a6f`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				}
			)
				.then((response) => response.json())
				.then((json) => {
					setlocation(json);
				})
				.catch((error) => {
					console.log(error);
				});
		})();
	}, []);

	if (errorMsg !== null) {
		//error occured
		return (
			<View style={styles.container}>
				<Text>Error here</Text>
				<StatusBar style="auto" />
			</View>
		);
	} else if (location !== null) {
		//success
		return (
			<ImageBackground
				source={bgImage}
				style={styles.imageBack}
				blurRadius={10}
			>
				{/* Showing the daily forecast data using flat list */}
				{/* Parsing over the data and getting the values from the list and displaying them */}
				<FlatList
					contentInsetAdjustmentBehavior="automatic"
					style={styles.list}
					vertical
					data={location.daily.splice(0, 24)}
					keyExtractor={(item, index) => index.toString()}
					renderItem={(daily) => {
						const weather = daily.item.weather[0];
						var dt = moment
							.unix(daily.item.dt)
							.format('DD/MM');
						return (
							// Displaying data using the custom card by passing in the props we want to show
							<CustomCard
								temperature={Math.round(
									daily.item.temp.max
								)}
								description={weather.description}
								tempUnit={'°'}
								icon1={require('../assets/icons/wet.png')}
								desc1={daily.item.humidity}
								unit1={'%'}
								icon2={require('../assets/icons/cloud.png')}
								desc2={daily.item.clouds}
								unit2={'%'}
								icon3={require('../assets/icons/sun.png')}
								desc3={Math.round(daily.item.temp.day)}
								unit3={'°'}
								icon4={require('../assets/icons/moon.png')}
								desc4={Math.round(daily.item.temp.night)}
								unit4={'°'}
								mainImg={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
								dt={dt}
							/>
						);
					}}
				/>
			</ImageBackground>
		);
	} else {
		//waiting
		return <Activity />;
	}
}

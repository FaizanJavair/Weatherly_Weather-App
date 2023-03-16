import { StatusBar } from 'expo-status-bar';
import {
	Text,
	View,
	Image,
	ImageBackground,
	FlatList
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import * as Location from 'expo-location';
import moment from 'moment-timezone';
import { styles } from '../shared/shared';
import Activity from '../shared/activityloader';
import CustomCard from '../shared/customCards';
export default function Hourly({ navigation }) {
	// Checking the time of the day it is and showing appropriate background
	var bgImage;
	const time = new Date().getHours();

	if (time >= 6 && time < 18) {
		bgImage = require('../assets/sky.jpg');
	} else {
		bgImage = require('../assets/dark.jpg');
	}
	const sky = require('../assets/sky.jpg');
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

			//Getting hourly data from API
			fetch(
				`https://api.openweathermap.org/data/3.0/onecall?lat=${loc
					.coords.latitude}&lon=${loc.coords
					.longitude}&exclude=minutely,daily&units=metric&appid=1f7892e7d880136fee0501f0feb76a6f`,
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
				{/* Using flat list to show data */}
				{/* By parsing over the list the API provides and displaying it */}
				<FlatList
					contentInsetAdjustmentBehavior="automatic"
					style={styles.list}
					vertical
					data={location.hourly.splice(0, 24)}
					keyExtractor={(item, index) => index.toString()}
					renderItem={(hour) => {
						const weather = hour.item.weather[0];
						var dt = moment
							.tz(hour.item.dt * 1000, location.timezone)
							.format('HH:mm');
						return (
							// Calling the custom card function and sending in the appropriate props we want to show
							<CustomCard
								temperature={Math.round(hour.item.temp)}
								description={weather.description}
								tempUnit={'°'}
								icon1={require('../assets/icons/wet.png')}
								desc1={hour.item.humidity}
								unit1={'%'}
								icon2={require('../assets/icons/cloud.png')}
								desc2={hour.item.clouds}
								unit2={'%'}
								icon3={require('../assets/icons/wind.png')}
								desc3={hour.item.wind_speed}
								unit3={'m/s'}
								icon4={require('../assets/icons/info.png')}
								desc4={hour.item.pressure}
								unit4={'hPa'}
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

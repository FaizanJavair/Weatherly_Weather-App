import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ImageBackground,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import * as Location from 'expo-location';
import Hourly from './hourly';
import Daily from './daily';
import Pollution from './pollution';
import moment from 'moment-timezone';
import Activity from '../shared/activityloader';
import { SmallCardV2, SmallCardV1 } from '../shared/SmallCard';

// Home Screen
export default function Home({ navigation }) {
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
		currentlocation,
		setCurrentLocation
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
			// Fetching the current data
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${loc
					.coords.latitude}&lon=${loc.coords
					.longitude}&appid=ac85f77e4d3c9527115d512f8f24d3f7&units=metric`,
				{
					method: 'POST',
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
		// Checking for country timezone using moment library
		var cZone = moment.tz.zonesForCountry(location.sys.country, true);

		return (
			<ImageBackground
				source={bgImage}
				style={styles.imageBack}
				blurRadius={10}
			>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={{ flex: 1, paddingBottom: 120 }}
				>
					<SafeAreaView style={styles.container}>
						{/* City / Country name */}
						<View style={styles.cardHeader}>
							<Text style={styles.cardHeader}>
								{location.name}, {location.sys.country}
							</Text>
						</View>
						{/* Card to show current temperature */}
						<View style={styles.card}>
							<View style={styles.description}>
								<Text style={styles.description}>
									{Math.round(location.main.temp)}°
								</Text>
								<Text style={styles.subHeading}>
									{location.weather[0].description}
								</Text>
								<Text style={styles.subTemp}>
									Hi:
									{Math.round(location.main.temp_max)}°C
									Lo:
									{Math.round(location.main.temp_min)}°C
								</Text>
							</View>
							<View style={styles.cardImg}>
								<Image
									source={{
										uri: `http://openweathermap.org/img/wn/${location
											.weather[0].icon}@4x.png`
									}}
									style={styles.currentImage}
								/>
							</View>
						</View>
						{/* Navigation links */}
						<View style={styles.cell}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Hourly');
								}}
								style={{ flexDirection: 'row' }}
							>
								<Image
									source={require('../assets/icons/clock.png')}
									style={styles.iconOp}
								/>
								<Text style={styles.subHeadingOpacity}>
									Hourly
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Daily');
								}}
								style={{ flexDirection: 'row' }}
							>
								<Image
									source={require('../assets/icons/calendar.png')}
									style={styles.iconOp}
								/>
								<Text style={styles.subHeadingOpacity}>
									Daily
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Pollution');
								}}
								style={{ flexDirection: 'row' }}
							>
								<Image
									source={require('../assets/icons/pollution.png')}
									style={styles.iconOp}
								/>
								<Text style={styles.subHeadingOpacity}>
									Pollution
								</Text>
							</TouchableOpacity>
						</View>
						{/* section for info of small cards */}
						<View style={styles.moreInfo}>
							<SmallCardV1
								icon={require('../assets/icons/smile.png')}
								head={'Feels Like'}
								value={Math.round(
									location.main.feels_like
								)}
								unit={'°'}
							/>
							<SmallCardV1
								icon={require('../assets/icons/wet.png')}
								head={'Humidity'}
								value={location.main.humidity}
								unit={'%'}
							/>
						</View>
						{/* section for info of small cards */}
						<View style={styles.moreInfo}>
							<SmallCardV2
								icon={require('../assets/icons/wind.png')}
								head={'Wind'}
								headvalue1={'Degree'}
								value1={location.wind.deg}
								unit1={'°'}
								headvalue2={'Speed'}
								value2={location.wind.speed}
								unit2={'m/s'}
								headvalue3={'Gust'}
								value3={location.wind.gust}
								unit3={'m/s'}
							/>

							<SmallCardV2
								icon={require('../assets/icons/info.png')}
								head={'More Info'}
								headvalue1={'Pressure'}
								value1={location.main.grnd_level}
								unit1={'hPa'}
								headvalue2={'G. Level'}
								value2={location.main.grnd_level}
								unit2={'m'}
								headvalue3={'S. Level'}
								value3={location.main.sea_level}
								unit3={'m'}
							/>
						</View>
						{/* section for info of small cards */}
						<View style={styles.moreInfo}>
							{/* Showing time using moments again */}
							<SmallCardV1
								icon={require('../assets/icons/sun.png')}
								head={'Sunrise'}
								value={moment
									.tz(
										location.sys.sunrise * 1000,
										cZone[0].name
									)
									.format('HH:mm')}
								unit={''}
							/>
							<SmallCardV1
								icon={require('../assets/icons/moon.png')}
								head={'Sunset'}
								value={moment
									.tz(
										location.sys.sunset * 1000,
										cZone[0].name
									)
									.format('HH:mm')}
								unit={''}
							/>
						</View>
					</SafeAreaView>
				</ScrollView>
				<StatusBar style="auto" />
			</ImageBackground>
		);
	} else {
		//waiting
		return <Activity />;
	}
}
// CSS for the Home screen
const styles = StyleSheet.create({
	cell: {
		justifyContent: 'space-between',
		width: '90%',
		borderRadius: 20,
		backgroundColor: 'rgba(255,255,255, 0.5)',

		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '4%',
		marginBottom: '4%',
		padding: '5%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32
	},
	imageBack: {
		height: '100%',
		width: '100%',
		resizeMode: 'cover',
		overflow: 'hidden',
		flex: 1
	},
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0)',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	card: {
		backgroundColor: 'rgba(255,255,255, 0.5)',
		height: '20%',
		width: '90%',
		padding: '5%',
		margin: '1%',
		borderRadius: 20,
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32
	},
	description: {
		flexDirection: 'column',
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		color: 'white',
		fontSize: 40,
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 4
	},
	currentImage: {
		width: '50%',
		height: '50%',
		marginBottom: '20%',
		marginTop: '20%'
	},
	cardImg: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flex: 1
	},
	cardHeader: {
		marginBottom: '2%',
		marginTop: '2%',
		fontSize: 40,
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 4
	},
	subHeading: {
		fontSize: 20,
		color: 'rgba(0,0,0, 0.7)',
		textShadowColor: 'rgba(0, 0, 0, 0.05)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 3,
		marginBottom: '3%'
	},
	subTemp: {
		fontSize: 20,
		color: 'white'
	},
	subHeadingOpacity: {
		fontSize: 15,
		color: 'rgba(0,0,0, 0.7)',
		textShadowColor: 'rgba(0, 0, 0, 0.05)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 3
	},
	iconOp: {
		width: '10%',
		height: '10%',
		marginHorizontal: '1%',
		padding: 10,
		tintColor: 'rgba(0,0,0, 0.7)',
		shadowColor: '#000',
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1
	},
	moreInfo: {
		marginEnd: '2%',
		marginStart: '2%',
		height: '25%',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: '2%'
	}
});

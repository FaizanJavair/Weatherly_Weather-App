import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ActivityIndicator,
	ImageBackground
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import * as Location from 'expo-location';

import moment from 'moment-timezone';
import Activity from '../shared/activityloader';
import PollutionTable from '../shared/pollutionTable';
export default function Pollution({ navigation }) {
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
	// Array for identifying what the type represents as written in the API documentation
	const pollution = [
		'NA',
		'Good',
		'Fair',
		'Moderate',
		'Poor',
		'Very Poor'
	];
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
			console.log(loc);
			// Fetching data from the API
			fetch(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${loc
					.coords.latitude}&lon=${loc.coords
					.longitude}&appid=1f7892e7d880136fee0501f0feb76a6f`,
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
		var pol = pollution[location.list[0].main.aqi];
		var co = Math.round(location.list[0].components.co);
		return (
			<ImageBackground
				source={bgImage}
				style={styles.imageBack}
				blurRadius={10}
			>
				<SafeAreaView style={styles.container}>
					<View style={styles.card}>
						<View style={styles.subCard}>
							{/* Section for showing main overview data */}
							<View style={styles.subTextV}>
								<View style={styles.subCardM}>
									<Text style={styles.subText}>
										{location.list[0].main.aqi}
									</Text>
									<Image
										style={{
											width: 10,
											height: 10
										}}
										source={require('../assets/icons/star.png')}
									/>
								</View>

								<Text style={styles.subText}>{pol}</Text>
								<Text style={styles.subText}>
									{moment
										.unix(location.list[0].dt)
										.format('DD/MM')}
								</Text>
							</View>
							<View style={styles.imageView}>
								<Image
									source={require('../assets/icons/pol.png')}
								/>
							</View>
						</View>
						{/* Section for showing the list of pollutants in the table using custom table we made */}
						<View style={styles.polCard}>
							<View style={styles.polHead}>
								<Image
									style={styles.polImg}
									source={require('../assets/icons/pollution.png')}
								/>
								<Text style={styles.script}>
									Pollutant
								</Text>
								<View style={styles.concen}>
									<Text style={styles.script}>
										Concentration: μg/m
									</Text>
									<Text style={styles.subScript}>3</Text>
								</View>
							</View>
							<PollutionTable
								image={require('../assets/icons/car-pol.png')}
								script={'Carbon Monoixde (CO)'}
								value={Math.round(
									location.list[0].components.co
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/car2.png')}
								script={'Nitrogen Monoixde (NO)'}
								value={Math.round(
									location.list[0].components.no
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/fact.png')}
								script={'Nitrogen Dioxide (NO2)'}
								value={Math.round(
									location.list[0].components.no2
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/nh3.png')}
								script={'Sulfur Dioxide (SO2)'}
								value={Math.round(
									location.list[0].components.so2
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/pol.png')}
								script={'Ammonia (NH3)'}
								value={Math.round(
									location.list[0].components.nh3
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/particle.png')}
								script={'Particulate (PM2.5)'}
								value={Math.round(
									location.list[0].components.pm2_5
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/particle.png')}
								script={'Particulate (PM10)'}
								value={Math.round(
									location.list[0].components.pm10
								)}
							/>
							<PollutionTable
								image={require('../assets/icons/ozone.png')}
								script={'Ozone (O3)'}
								value={Math.round(
									location.list[0].components.o3
								)}
							/>
						</View>
					</View>
				</SafeAreaView>

				<StatusBar style="auto" />
			</ImageBackground>
		);
	} else {
		//waiting
		return <Activity />;
	}
}
// Pollution screen css
const styles = StyleSheet.create({
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
		height: '100%',
		width: '90%',
		padding: '8%',
		margin: '2%',
		borderRadius: 20,
		paddingTop: '10%',
		flexDirection: 'column',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32
	},
	subCard: {
		flexDirection: 'row',
		flex: 1,
		borderBottomColor: 'rgba(0, 0,0, 0.5)',
		borderBottomWidth: 1,
		marginBottom: '5%',
		paddingBottom: '8%'
	},
	subCardM: {
		flexDirection: 'row'
	},
	subTextV: {
		flexDirection: 'column',
		flex: 1
	},
	subText: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		color: 'white',
		fontSize: 30,
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 4
	},
	polCard: {
		flex: 5
	},
	polHead: {
		flexDirection: 'row',
		borderBottomColor: 'rgba(0, 0,0, 0.4)',
		borderBottomWidth: 1,

		marginBottom: '5%',
		paddingBottom: '5%'
	},
	concen: {
		marginLeft: '10%',
		flexDirection: 'row'
	},
	polImg: {
		width: 18,
		height: 18,
		marginRight: '2%'
	},
	script: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		color: 'rgba(0, 0, 0, 0.6)',
		fontSize: 18,
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 3
	},

	subScript: {
		lineHeight: 15,
		color: 'rgba(0, 0, 0, 0.6)',
		fontSize: 15,
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 3
	}
});

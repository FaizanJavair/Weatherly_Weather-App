import { StyleSheet } from 'react-native';
import React from 'react';
import Home from './screens/home';
import Daily from './screens/daily';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hourly from './screens/hourly';
import Pollution from './screens/pollution';

// Main Application
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			{/* Stack navigation for all the screens */}
			<Stack.Navigator>
				{/* Stack navigation for home screens */}
				<Stack.Screen
					name="Home"
					options={{
						title: 'Current Weather',

						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: 'rgba(255, 255, 255, 0)'
						},
						headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
							fontWeight: 'bold'
						}
					}}
					component={Home}
				/>
				{/* Stack navigation for hourly screens */}
				<Stack.Screen
					name="Hourly"
					options={{
						title: 'Hourly',

						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: 'rgba(255, 255, 255, 0)'
						},
						headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
							fontWeight: 'bold'
						}
					}}
					component={Hourly}
				/>
				{/* Stack navigation for daily screens */}
				<Stack.Screen
					name="Daily"
					options={{
						title: 'Daily',

						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: 'rgba(255, 255, 255, 0)'
						},
						headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
							fontWeight: 'bold'
						}
					}}
					component={Daily}
				/>
				{/* Stack navigation for pollution screens */}
				<Stack.Screen
					name="Pollution"
					options={{
						title: 'Pollution',

						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: 'rgba(255, 255, 255, 0)'
						},
						headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
							fontWeight: 'bold'
						}
					}}
					component={Pollution}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0)',
		alignItems: 'center'
	}
});

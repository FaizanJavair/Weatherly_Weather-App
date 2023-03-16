import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Shared CSS for the customCard file which is used in Daily, and Hourly Screen
const styles = StyleSheet.create({
	iconSmall: {
		width: 30,
		height: 30
	},
	list: {
		marginTop: '25%',
		paddingStart: '5%',
		padding: '5%'
	},
	tempsDay: {
		flexDirection: 'row',
		marginTop: '1%'
	},
	listText: {
		marginTop: '4%',
		fontSize: 35,
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 2
	},
	listTextSmall: {
		marginLeft: '30%',
		marginBottom: '10%',
		fontSize: 20,
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 2
	},
	subDescription: {
		fontSize: 20,
		color: 'white',
		marginStart: '2%',
		marginEnd: '2%',
		marginTop: '2%',
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1
	},
	icon: {
		width: 100,
		height: 100
	},
	description: {
		flex: 3
	},
	descriptionSmall: {
		marginTop: '3%',
		marginBottom: '3%',
		fontSize: 25,
		color: 'rgba(0,0,0, 0.5)',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 2
	},
	image: {
		flex: 1,
		marginEnd: '2%'
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
	},
	card: {
		backgroundColor: 'rgba(255,255,255, 0.5)',
		width: '100%',
		marginBottom: '3%',
		padding: '4%',
		borderRadius: 20,
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32
	}
});

export { styles };

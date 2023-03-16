import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
// Version 2 for small card used in the home screen which has 3 values
const SmallCardV2 = (props) => {
	return (
		<View style={styles.smallCard}>
			<View style={styles.smallCardHead}>
				<Image source={props.icon} style={styles.icon} />
				<Text style={styles.iconName}>{props.head}</Text>
			</View>
			<View style={styles.smallCardBody}>
				<Text style={styles.smallbodyText}>
					{props.headvalue1}:
					{props.value1}
					{props.unit1}
				</Text>
				<Text style={styles.smallbodyText}>
					{props.headvalue2}:
					{props.value2}
					{props.unit2}
				</Text>
				<Text style={styles.smallbodyText}>
					{props.headvalue3}:
					{props.value3}
					{props.unit3}
				</Text>
			</View>
		</View>
	);
};
// Version 1 for small card used in the home screen which has only 1 value
const SmallCardV1 = (props) => {
	return (
		<View style={styles.smallCard}>
			<View style={styles.smallCardHead}>
				<Image source={props.icon} style={styles.icon} />
				<Text style={styles.iconName}>{props.head}</Text>
			</View>
			<View style={styles.smallCardBody}>
				<Text style={styles.smallbodyText2}>
					{props.value}
					{props.unit}
				</Text>
			</View>
		</View>
	);
};
// All the CSS for the small card
const styles = StyleSheet.create({
	smallCard: {
		height: '100%',
		borderRadius: 20,
		backgroundColor: 'rgba(255,255,255, 0.5)',
		flex: 1,
		margin: '1%',
		padding: '5%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32
	},
	icon: {
		width: '10%',
		height: '10%',
		marginHorizontal: '2%',
		padding: 18,
		tintColor: 'rgba(0,0,0, 0.7)',
		shadowColor: '#000',
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1
	},
	iconName: {
		fontSize: 18,
		marginHorizontal: '2%',
		color: 'rgba(0,0,0, 0.7)',
		marginTop: '5%',
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1
	},
	smallCardHead: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		padding: 0,
		height: '30%'
	},
	smallCardBody: {
		flex: 1
	},
	smallbodyText: {
		marginBottom: '3%',
		marginTop: '5%',
		fontSize: 15,
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 2
	},
	smallbodyText2: {
		marginBottom: '12%',
		marginTop: '6%',
		fontSize: 53,
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 2
	}
});

export { SmallCardV2, SmallCardV1 };

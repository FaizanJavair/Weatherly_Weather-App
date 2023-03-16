import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';

// Custom table field for pollution table
const PollutionTable = (props) => {
	return (
		<View style={styles.polHeadA}>
			<View style={styles.polHeadContainer}>
				<Image style={styles.polImg} source={props.image} />
				<Text style={styles.scriptA}>{props.script}</Text>
			</View>

			<View style={styles.concenA}>
				<Text style={styles.scriptA}>{props.value}</Text>
			</View>
		</View>
	);
};
// CSS for the pollution table
const styles = StyleSheet.create({
	polCard: {
		flex: 5
	},
	polHead: {
		flexDirection: 'row',
		borderBottomColor: 'gray',
		borderBottomWidth: 1,

		marginBottom: '5%',
		paddingBottom: '5%'
	},
	polHeadA: {
		flexDirection: 'row',
		marginTop: '2%',
		borderBottomColor: 'rgba(0, 0,0, 0.2)',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingBottom: '5%',
		marginBottom: '5%',
		justifyContent: 'space-between'
	},
	concenA: {
		marginLeft: '10%',
		flexDirection: 'row'
	},
	polImg: {
		width: 18,
		height: 18,
		marginRight: '2%'
	},
	scriptA: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		color: 'rgba(0, 0, 0, 0.55)',
		fontSize: 15,
		textShadowColor: 'rgba(0, 0, 0, 0.45)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 3
	},

	polHeadContainer: {
		flexDirection: 'row'
	}
});

export default PollutionTable;

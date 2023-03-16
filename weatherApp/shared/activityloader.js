import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	Easing
} from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';

// Custom Activity indicator using react-native-indicators
export default function Activity() {
	return (
		<SafeAreaView style={styles.container}>
			<PacmanIndicator
				color="yellow"
				size={55}
				animationDuration={1200}
				animationEasing={Easing.circle}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#00418E',
		color: '#00418E',
		alignItems: 'center'
	}
});

export { styles };

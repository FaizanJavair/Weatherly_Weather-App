import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { styles } from './shared';

// Custom card used in the Daily and Hourly screen
const CustomCard = (props) => {
	return (
		<View style={styles.card}>
			<View style={styles.description}>
				<Text style={styles.listText}>
					{props.temperature}
					{props.tempUnit}
				</Text>

				<Text style={styles.descriptionSmall}>
					{props.description}
				</Text>
				<View style={styles.tempsDay}>
					<Image style={styles.iconSmall} source={props.icon1} />
					<Text style={styles.subDescription}>
						{props.desc1}
						{props.unit1}
					</Text>
					<Image style={styles.iconSmall} source={props.icon2} />
					<Text style={styles.subDescription}>
						{props.desc2}
						{props.unit2}
					</Text>
				</View>
				<View style={styles.tempsDay}>
					<Image style={styles.iconSmall} source={props.icon3} />
					<Text style={styles.subDescription}>
						{props.desc3}
						{props.unit3}
					</Text>
					<Image style={styles.iconSmall} source={props.icon4} />
					<Text style={styles.subDescription}>
						{props.desc4}
						{props.unit4}
					</Text>
				</View>
			</View>
			<View style={styles.image}>
				<Image
					style={styles.icon}
					source={{
						uri: props.mainImg
					}}
				/>
				<Text style={styles.listTextSmall}>{props.dt}</Text>
			</View>
		</View>
	);
};
export default CustomCard;

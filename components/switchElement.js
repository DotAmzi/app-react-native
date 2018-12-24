import React, { Component } from 'react';
import {
  Text,
	Switch,
	View,
  StyleSheet
} from 'react-native';


const SwitchElement = ({sub}) => {

	return (
		<View>
			<View style={{
				flex: 1,
				flexDirection: 'row',
				height: 50
			}}>
				<View style={{flex: 2, alignSelf: 'center'}}>
					<Text style={styles.labelSwitch}>{sub}</Text>
				</View>

				<View style={{width: 50, alignSelf: 'center'}}>
					<Switch />
				</View>
				
			</View>
		</View>
	);

}

const styles = StyleSheet.create({
  labelSwitch: {
		fontSize: 20
  }
});

export {SwitchElement};
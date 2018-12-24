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
				flexDirection: 'row'
			}}>
				<View style={{flex: 2, height: 50}}>
					<Text style={styles.labelSwitch}>{sub}</Text>
				</View>

				<View style={{width: 50, height: 50}}>
					<Switch />
				</View>
				
			</View>
		</View>
	);

}

const styles = StyleSheet.create({
  fieldText: {
    height: 70,
    fontSize: 20
  },
  labelSwitch: {
    fontSize: 20
  }
});

export {SwitchElement};